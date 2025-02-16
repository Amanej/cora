'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createAgent, fetchAgentById, testCallAgent, updateAgent } from '../api'
import { fetchUserPhoneNumbers } from '@/domains/phonenumber/api'
import { AgentData, AgentType, AgentStatus, AgentRecordingSetting } from '../types'
import { Button } from "@/components/ui/button"
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import SideBar, { SidebarPage } from '@/components/global/Sidebar'
import { ROUTES } from '@/lib/routing'
import { defaultAgentData } from './constants'
import TestAgent from './components/TestAgent'
import AgentKnowledgeBase from './components/AgentKnowledgeBase'
import AgentHeader from './components/AgentHeader'
import { useAuth } from '@/domains/auth/state/AuthContext'
import AgentAnalysis from './components/AgentAnalysis'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AgentConversation from './components/AgentConversation'
import AgentSettingsTab from './tabs/AgentSettingsTab'
import AgentPersonaTab from './tabs/AgentPersonaTab'

export default function CreateEditAgent() {
  const { toast } = useToast()
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false) // Set to false for create mode
  const [isLoading, setIsLoading] = useState(false)
  const [_agentData, setAgentData] = useState(defaultAgentData);
  const [testNumber, setTestNumber] = useState('')
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

  const fetchNumbers = async (token: string) => {
    const numbers = await fetchUserPhoneNumbers(token);
    console.log('Fetched phone numbers:', numbers);
    return numbers;
  };

  useEffect(() => {
    if (searchId && token) {
      fetchAgent(searchId, token);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchNumbers(token);
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

  }

  const handleTestAgent = async () => {
    if (searchId && token) {
      setIsLoading(true)
      await testCallAgent(searchId, testNumber, token)
      setIsLoading(false)
    }
  }

  console.log("agentData", agentData)
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar currentPage={SidebarPage.CreateAgent} />

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
                <AgentPersonaTab agentData={_agentData} setAgentData={setAgentData} />
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
                <AgentConversation agentData={_agentData} setAgentData={setAgentData} />
              </TabsContent>
              <TabsContent value="knowledgebase">
                <Card>
                  <CardContent className="pt-6">
                    <AgentKnowledgeBase agentData={agentData} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings">
                <AgentSettingsTab agentData={_agentData} setAgentData={setAgentData} />
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


export const SkeletonLoader = () => {
  return (
    <div className="flex h-screen bg-gray-100 animate-pulse">
      {/* Sidebar */}
      <SideBar currentPage={SidebarPage.CreateAgent} />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>

        <Card>
          <CardHeader>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="persona" className="mb-4">
              <TabsList>
                <div className="h-8 bg-gray-300 rounded w-24"></div>
                <div className="h-8 bg-gray-300 rounded w-24"></div>
                <div className="h-8 bg-gray-300 rounded w-24"></div>
                <div className="h-8 bg-gray-300 rounded w-24"></div>
                <div className="h-8 bg-gray-300 rounded w-24"></div>
              </TabsList>
              <TabsContent value="persona">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-10 bg-gray-300 rounded w-full"></div>
                        <div className="h-10 bg-gray-300 rounded w-full"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Repeat similar structure for other tabs */}
            </Tabs>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardContent>
            <div className="space-y-6 mt-4">
              <div className="h-10 bg-gray-300 rounded w-full"></div>
              <div className="flex justify-end space-x-6">
                <div className="h-10 bg-gray-300 rounded w-32"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}