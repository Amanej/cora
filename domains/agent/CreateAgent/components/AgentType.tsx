'use client'

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AgentType } from "@/domains/agent/types"

interface AgentTypeProps {
  type: AgentType
  onTypeChange: (type: AgentType) => void
}

export default function AgentTypeSelect({ type, onTypeChange }: AgentTypeProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="type">Type</Label>
      <Select
        value={type}
        onValueChange={(value) => {
          onTypeChange(value as AgentType)
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={AgentType.Incoming} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={AgentType.Incoming}>Incoming</SelectItem>
          <SelectItem value={AgentType.Outgoing}>Outgoing</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
