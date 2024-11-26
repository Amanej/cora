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
      <Label htmlFor="recordingType">Recording type</Label>
      <Select
        value={recordingType ? recordingType : AgentRecordingSetting.ON}
        onValueChange={(value) => setRecordingType(value as AgentRecordingSetting)}
      >
        <SelectTrigger id="recordingType">
          <SelectValue placeholder="Select recording type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={AgentRecordingSetting.ON}>On</SelectItem>
          <SelectItem value={AgentRecordingSetting.OFF}>Off</SelectItem>
          <SelectItem value={AgentRecordingSetting.CONDITIONAL}>Conditional</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
