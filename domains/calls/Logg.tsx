'use client'

import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import SideBar, { SidebarPage } from "@/components/global/Sidebar"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PlayCircle, FileText, Trash2, LogOut } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchAgentById } from "../agent/api"
import { AgentData } from "../agent/types"
import { fetchCallsByAgentId } from "./api"
import { Call } from "./types"

const callLogs = [
  { date: "18. sept 24 kl 20:35", number: "22 22 55 55", name: "Kari Jackson", duration: "2:30" },
  { date: "18. sept 24 kl 20:35", number: "22 22 55 55", name: "Stefan Mani", duration: "2:30" },
  { date: "18. sept 24 kl 20:35", number: "22 22 55 55", name: "Ali Abdulla", duration: "2:30" },
  { date: "18. sept 24 kl 20:35", number: "22 22 55 55", name: "Bjørg Per", duration: "2:30" },
  { date: "18. sept 24 kl 20:35", number: "22 22 55 55", name: "Ingrid Fagerborg", duration: "2:30" },
  { date: "18. sept 24 kl 20:35", number: "22 22 55 55", name: "Manuela Snilsberg", duration: "2:30" },
  // Add more log entries as needed
]

type Props = {
  id: string
}

export default function CallLogs({ id }: Props) { // Set to false for create mode
  const [isLoading, setIsLoading] = useState(false)
  const [agentData, setAgentData] = useState<AgentData | null>(null);
  const [calls, setCalls] = useState<Call[]>([]);

  const fetchAgent = async (id: string) => {
    console.log('Fetching agent with ID:', id);
    setIsLoading(true);
    const agent = await fetchAgentById(id as string);
    console.log('Agent fetched:', agent);
    if (agent) {
      setAgentData(agent);
    }
    setIsLoading(false);
  };

  const fetchCalls = async (agentId: string) => {
    const agentCalls = await fetchCallsByAgentId(agentId);
    console.log('Calls fetched:', agentCalls);
    setCalls(agentCalls);
  }


  useEffect(() => {
    if (id) {
      fetchAgent(id);
      fetchCalls(id);
    }
  }, []);


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar currentPage={SidebarPage.Logg} />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm font-light text-black">Logger &gt; <span className="font-bold">{agentData?.title || 'Unknown'}</span></p>
          <Button variant="ghost">
            <LogOut className="mr-2 h-4 w-4" />
            Logg ut
          </Button>
        </div>

        <div className="bg-white text-gray-900 shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dato</TableHead>
                <TableHead>Nummer</TableHead>
                <TableHead>Navn</TableHead>
                <TableHead>Varighet</TableHead>
                <TableHead>Handlinger</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calls.map((call, index) => (
                <TableRow key={index}>
                  <TableCell>{format(new Date(call.createdAt), "d. MMM yy 'kl' HH:mm", { locale: nb })}</TableCell>
                  <TableCell>{call.phoneNumber}</TableCell>
                  <TableCell>{call.agentId}</TableCell>
                  <TableCell>{call.status}</TableCell>
                </TableRow>
              ))}
              {callLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.number}</TableCell>
                  <TableCell>{log.name}</TableCell>
                  <TableCell>{log.duration}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" title="Spill av">
                        <PlayCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Les">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Slett">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center mt-4">
          <nav className="inline-flex">
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
          </nav>
        </div>
      </main>
    </div>
  )
}