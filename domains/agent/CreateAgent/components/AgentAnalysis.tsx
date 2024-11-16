import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
    summary: string;
    successEvaluation: string;
    setSummary: (summary: string) => void;
    setSuccessEvaluation: (successEvaluation: string) => void;
}

const AgentAnalysis = ({ summary, successEvaluation, setSummary, setSuccessEvaluation }: Props) => {
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
        </div>

    )
}

export default AgentAnalysis;