import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FileText, Trash, Upload } from "lucide-react"
import Link from "next/link"
import { AgentData } from "../../types";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import APP_CONFIG from "@/lib/config";
import { getLoggedInHeaders } from "@/domains/auth/utils";

type AgentKnowledgeBaseProps = {
    agentData: AgentData;
    token?: string | null;
}

const AgentKnowledgeBase = ({ agentData, token }: AgentKnowledgeBaseProps) => {
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = async (acceptedFiles: File[]) => {
        try {
            setIsUploading(true);
            const file = acceptedFiles[0];
            
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${APP_CONFIG.backendUrl}/integrations/file`, {
                method: 'POST',
                body: formData,
                headers: getLoggedInHeaders(token || '')
            });

            if (!response.ok) {
                throw new Error('Failed to upload file');
            }

            const result = await response.json();
            toast.success('File uploaded successfully');
            
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Failed to upload file');
        } finally {
            setIsUploading(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'text/plain': ['.txt'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxFiles: 1
    });

    return (
        <div className="space-y-2">
            <Label>Knowledge base</Label>
            <div className="flex flex-wrap gap-4">
                {agentData.knowledgebase.length > 0 &&
                    <>
                        {agentData.knowledgebase.map((file) =>
                            <Button key={file.url} variant="outline" className="flex items-center">
                                <Link href={file.url} target='_blank' className="flex items-center">
                                    <FileText className="mr-2 h-4 w-4" />
                                    {file.name}
                                </Link>
                                <Trash className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </>
                }
                <div 
                    {...getRootProps()} 
                    className={`cursor-pointer transition-colors duration-200 ${
                        isDragActive ? 'bg-accent' : ''
                    }`}
                >
                    <input {...getInputProps()} />
                    <Button 
                        variant="outline" 
                        className={`flex items-center min-w-[120px] ${
                            isDragActive ? 'border-primary' : ''
                        }`}
                        disabled={isUploading}
                    >
                        <Upload className="mr-2 h-4 w-4" />
                        {isUploading ? 'Uploading...' : isDragActive ? 'Drop here' : 'Upload'}
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default AgentKnowledgeBase;