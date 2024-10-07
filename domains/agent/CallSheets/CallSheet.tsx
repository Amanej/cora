import React, { useState, useCallback } from 'react';
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
import { LogOut } from 'lucide-react';
import SideBar, { SidebarPage } from '@/components/global/Sidebar';

interface CallSheetRow {
    id: string | null;
    name: string;
    phoneNumber: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    metadata: object;
}

type Props = {
    agentId?: string;
}

const CallSheet: React.FC<Props> = ({ agentId }) => {
    const [callSheet, setCallSheet] = useState<CallSheetRow[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedRow, setSelectedRow] = useState<CallSheetRow | null>(null);

    const parseData = (csvData: string) => {
        const rows = csvData.split('\n');
        const headers = rows[0].split(',').slice(2).map(header => header.trim()); // Get headers for metadata
        const parsedData: CallSheetRow[] = rows.slice(1).map((row, index) => {
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
                status: 'pending',
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

    const processSheet = () => {
        setIsProcessing(true);
        // Save call sheet to database
        // Then trigger processing
         // Show the sheet as loading
        // Return call sheet, with ids and update status

        // Simulating processing, replace with actual API call
        setTimeout(() => {
            setCallSheet(prev => prev.map(row => ({ ...row, status: 'completed' })));
            setIsProcessing(false);
        }, 2000);
    };

    // console.log("parsedData ",callSheet);
    console.log("agentId ", agentId);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <SideBar currentPage={SidebarPage.Manage} />

            {/* Main content */}
            <main className="flex-1 p-8 overflow-auto">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-sm font-light text-black">Call sheet &gt; <span className="font-bold">Real estate prospector</span></p>
                    <Button variant="ghost">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logg ut
                    </Button>
                </div>

                <div {...getRootProps()} className="border-2 border-dashed p-4 mb-4 text-center cursor-pointer">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the CSV file here ...</p>
                    ) : (
                        <p>Drag 'n' drop a CSV file here, or click to select files</p>
                    )}
                </div>

                <Button onClick={() => { }} className="mr-2" disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Upload Call Sheet'}
                </Button>
                <Button onClick={processSheet} disabled={callSheet.length === 0 || isProcessing}>
                    {isProcessing ? 'Processing...' : 'Process Sheet'}
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
                            {callSheet.map((log, index) => (
                                <TableRow key={log.phoneNumber} onClick={() => setSelectedRow(log)} className="cursor-pointer">
                                    <TableCell>{log.name}</TableCell>
                                    <TableCell>{log.phoneNumber}</TableCell>
                                    <TableCell>{log.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex justify-center mt-4">
                    <nav className="inline-flex">
                        <Button className="mr-2" size="sm">1</Button>
                        <Button className="mr-2" size="sm">2</Button>
                        <Button className="mr-2" size="sm">3</Button>
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
                                {Object.entries(selectedRow.metadata).map(([key, value]) => (
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
