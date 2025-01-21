import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SideBar, { SidebarPage } from '@/components/global/Sidebar';
import { createCallsheet, getCallsheetById, triggerProcessCallsheet } from '@/domains/callsheets/api';
import { CallSheetStatus, ICallSheet, ICallSheetItem } from '@/domains/callsheets/types';
import { useAuth } from '@/domains/auth/state/AuthContext';
import { FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routing';

type Props = {
    agentId?: string;
    sheetId?: string;
}

const CallSheet: React.FC<Props> = ({ agentId, sheetId }) => {
    const router = useRouter();
    const { token } = useAuth();
    const [sheet, setSheet] = useState<ICallSheet | null>(null);
    const [callSheet, setCallSheet] = useState<ICallSheetItem[]>([]);
    const [hasFetchedCallsheet, setHasFetchedCallsheet] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedRow, setSelectedRow] = useState<ICallSheetItem | null>(null);
    const [selectedRows, setSelectedRows] = useState<ICallSheetItem[]>([]);

    const parseData = (csvData: string) => {
        const rows = csvData.split('\n');
        const headers = rows[0].split(',').slice(2).map(header => header.trim()); // Get headers for metadata
        const parsedData: ICallSheetItem[] = rows.slice(1).map((row, index) => {
            const [name, phoneNumber, ...otherFields] = row.split(',');
            const metadata: Record<string, string> = {};
            // console.log("otherFields ", otherFields);
            // console.log("headers ", headers);
            otherFields.forEach((field, i) => {
                console.log("field ", field, " i ", i);
                console.log("headers[i] ", headers[i]);
                if (headers[i]) {
                    metadata[headers[i]] = field.trim();
                }
            });
            return {
                id: `${index}`,
                name,
                phoneNumber,
                callId: null,
                status: CallSheetStatus.Pending,
                saved: false,
                metadata
            };
        });
        return parsedData;
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setIsUploading(true);
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
            const csvData = reader.result as string;
            const parsedData = parseData(csvData);
            setCallSheet(parsedData);
            setIsUploading(false);
        };

        reader.readAsText(file);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const saveNewItems = async () => {
        const callSheetData: ICallSheet = {
            id: null,
            title: null,
            items: callSheet.filter(item => !item.saved),
            agentId: agentId || '',
            ownerId: '123',
            status: CallSheetStatus.Pending
        }
        if(callSheetData.items.length > 0 && token) {
            await createCallsheet(callSheetData, token);
        } else {
            console.log("No new items to save");
        }
    }

    const hasItemsToSave = () => {
        return callSheet.filter(item => item.saved).length > 0;
    }

    const processSheet = async () => {
        setIsProcessing(true);
        if(sheetId && token) {
            await triggerProcessCallsheet(sheetId, token);
        }
       setIsProcessing(false);
    };

    const updateSheet = async () => {
        setIsUpdating(true);
        // Should update, not save new callsheet
        await saveNewItems();
        setIsUpdating(false);
    }

    const fetchCallsheet = async (sheetId: string, token: string) => {
            const sheet = await getCallsheetById(sheetId, token);
            if(sheet) {
                setCallSheet(sheet.items.map(item => ({...item, saved: true})));
                setSheet(sheet);
            }
            setHasFetchedCallsheet(true);
    }

    const copySelectedItemsToNewSheet = async () => {
        setIsProcessing(true);
        const callSheetData: ICallSheet = {
            id: null,
            title: sheet?.title + " - Selected",
            items: selectedRows,
            agentId: sheet?.agentId || '',
            ownerId: '123', // Fix serverside
            status: CallSheetStatus.Pending
        }
        if(selectedRows.length > 0 && token) {
            try {
                const newSheetCreated = await createCallsheet(callSheetData, token);
                console.log("newSheetCreated ", newSheetCreated);
                // @ts-ignore - it does exist
                router.push(ROUTES.CALL_SHEET + "/" + newSheetCreated._id)
            } catch (error) {
                setIsProcessing(false);
                console.log("Error creating new sheet ", error);
            }
        } else {
            // TODO: Show error
            console.log("Could not copy selected items to sheet ")
        }
        setIsProcessing(false);
    }

    useEffect(() => {
        if(!hasFetchedCallsheet && sheetId && token) {
            fetchCallsheet(sheetId, token);
        }
    }, [agentId, token]);

    const currentAgentId = sheet?.agentId || agentId;
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <SideBar currentPage={SidebarPage.Manage} />

            {/* Main content */}
            <main className="flex-1 p-8 overflow-auto">
                <div className="flex justify-between items-center mb-6">
                    {/* Fix agent name */}
                    <p className="text-sm font-light text-black">Call sheet &gt; <span className="font-bold">{sheet?.title}</span></p>
                    <Button className="underline" onClick={() => router.push(ROUTES.CALL_SHEETS_BY_AGENT + "/" + currentAgentId)} variant="link" size="sm">Callsheets by agent</Button>
                </div>

                <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-4 mb-4 text-center cursor-pointer text-gray-800 bg-gray-200">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the CSV file here ...</p>
                    ) : (
                        <p>Drag 'n' drop a CSV file here, or click to select files</p>
                    )}
                </div>

                <Button onClick={() => { }} className="mr-2" disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Upload Callsheet'}
                </Button>
                <Button onClick={() => processSheet()} disabled={!hasItemsToSave() || isProcessing}>
                    {isProcessing ? 'Processing...' : 'Process Sheet'}
                </Button>

                <div className="bg-white mt-4 text-gray-900 shadow-md rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone Number</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {callSheet.map((log) => (
                                <TableRow 
                                    key={log.id} 
                                    onClick={(e) => {
                                        // Add to selection
                                        const newSelection = selectedRows?.includes(log) 
                                            ? selectedRows.filter(r => r !== log)
                                            : [...(selectedRows || []), log];
                                        setSelectedRows(newSelection);
                                    }}
                                    className={`cursor-pointer ${selectedRows?.includes(log) ? 'bg-blue-100' : ''}`}
                                >
                                    <TableCell>{log.name}</TableCell>
                                    <TableCell>{log.phoneNumber}</TableCell>
                                    <TableCell>{log.saved ? log.status : 'New'}</TableCell>
                                    <TableCell>
                                        <FileText 
                                            className="cursor-pointer text-blue-500"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent row click event
                                                setSelectedRow(log); // Set the selected row
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {selectedRows.length > 0 && (
                        <div className="m-2">
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedRows([])}
                            >
                                Deselect all
                            </Button>
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    <Button onClick={() => updateSheet()} disabled={hasItemsToSave() || isProcessing}>
                        {isUpdating ? 'Updating...' : 'Update sheet'}
                    </Button>
                    <Button className="ml-2" onClick={() => copySelectedItemsToNewSheet()} disabled={selectedRows.length === 0 || isProcessing}>
                        {isUpdating ? 'Creating...' : 'Create new sheet'}
                    </Button>
                </div>

                <div className="flex justify-center mt-4">
                    <nav className="inline-flex">
                        <Button className="mr-2" size="sm">1</Button>
                    </nav>
                </div>

                <Dialog open={!!selectedRow} onOpenChange={() => setSelectedRow(null)}>
                    <DialogContent className="bg-white">
                        <DialogHeader>
                            <DialogTitle className="text-gray-800">Call Details</DialogTitle>
                        </DialogHeader>
                        {selectedRow && (
                            <div className="text-gray-800">
                                <p><strong>Name:</strong> {selectedRow.name}</p>
                                <p><strong>Phone Number:</strong> {selectedRow.phoneNumber}</p>
                                <p><strong>Status:</strong> {selectedRow.status}</p>
                                {/* Add more details as needed */}
                                {selectedRow.metadata && Object.entries(selectedRow.metadata).map(([key, value]) => (
                                    <p key={key}><strong>{key}:</strong> {value}</p>
                                ))}
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </main>
        </div>
    )

};

export default CallSheet;
