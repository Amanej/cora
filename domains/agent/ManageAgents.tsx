'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { PlusIcon } from "lucide-react"
import SideBar, { SidebarPage } from "@/components/global/Sidebar"
import { ROUTES } from "@/lib/routing"
import { AgentData, AgentStatus } from "./types"
import { fetchAgents } from "./api"
import AgentCard from "./components/AgentCard"
import { useIsAuthenticated } from "@/domains/auth/hooks/isAuthenticated"

const Management = () => {
  const isAuthenticated = useIsAuthenticated();
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

  const orderAgentsByStatus = (agents: AgentData[]) => {
    return [...agents].sort((a, b) => {
      if (a.status === AgentStatus.Active && b.status !== AgentStatus.Active) return -1;
      if (a.status !== AgentStatus.Active && b.status === AgentStatus.Active) return 1;
      return 0;
    });
  };

  const sortedAgents = orderAgentsByStatus(agents);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
    <SideBar  currentPage={SidebarPage.Manage} />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Agenter</h2>
        </div>

        {/* Agent list */}
        <div className="space-y-4">
          {sortedAgents.map((agent) => (
            <AgentCard key={agent._id} agent={agent} refreshAgents={callFetchAgents} />
          ))}
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
