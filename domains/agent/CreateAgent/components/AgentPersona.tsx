import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { AgentData } from "../../types";

type AgentPersonaProps = {
    agentData: AgentData
    setAgentData: (data: AgentData) => void
}

export enum PERSONAS {
    BRITISH = "british",
    NORWEGIAN = "norwegian",
    AMERICAN_FEMALE = "americanFemale",
    AMERICAN_MALE = "americanMale"
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
                    <SelectItem value={PERSONAS.NORWEGIAN}>Male - Norwegian</SelectItem>
                    <SelectItem value={PERSONAS.BRITISH}>Male - British</SelectItem>
                    <SelectItem value={PERSONAS.AMERICAN_FEMALE}>Female - American</SelectItem>
                    <SelectItem value={PERSONAS.AMERICAN_MALE}>Male - American</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default AgentPersona;