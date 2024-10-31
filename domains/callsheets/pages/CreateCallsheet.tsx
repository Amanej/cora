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
import { createCallsheet } from '@/domains/callsheets/api';
import { CallSheetStatus, ICallSheet, ICallSheetItem } from '@/domains/callsheets/types';
import { useAuth } from '@/domains/auth/state/AuthContext';
import { Input } from '@/components/ui/input';

type Props = {
    agentId?: string;
}

const CallSheet: React.FC<Props> = ({ agentId }) => {
    const { token } = useAuth();
    const [callSheet, setCallSheet] = useState<ICallSheetItem[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [selectedRow, setSelectedRow] = useState<ICallSheetItem | null>(null);
    const [title, setTitle] = useState<string | null>(null);

    const parseData = (csvData: string) => {
        const rows = csvData.split('\n');
        const headers = rows[0].split(',').slice(2).map(header => header.trim()); // Get headers for metadata
        const parsedData: ICallSheetItem[] = rows.slice(1).map((row, index) => {
            const [name, phoneNumber, ...otherFields] = row.split(',');
            const metadata: Record<string, string> = {};
            otherFields.forEach((field, i) => {
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
        // Filter out rows without phone numbers
        const filteredData = parsedData.filter(item => item.phoneNumber && item.phoneNumber.trim() !== '');
        return filteredData;
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

    const { getRootProps, getInputProps, open, isDragActive } = useDropzone({ onDrop });

    const saveNewItems = async () => {
        const callSheetData: ICallSheet = {
            id: null,
            title: title || '',
            items: callSheet.filter(item => !item.saved),
            agentId: agentId || '',
            ownerId: '123', // Fix serverside
            status: CallSheetStatus.Pending
        }
        if(callSheetData.items.length > 0 && token) {
            await createCallsheet(callSheetData, token);
        } else {
            // TODO: Show error
            console.log("No new items to save");
        }
    }

    const hasItemsToSave = () => {
        return callSheet.filter(item => item.saved).length > 0;
    }

    const saveSheet = async () => {
        setIsSaving(true);
        // Should update, not save new callsheet
        await saveNewItems();
        setIsSaving(false);
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <SideBar currentPage={SidebarPage.Manage} />

            {/* Main content */}
            <main className="flex-1 p-8 overflow-auto">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-sm font-light text-black">Call sheet &gt; <span className="font-bold">{title || "New sheet"}</span></p>
                </div>

                <div className="mb-4">
                    <Input placeholder="Name callsheet" value={title || ''}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                        className="text-3xl text-gray-800 font-bold border-none shadow-none" />
                </div>

                <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-4 mb-4 text-center cursor-pointer text-gray-800 bg-gray-200">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the CSV file here ...</p>
                    ) : (
                        <p>Drag 'n' drop a CSV file here, or click to select files</p>
                    )}
                </div>

                <Button onClick={() => { open() }} className="mr-2" disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Upload Callsheet'}
                </Button>

                <div className="bg-white mt-4 text-gray-900 shadow-md rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone Number</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {callSheet.map((log) => (
                                <TableRow key={log.id} onClick={() => setSelectedRow(log)} className="cursor-pointer">
                                    <TableCell>{log.name}</TableCell>
                                    <TableCell>{log.phoneNumber}</TableCell>
                                    <TableCell>{log.saved ? log.status : 'New'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-4">
                    <Button onClick={() => saveSheet()} disabled={hasItemsToSave() || isSaving}>
                        {isSaving ? 'Saving...' : 'Save sheet'}
                    </Button>
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
