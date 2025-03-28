'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AgentData } from "@/domains/agent/types"

interface AgentConversationProps {
  agentData: AgentData
  setAgentData: (data: AgentData) => void
}

export default function AgentConversation({ agentData, setAgentData }: AgentConversationProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="openingLine">First message</Label>
        <Input 
          id="openingLine"
          placeholder="Opening message" 
          value={agentData.openingLine}
          onChange={(e) => {
            setAgentData({ ...agentData, openingLine: e.target.value })
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions">Instructions</Label>
        <Textarea
          id="instructions"
          placeholder="Describe how you want the agent to behave"
          className="min-h-[200px]"
          value={agentData.instructions}
          onChange={(e) => {
            setAgentData({ ...agentData, instructions: e.target.value })
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="endCallPhrases">End call phrases <span className="text-xs text-gray-500">(comma separated)</span></Label>
        <Input 
          id="endCallPhrases"
          placeholder="End call phrases" 
          value={agentData.endCallPhrases?.toString() || ''}
          onChange={(e) => {
            const endphrases = e.target.value.split(',');
            setAgentData({ ...agentData, endCallPhrases: endphrases })
          }}
        />
      </div>
    </div>
  )
}
