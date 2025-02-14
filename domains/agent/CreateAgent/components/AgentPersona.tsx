import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { AgentData } from "../../types";

type AgentPersonaProps = {
    agentData: AgentData
    setAgentData: (data: AgentData) => void
}

export enum PERSONAS {
    BRITISH = "british",
    BRITISH_FEMALE = "britishFemale",
    NORWEGIAN = "norwegian",
    NORWEGIAN_FEMALE = "norwegianFemale",
    NORWEGIAN_MALE = "norwegianMale",
    AMERICAN_FEMALE = "americanFemale",
    AMERICAN_MALE = "americanMale",
    SPANISH_ELDER_FEMALE = "spanishElderFemale",
    SPANISH_FEMALE = "spanishFemale",
    SPANISH_MALE = "spanishMale",
    GERMAN_FEMALE = "germanFemale",
    ITALIAN_MALE = "italianMale",
    SWEDISH_FEMALE = "swedishFemale",
    SWEDISH_MALE = "swedishMale"
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
                    <SelectItem value={PERSONAS.NORWEGIAN}>🇳🇴 Male - Norwegian</SelectItem>
                    <SelectItem value={PERSONAS.NORWEGIAN_FEMALE}>🇳🇴 Female - Norwegian</SelectItem>
                    <SelectItem value={PERSONAS.NORWEGIAN_MALE}>🇳🇴 Male - Norwegian v2</SelectItem>
                    <SelectItem value={PERSONAS.SWEDISH_FEMALE}>🇸🇪 Female - Swedish</SelectItem>
                    <SelectItem value={PERSONAS.SWEDISH_MALE}>🇸🇪 Male - Swedish</SelectItem>
                    <SelectItem value={PERSONAS.BRITISH}>🇬🇧 Male -  British</SelectItem>
                    <SelectItem value={PERSONAS.BRITISH_FEMALE}>🇬🇧 Female - British</SelectItem>
                    <SelectItem value={PERSONAS.AMERICAN_FEMALE}>🇺🇸 Female - American</SelectItem>
                    <SelectItem value={PERSONAS.AMERICAN_MALE}>🇺🇸 Male - American</SelectItem>
                    <SelectItem value={PERSONAS.SPANISH_ELDER_FEMALE}>🇪🇸 Female - Spanish Elder</SelectItem>
                    <SelectItem value={PERSONAS.SPANISH_FEMALE}>🇪🇸 Female - Spanish</SelectItem>
                    <SelectItem value={PERSONAS.SPANISH_MALE}>🇪🇸 Male - Spanish</SelectItem>
                    <SelectItem value={PERSONAS.GERMAN_FEMALE}>🇩🇪 Female - German</SelectItem>
                    <SelectItem value={PERSONAS.ITALIAN_MALE}>🇮🇹 Male - Italian</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default AgentPersona;