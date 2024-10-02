import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { AgentData } from "../../types";

type AgentPersonaProps = {
    agentData: AgentData
    setAgentData: (data: AgentData) => void
}

const AgentPersona = ({ agentData, setAgentData }: AgentPersonaProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor="persona">Persona</Label>
            <Select
                onValueChange={(value) => {
                    setAgentData({ ...agentData, persona: value })
                }}
                value={agentData.persona}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Velg persona" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="mann-norsk">Mann - Norsk</SelectItem>
                    <SelectItem value="mann-britisk">Mann - Britisk engelsk</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default AgentPersona;