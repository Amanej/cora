import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BestPractices from "./Analysis/BestPractices";
import { IndustryStandard, AgentStructuredSummaryFields } from "@/domains/agent/types";
import AgentStructuredSummary from "./AgentStructuredSummary";

type Props = {
    summary: string;
    successEvaluation: string;
    setSummary: (summary: string) => void;
    setSuccessEvaluation: (successEvaluation: string) => void;
    structuredSummary: AgentStructuredSummaryFields[];
    setStructuredSummary: (structuredSummary: AgentStructuredSummaryFields[]) => void;
    industryStandard?: IndustryStandard;
    setIndustryStandard?: (industryStandard: IndustryStandard) => void;
}

const AgentAnalysis = ({ 
    summary, 
    successEvaluation, 
    setSummary, 
    setSuccessEvaluation, 
    structuredSummary,
    setStructuredSummary,
    industryStandard = IndustryStandard.None,
    setIndustryStandard = () => {}
}: Props) => {
    return (

        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Summarize call</Label>
                    <Input placeholder="Summary" value={summary}
                        onChange={(e) => {
                            setSummary(e.target.value)
                        }}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Evaluate success</Label>
                    <Input placeholder="Evaluate success" value={successEvaluation}
                        onChange={(e) => {
                            setSuccessEvaluation(e.target.value)
                        }}
                    />
                </div>
            </div>
            
            <BestPractices
                industryStandard={industryStandard}
                setIndustryStandard={setIndustryStandard}
            />
            
            {false &&            
                <AgentStructuredSummary
                    structuredSummary={structuredSummary}
                    setStructuredSummary={(structuredSummary) => {
                        if (structuredSummary) {
                            setStructuredSummary(structuredSummary);
                        }
                    }}
                />
            }
        </div>

    )
}

export default AgentAnalysis;