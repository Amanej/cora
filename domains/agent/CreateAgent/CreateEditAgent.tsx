'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, FileText, PenSquare, Trash } from "lucide-react"
import { createAgent, fetchAgentById } from '../api'
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
import { DEFAULT_INSTRUCTIONS } from './constants'

const defaultAgentData: AgentData = {
  title: '',
  phoneNumberId: '',
  subTitle: '',
  type: AgentType.Incoming,
  instructions: DEFAULT_INSTRUCTIONS,
  knowledgebase: [],
  createdAt: new Date(),
  status: AgentStatus.Active,
  templateId: '',
}

export default function CreateEditAgent() {
  const [isEditing, setIsEditing] = useState(true) // Set to false for create mode
  const [isLoading, setIsLoading] = useState(false)
  const [_agentData, setAgentData] = useState(defaultAgentData);
  const router = useRouter();

  const searchParams = useSearchParams();

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
    const searchId = searchParams.get('id')
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
    createdAt: _agentData.createdAt || new Date(),
    status: _agentData.status || AgentStatus.Active,
    templateId: _agentData.templateId || 'template-123',
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Submit')
    setIsLoading(true)
    await createAgent(agentData);
    console.log('Agent created')
    setIsLoading(false)
    router.push(ROUTES.MANAGE_AGENTS);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar currentPage={SidebarPage.Manage} />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Link href={ROUTES.MANAGE_AGENTS}>
              <Button className="text-black" variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <p className="text-sm font-light text-black">Agenter &gt; {isEditing ? "Kundeservice agenten min" : "Opprett kundeservice agent"}</p>
          </div>
          {/*          
            <Link href={ROUTES.MANAGE_AGENTS}>
              <p className="text-blue-500 hover:text-blue-700">Se maler</p>
            </Link>
          */}
        </div>

        <Card>
          <CardHeader>
            <Input placeholder="Name the agent" value={_agentData.title}
              onChange={(e) => {
                setAgentData({ ..._agentData, title: e.target.value })
              }}
              className="text-3xl font-bold" />
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon nummer</Label>
                  <Input id="phone" placeholder="+47 00 00 00 00" value={_agentData.phoneNumberId}
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

              <div className="space-y-2">
                <Label>Kunnskapsbank</Label>
                <div className="flex space-x-4">
                  {/* TODO: Add knowledgebase files */}
                  {false &&
                    <>
                      <Button variant="outline" className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        FAQ.pdf
                        <Trash className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        Retningslinjer.pdf
                      </Button>
                    </>
                  }
                  <Button variant="outline">Last opp</Button>
                </div>
              </div>

              <Separator className="hidden" />

              <div className="space-y-2 hidden">
                <h3 className="text-lg font-semibold">Handlinger</h3>
                {/* TODO: Add actions */}
                {false &&
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Endre booking</span>
                      <PenSquare className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Slett booking</span>
                      <PenSquare className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Få pris forespørsel</span>
                      <PenSquare className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                }
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline"
                  onClick={() => {
                    console.log('Test agent')
                  }}
                >Test agent</Button>
                <Button disabled={isLoading} type="submit">
                {isLoading ? 'Laster...' : (isEditing ? 'Lagre endringer' : 'Opprett agent')}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}