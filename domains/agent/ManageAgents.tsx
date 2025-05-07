'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { PlusIcon, Loader } from "lucide-react"
import SideBar, { SidebarPage } from "@/components/global/Sidebar"
import { ROUTES } from "@/lib/routing"
import { AgentData, AgentStatus } from "./types"
import { fetchAgents } from "./api"
import AgentCard from "./components/AgentCard"
import { useAuth } from "@/domains/auth/state/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const Management = () => {
  const { token, isApproved, isAuthenticated } = useAuth();
  const [agents, setAgents] = useState<AgentData[]>([]);
  const router = useRouter()

  useEffect(() => {
    if (token) {
      console.log("About to fetch agents")
      callFetchAgents(token);
    }
  }, [token]);

  const callFetchAgents = async (token: string) => {
    const agents = await fetchAgents(token);
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

  if (!isAuthenticated) {
    router.push(ROUTES.LOGIN)
  }

  const notApproved = !isApproved()
  
  if (notApproved) {
    return (
      <div className="flex h-screen bg-gray-100">
        <main className="flex-1 p-8">
          <div className="flex text-gray-800">
            <Loader className="animate-spin mr-2" /> Checking your account...
          </div>
            <Button variant="secondary" className="ml-auto mt-2" onClick={() => {
              // Clear local storage
              localStorage.clear();
              // Refresh the page
              if (typeof window !== 'undefined' && window.location) {
                window.location.reload();
              }
            }}>Try to login</Button>
        </main>
    </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar currentPage={SidebarPage.Manage} />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Agents</h2>
        </div>

        {/* Agent list */}
        <div className="space-y-4">
          {sortedAgents.map((agent) => (
            <AgentCard key={agent._id} agent={agent} refreshAgents={() => {
              if (token) {
                callFetchAgents(token)
              }
            }}
              token={token}
            />
          ))}
        </div>

        {/* Add agent button */}
        <div className="mt-8">
          <Link href={ROUTES.CREATE_AGENT} className="inline-flex items-center py-2 px-4 text-white bg-blue-500 rounded-xl font-bold">
            <PlusIcon className="mr-2 h-4 w-4" />
            Create agent
          </Link>
        </div>
      </main>
    </div>
  )
}
export default Management
