'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { CircleIcon, LogOutIcon, PlusIcon } from "lucide-react"
import SideBar, { SidebarPage } from "@/components/global/Sidebar"
import { ROUTES } from "@/lib/routing"
import { AgentData } from "./types"
import { fetchAgents } from "./api"
import AgentCard from "./components/AgentCard"


const Management = () => {

  const [agents, setAgents] = useState<AgentData[]>([]);

  useEffect(() => {
    callFetchAgents();
  }, []);

  const callFetchAgents = async () => {
    const agents = await fetchAgents();
    if (agents) {
      setAgents(agents);
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
    <SideBar  currentPage={SidebarPage.Manage} />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Agenter</h2>
          <Button variant="ghost">
            <LogOutIcon className="mr-2 h-4 w-4" />
            Logg ut
          </Button>
        </div>

        {/* Agent list */}
        <div className="space-y-4">
          {agents.map((agent) => (
            <AgentCard key={agent._id} agent={agent} />
          ))}
          {/* Espen */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="flex items-center space-x-3">
                  <CircleIcon className="h-3 w-3 fill-green-500 text-green-500" />
                  <span>Espen</span>
                </div>
              </CardTitle>
              <Button variant="link" size="sm">Oppfølging</Button>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">124 samtaler håndtert idag</p>
              <Separator className="my-2" />
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Ringelister</Button>
                <Button variant="outline" size="sm">Se samtale logger</Button>
                <Button variant="outline" size="sm">Deaktiver</Button>
                <Button variant="outline" size="sm">Rediger</Button>
                <Button variant="outline" size="sm">Slett</Button>
              </div>
            </CardContent>
          </Card>

          {/* Oliver */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="flex items-center space-x-3">
                  <CircleIcon className="h-3 w-3 fill-red-500 text-red-500" />
                  <span>Oliver</span>
                </div>
              </CardTitle>
              <Button variant="link" size="sm">Oppfølging</Button>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Deaktivert siden 18. sept</p>
              <Separator className="my-2" />
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Ringelister</Button>
                <Button variant="outline" size="sm">Se samtale logger</Button>
                <Button variant="outline" size="sm">Aktiver</Button>
                <Button variant="outline" size="sm">Rediger</Button>
                <Button variant="outline" size="sm">Slett</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add agent button */}
        <div className="mt-8">
          <Link href={ROUTES.CREATE_AGENT} className="inline-flex items-center py-2 px-4 text-white bg-blue-500 rounded-xl font-bold">
            <PlusIcon className="mr-2 h-4 w-4" />
            Opprett agent
          </Link>
        </div>
      </main>
    </div>
  )
}
export default Management
