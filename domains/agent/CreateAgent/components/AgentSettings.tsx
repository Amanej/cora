import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { AgentRecordingSetting, AgentRepeatCalls, AgentVoicemailBehaviour } from '../../types'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from '@/components/ui/separator';
import { PhoneInput } from '@/components/ui/phone-input';
import AgentRepeatCallsForm from './AgentRepeatCalls';
import Localization from './Settings/Localization';

interface AgentSettingsProps {
  isInbound?: boolean;
  recordingType?: AgentRecordingSetting;
  setRecordingType: (type: AgentRecordingSetting) => void;
  voicemailBehaviour?: AgentVoicemailBehaviour;
  setVoicemailBehaviour: (type: AgentVoicemailBehaviour) => void;
  voicemailMessage?: string;
  setVoicemailMessage: (message: string) => void;
  transferCallTo?: string;
  setTransferCallTo: (number: string) => void;
  repeatCalls?: AgentRepeatCalls;
  setRepeatCalls: (repeatCalls: AgentRepeatCalls) => void;
  localization?: {
    timezone?: string;
    currency?: string;
  };
  setLocalization: (localization: {
    timezone?: string;
    currency?: string;
  }) => void;
}
export default function AgentSettings({ isInbound, recordingType, setRecordingType, voicemailBehaviour, setVoicemailBehaviour, voicemailMessage, setVoicemailMessage, transferCallTo, setTransferCallTo, repeatCalls, setRepeatCalls, localization, setLocalization }: AgentSettingsProps) {

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
      <Separator className="my-4" />
      <div className="space-y-2">
        <Label htmlFor="transferCallTo">Transfer to</Label>
        <PhoneInput value={transferCallTo} onChange={setTransferCallTo} placeholder="Add number to transfer to" defaultCountry="GB" />
        {/*        
          <Input placeholder="Add number to transfer to" value={transferCallTo?.toString() || ''}
            onChange={(e) => {
              setTransferCallTo(e.target.value)
            }}
          />
        */}
      </div>
      {false && (
        <>
          <Separator className="my-4" />
          <div className="space-y-2">
            <Label htmlFor="repeatCalls">Repeat calls</Label>
            <AgentRepeatCallsForm
              schedule={repeatCalls?.schedule}
              setSchedule={(schedule) => setRepeatCalls({ ...repeatCalls, schedule: schedule })}
              days={repeatCalls?.schedule?.days || { monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false }}
              setDays={(days) => setRepeatCalls({ ...repeatCalls, schedule: { ...repeatCalls?.schedule, days, timezone: repeatCalls?.schedule?.timezone || null, hours: repeatCalls?.schedule?.hours || { from: null, to: null } } })}
              hours={repeatCalls?.schedule?.hours || { from: null, to: null }}
              setHours={(hours) => setRepeatCalls({ ...repeatCalls, schedule: { ...repeatCalls?.schedule, hours, timezone: repeatCalls?.schedule?.timezone || null, days: repeatCalls?.schedule?.days || { monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false } } })}
              setMax={(max) => setRepeatCalls({ ...repeatCalls, max: max })}
              max={repeatCalls?.max}
              setRepeatCallDelay={(delay) => setRepeatCalls({ ...repeatCalls, delay: { hours: delay } })}
              delay={repeatCalls?.delay?.hours}
              enabled={repeatCalls?.enabled}
              setEnabled={(enabled) => setRepeatCalls({ ...repeatCalls, enabled: enabled })}
            />
          </div>
        </>
      )}
      <Separator className="my-4" />
      <div className="space-y-2">
        <Localization
          timezone={localization?.timezone || undefined}
          setTimezone={(timezone) => setLocalization({ ...localization, timezone })}
          currency={localization?.currency || undefined}
          setCurrency={(currency) => setLocalization({ ...localization, currency })}
        />
      </div>
    </>
  )
}
