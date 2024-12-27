import { Input } from '@/components/ui/input';
import { AgentRecordingSetting, AgentVoicemailBehaviour } from '../../types'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from '@/components/ui/separator';

interface AgentSettingsProps {
  recordingType?: AgentRecordingSetting;
  setRecordingType: (type: AgentRecordingSetting) => void;
  voicemailBehaviour?: AgentVoicemailBehaviour;
  setVoicemailBehaviour: (type: AgentVoicemailBehaviour) => void;
  voicemailMessage?: string;
  setVoicemailMessage: (message: string) => void;
}

export default function AgentSettings({ recordingType, setRecordingType, voicemailBehaviour, setVoicemailBehaviour, voicemailMessage, setVoicemailMessage }: AgentSettingsProps) {
  return (
    <>
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
      <Separator className="my-4" />
      {/*
      <div className="space-y-2">
        <Label htmlFor="recordingType">Voicemail behaviour</Label>
        <Select
          value={voicemailBehaviour ? voicemailBehaviour : AgentVoicemailBehaviour.LEAVE_VOICEMAIL}
          onValueChange={(value) => setVoicemailBehaviour(value as AgentVoicemailBehaviour)}
        >
          <SelectTrigger id="recordingType">
            <SelectValue placeholder="Select voicemail behaviour" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={AgentVoicemailBehaviour.LEAVE_VOICEMAIL}>Leave a voicemail</SelectItem>
            <SelectItem value={AgentVoicemailBehaviour.HANG_UP}>Hang up</SelectItem>
          </SelectContent>
        </Select>
      </div>
      */}
      <div className="space-y-2 mt-4">
        <Label htmlFor="voicemailMessage">Voicemail message</Label>
        <Input placeholder="Leave blank to let the agent come up with something" value={voicemailMessage?.toString() || ''}
          onChange={(e) => {
            setVoicemailMessage(e.target.value)
          }}
        />
      </div>
    </>
  )
}
