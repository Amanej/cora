'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createAgent, fetchAgentById, testCallAgent, updateAgent } from '../api'
import { AgentData, AgentType, AgentStatus } from '../types'
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

export default function CreateEditAgent() {
  const [isEditing, setIsEditing] = useState(false) // Set to false for create mode
  const [isLoading, setIsLoading] = useState(false)
  const [_agentData, setAgentData] = useState(defaultAgentData);
  const [testNumber, setTestNumber] = useState(defaultAgentData.phoneNumberId)
  const router = useRouter();

  const searchParams = useSearchParams();
  const searchId = searchParams.get('id');

  const fetchAgent = async (id: string) => {
    console.log('Fetching agent with ID:', id);
    setIsEditing(true);
    setIsLoading(true);
    const agent = await fetchAgentById(id as string);
    console.log('Agent fetched:', agent);
    if (agent) {
      setAgentData(agent);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchId) {
      fetchAgent(searchId);
    }
  }, []);

  const agentData: AgentData = {
    title: _agentData.title || 'Customer Service Agent',
    phoneNumberId: _agentData.phoneNumberId || '123456789',
    subTitle: _agentData.subTitle || 'Support Agent',
    type: _agentData.type || AgentType.Incoming,
    instructions: _agentData.instructions || 'Handle customer inquiries',
    knowledgebase: _agentData.knowledgebase,
    integrationIds: _agentData.integrationIds || [],
    createdAt: _agentData.createdAt || new Date(),
    status: _agentData.status || AgentStatus.Active,
    templateId: _agentData.templateId || 'template-123',
    persona: _agentData.persona || '', // Add this line
  };

  const handleSave = async () => {
    setIsLoading(true)
    await createAgent({ ...agentData });
    // @TODO - Support for uploading files and picking them from knowledgebase
    console.log('Agent created')
    setIsLoading(false)
    router.push(ROUTES.MANAGE_AGENTS);
  }

  const handleUpdate = async () => {
    setIsLoading(true)
    if (searchId) {
      await updateAgent(searchId, { ...agentData });
      console.log('Agent updated')
    }
    setIsLoading(false)
    router.push(ROUTES.MANAGE_AGENTS);
  }

  const handleTestAgent = async () => {
    // e.preventDefault() 
    // callApi(agentData.phoneNumberId, "FAIR_COLLECTION", agentData.persona === "mann_norsk" ? "NORWEGIAN" : "ENGLISH")
    if (searchId) {
      setIsLoading(true)
      await testCallAgent(searchId, testNumber)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar currentPage={SidebarPage.Manage} />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <AgentHeader isEditing={isEditing} />

        <Card>
          <CardHeader>
            <Input placeholder="Name the agent" value={_agentData.title}
              onChange={(e) => {
                setAgentData({ ..._agentData, title: e.target.value })
              }}
              className="text-3xl font-bold" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">

                <AgentPersona agentData={_agentData} setAgentData={setAgentData} />

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon nummer</Label>
                  <Input id="phone" placeholder="+47 00 00 00 00" value={"+47 46164687"} /* _agentData.phoneNumberId */
                    onChange={(e) => {
                      setAgentData({ ..._agentData, phoneNumberId: e.target.value })
                    }}
                  />
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
                      <SelectItem value={AgentType.Incoming}>Inngående</SelectItem>
                      <SelectItem value={AgentType.Outgoing}>Utgående</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea
                  id="instructions"
                  placeholder="Beskriv hvordan du ønsker at agenten skal oppføre seg"
                  className="min-h-[200px]"
                  value={_agentData.instructions}
                  onChange={(e) => {
                    setAgentData({ ..._agentData, instructions: e.target.value })
                  }}
                />
              </div>

              {/*<div className="space-y-2">
                <Label>Samtale flyt</Label>
                <Button variant="outline">
                  <PenSquare className="mr-2 h-4 w-4" />
                  Rediger samtaleflyt
                </Button>
              </div>*/}

              <AgentKnowledgeBase agentData={agentData} />

              <Separator />

              <AgentActions integrationIds={agentData.integrationIds} setIntegrationIds={(ids) => {
                setAgentData({ ...agentData, integrationIds: ids })
              }} />

              <Separator />

              <TestAgent isEditing={isEditing} testNumber={testNumber} setTestNumber={setTestNumber} handleTestAgent={handleTestAgent} isLoading={isLoading} />

              <div className="flex justify-end space-x-6">
                <Button disabled={isLoading} onClick={() => {
                  isEditing ? handleUpdate() : handleSave()
                }}>
                  {isLoading ? 'Laster...' : (isEditing ? 'Oppdatere agent' : 'Opprett agent')}</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}