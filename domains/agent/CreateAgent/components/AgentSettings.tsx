import { AgentRecordingSetting } from '../../types'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AgentSettingsProps {
  recordingType?: AgentRecordingSetting;
  setRecordingType: (type: AgentRecordingSetting) => void;
}

export default function AgentSettings({ recordingType, setRecordingType }: AgentSettingsProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="recordingType">Innspillingstype</Label>
      <Select
        value={recordingType ? recordingType : AgentRecordingSetting.ON}
        onValueChange={(value) => setRecordingType(value as AgentRecordingSetting)}
      >
        <SelectTrigger id="recordingType">
          <SelectValue placeholder="Velg innspillingstype" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={AgentRecordingSetting.ON}>På</SelectItem>
          <SelectItem value={AgentRecordingSetting.OFF}>Av</SelectItem>
          <SelectItem value={AgentRecordingSetting.CONDITIONAL}>Betinget</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
