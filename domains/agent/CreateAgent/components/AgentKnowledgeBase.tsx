import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FileText, Trash } from "lucide-react"
import Link from "next/link"
import { AgentData } from "../../types";

type AgentKnowledgeBaseProps = {
    agentData: AgentData
}

const AgentKnowledgeBase = ({ agentData }: AgentKnowledgeBaseProps) => {
    return (
        <div className="space-y-2">
            <Label>Kunnskapsbank</Label>
            <div className="flex space-x-4">
                {/* TODO: Add knowledgebase files */}
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
                <Button variant="outline">Last opp</Button>
            </div>
        </div>
    )
};

export default AgentKnowledgeBase;