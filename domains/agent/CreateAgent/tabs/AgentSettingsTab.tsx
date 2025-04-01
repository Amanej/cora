'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import AgentActions from "../components/AgentActions"
import AgentSettings from "../components/AgentSettings"
import { AgentData, AgentType } from "../../types"

interface AgentSettingsTabProps {
  agentData: AgentData
  setAgentData: (data: AgentData) => void
}

export default function AgentSettingsTab({ agentData, setAgentData }: AgentSettingsTabProps) {
  const isInbound = agentData.type === AgentType.Incoming;
  return (
    <Card>
      <CardContent className="pt-6">
        <AgentActions 
          integrationIds={agentData.integrationIds} 
          setIntegrationIds={(ids) => {
            setAgentData({ ...agentData, integrationIds: ids })
          }} 
        />
        <Separator className="my-4" />
        <AgentSettings
          recordingType={agentData?.settings?.recordingType}
          setRecordingType={(recordingType) => {
            setAgentData({
              ...agentData,
              settings: { ...agentData.settings, recordingType }
            })
          }}
          voicemailBehaviour={agentData?.settings?.voicemailBehaviour}
          setVoicemailBehaviour={(voicemailBehaviour) => {
            setAgentData({
              ...agentData,
              settings: { ...agentData.settings, voicemailBehaviour }
            })
          }}
          voicemailMessage={agentData?.settings?.voicemailMessage}
          setVoicemailMessage={(voicemailMessage) => {
            setAgentData({
              ...agentData,
              settings: { ...agentData.settings, voicemailMessage }
            })
          }}
          transferCallTo={agentData?.settings?.transferCallTo}
          setTransferCallTo={(transferCallTo) => {
            setAgentData({
              ...agentData,
              settings: { ...agentData.settings, transferCallTo }
            })
          }}
          repeatCalls={agentData?.settings?.repeatCalls}
          setRepeatCalls={(repeatCalls) => {
            setAgentData({
              ...agentData,
              settings: { ...agentData.settings, repeatCalls }
            })
          }}
          localization={agentData?.settings?.localization}
          setLocalization={(localization) => {
            setAgentData({
              ...agentData,
              settings: { ...agentData.settings, localization }
            })
          }}
        />
      </CardContent>
    </Card>
  )
}
