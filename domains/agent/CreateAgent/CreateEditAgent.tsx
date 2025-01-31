'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createAgent, fetchAgentById, testCallAgent, updateAgent } from '../api'
import { AgentData, AgentType, AgentStatus, AgentRecordingSetting } from '../types'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import SideBar, { SidebarPage } from '@/components/global/Sidebar'
import { ROUTES } from '@/lib/routing'
import { defaultAgentData } from './constants'
import TestAgent from './components/TestAgent'
import AgentActions from './components/AgentActions'
import AgentKnowledgeBase from './components/AgentKnowledgeBase'
import AgentPersona from './components/AgentPersona'
import AgentHeader from './components/AgentHeader'
import { useAuth } from '@/domains/auth/state/AuthContext'
import AgentAnalysis from './components/AgentAnalysis'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AgentSettings from './components/AgentSettings'
import { useToast } from '@/hooks/use-toast'

type PhoneNumberOption = {
  number: string;
  externalId: string;
  countryCode: string;
}

const PHONENUMBER_OPTIONS: PhoneNumberOption[] = [
  {
    number: "+12056971654",
    externalId: "e354916c-659a-489e-b141-a1e0ddb13712",
    countryCode: "US",
  },
  {
    number: "+4732994591",
    externalId: "c8471c8c-133f-4df2-abab-b1ad4d7cf59d",
    countryCode: "NO",
  },
  {
    number: "+4732994597",
    externalId: "e31add50-a0c2-4c0f-bb10-5518b198ad2f",
    countryCode: "NO",
  }
]

export default function CreateEditAgent() {
  const { toast } = useToast()
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false) // Set to false for create mode
  const [isLoading, setIsLoading] = useState(false)
  const [_agentData, setAgentData] = useState(defaultAgentData);
  const [testNumber, setTestNumber] = useState(defaultAgentData.phoneNumberId)
  const router = useRouter();

  const searchParams = useSearchParams();
  const searchId = searchParams.get('id');

  const fetchAgent = async (id: string, token: string) => {
    setIsEditing(true);
    setIsLoading(true);
    const agent = await fetchAgentById(id as string, token);
    // console.log('Agent fetched:', agent);
    if (agent) {
      setAgentData(agent);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchId && token) {
      fetchAgent(searchId, token);
    }
  }, [token]);

  const agentData: AgentData = {
    title: _agentData.title || 'Customer Service Agent',
    phoneNumberId: _agentData.phoneNumberId || '123456789',
    type: _agentData.type || AgentType.Incoming,
    instructions: _agentData.instructions || 'Handle customer inquiries',
    knowledgebase: _agentData.knowledgebase,
    integrationIds: _agentData.integrationIds || [],
    createdAt: _agentData.createdAt || new Date(),
    status: _agentData.status || AgentStatus.Active,
    templateId: _agentData.templateId || 'template-123',
    persona: _agentData.persona || '', // Add this line
    openingLine: _agentData.openingLine || '',
    endCallPhrases: _agentData.endCallPhrases || [],
    evaluation: _agentData.evaluation || {},
    settings: _agentData.settings || { recordingType: AgentRecordingSetting.ON },
  };

  const handleSave = async () => {
    setIsLoading(true)
    if (token) {
      await createAgent({ ...agentData }, token);
    }
    // @TODO - Support for uploading files and picking them from knowledgebase
    // console.log('Agent created')
    setIsLoading(false)
    router.push(ROUTES.MANAGE_AGENTS);
  }

  const handleUpdate = async () => {
    setIsLoading(true)
    if (searchId && token) {
      try {
        await updateAgent(searchId, { ...agentData }, token);
        setIsLoading(false)
        toast({
          title: "Agent updated",
          description: `Successfully updated ${agentData.title}`,
          className: "text-gray-700 bg-white",
        })
      } catch (error) {
        setIsLoading(false)
        // console.error("Error updating agent", error)
        toast({
          title: "Agent updated",
          description: `Successfully updated ${agentData.title}`,
          variant: "destructive"
        })
      }
    }
    // router.push(ROUTES.MANAGE_AGENTS);

  }

  const handleTestAgent = async () => {
    if (searchId && token) {
      setIsLoading(true)
      await testCallAgent(searchId, testNumber, token)
      setIsLoading(false)
    }
  }

  // console.log("agentData", agentData)
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar currentPage={SidebarPage.Manage} />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <AgentHeader isEditing={isEditing} title={_agentData.title} />

        <Card>
          <CardHeader>
            <Input placeholder="Name the agent" value={_agentData.title}
              onChange={(e) => {
                setAgentData({ ..._agentData, title: e.target.value })
              }}
              className="text-3xl font-bold border-t-0 border-l-0 border-r-0 rounded-none shadow-none" />
          </CardHeader>
          <CardContent>

            <Tabs defaultValue="persona" className="mb-4">
              <TabsList>
                <TabsTrigger value="persona">Persona</TabsTrigger>
                <TabsTrigger value="conversation">Conversation</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="knowledgebase">Knowledgebase</TabsTrigger>
                <TabsTrigger value="settings">Actions & Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="persona">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <AgentPersona agentData={_agentData} setAgentData={setAgentData} />
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone number</Label>
                          <Select
                            value={_agentData.phoneNumberId}
                            onValueChange={(value) => {
                              setAgentData({ ..._agentData, phoneNumberId: value })
                            }}
                          >
                            <SelectTrigger id="phone">
                              <SelectValue placeholder="Select a phone number" />
                            </SelectTrigger>
                            <SelectContent>
                              {PHONENUMBER_OPTIONS.map((option) => (
                                <SelectItem key={option.externalId} value={option.externalId}>
                                  {option.number}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type">Type</Label>
                          <Select
                            onValueChange={(value) => {
                              setAgentData({ ..._agentData, type: value as AgentType })
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

                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analysis">
                <Card>
                  <CardContent className="pt-6">
                    <AgentAnalysis
                      summary={_agentData.evaluation?.summary || ''}
                      successEvaluation={_agentData.evaluation?.successEvaluation || ''}
                      setSummary={(summary) => setAgentData({ ..._agentData, evaluation: { ..._agentData.evaluation, summary } })}
                      setSuccessEvaluation={(successEvaluation) => setAgentData({ ..._agentData, evaluation: { ..._agentData.evaluation, successEvaluation } })}
                      structuredSummary={_agentData.evaluation?.structuredSummary}
                      setStructuredSummary={(structuredSummary) => setAgentData({ ..._agentData, evaluation: { ..._agentData.evaluation, structuredSummary } })}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="conversation">
                <Card>
                  <CardContent className="pt-6">

                    <div className="space-y-2">
                      <Label htmlFor="openingLine">First message</Label>
                      <Input placeholder="Opening message" value={_agentData.openingLine}
                        onChange={(e) => {
                          setAgentData({ ..._agentData, openingLine: e.target.value })
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instructions">Instructions</Label>
                      <Textarea
                        id="instructions"
                        placeholder="Describe how you want the agent to behave"
                        className="min-h-[200px]"
                        value={_agentData.instructions}
                        onChange={(e) => {
                          setAgentData({ ..._agentData, instructions: e.target.value })
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endCallPhrases">End call phrases <span className="text-xs text-gray-500">(comma separated)</span></Label>
                      <Input placeholder="End call phrases" value={_agentData.endCallPhrases?.toString() || ''}
                        onChange={(e) => {
                          const endphrases = e.target.value.split(',');
                          setAgentData({ ..._agentData, endCallPhrases: endphrases })
                        }}
                      />
                    </div>

                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="knowledgebase">
                <Card>
                  <CardContent className="pt-6">
                    <AgentKnowledgeBase agentData={agentData} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings">
                <Card>
                  <CardContent className="pt-6">
                    <AgentActions integrationIds={agentData.integrationIds} setIntegrationIds={(ids) => {
                      setAgentData({ ...agentData, integrationIds: ids })
                    }} />
                    <Separator className="my-4" />
                    <AgentSettings 
                      recordingType={_agentData?.settings?.recordingType}
                      setRecordingType={(recordingType) => {
                        setAgentData({ 
                          ..._agentData, 
                          settings: { ..._agentData.settings, recordingType } 
                        })
                      }}
                      voicemailBehaviour={_agentData?.settings?.voicemailBehaviour}
                      setVoicemailBehaviour={(voicemailBehaviour) => {
                        setAgentData({ 
                          ..._agentData, 
                          settings: { ..._agentData.settings, voicemailBehaviour } 
                        })
                      }}
                      voicemailMessage={_agentData?.settings?.voicemailMessage}
                      setVoicemailMessage={(voicemailMessage) => {
                        setAgentData({ 
                          ..._agentData, 
                          settings: { ..._agentData.settings, voicemailMessage } 
                        })
                      }}
                      transferCallTo={_agentData?.settings?.transferCallTo}
                      setTransferCallTo={(transferCallTo) => {
                        setAgentData({ 
                          ..._agentData, 
                          settings: { ..._agentData.settings, transferCallTo } 
                        })
                      }}
                      repeatCalls={_agentData?.settings?.repeatCalls}
                      setRepeatCalls={(repeatCalls) => {
                        setAgentData({ 
                          ..._agentData, 
                          settings: { ..._agentData.settings, repeatCalls } 
                        })
                      }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardContent>
            <div className="space-y-6 mt-4">

              <TestAgent isEditing={isEditing} testNumber={testNumber} setTestNumber={setTestNumber} handleTestAgent={handleTestAgent} isLoading={isLoading} />

              <div className="flex justify-end space-x-6">
                <Button disabled={isLoading} onClick={() => {
                  isEditing ? handleUpdate() : handleSave()
                }}>
                  {isLoading ? 'Loading...' : (isEditing ? 'Update agent' : 'Create agent')}</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div >
  )
}