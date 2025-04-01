'use client'

import { Card, CardContent } from "@/components/ui/card"
import AgentPersona from "../components/AgentPersona"
import AgentPhoneNumbers from "../components/AgentPhoneNumbers"
import AgentTypeSelect from "../components/AgentType"
import { AgentData, AgentType } from "../../types"

interface AgentPersonaTabProps {
  agentData: AgentData
  setAgentData: (data: AgentData) => void
}

export default function AgentPersonaTab({ agentData, setAgentData }: AgentPersonaTabProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <AgentPersona agentData={agentData} setAgentData={setAgentData} />
            <AgentPhoneNumbers 
              isIncoming={agentData.type === AgentType.Incoming} 
              phoneNumberId={agentData.phoneNumberId} 
              setPhoneNumberId={(id) => {
                setAgentData({ ...agentData, phoneNumberId: id })
              }} 
            />
            <AgentTypeSelect 
              type={agentData.type} 
              onTypeChange={(type) => {
                setAgentData({ ...agentData, type })
              }} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
