'use client'

import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import SideBar, { SidebarPage } from "@/components/global/Sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { AgentData } from '@/domains/agent/types';
import { fetchAgentById } from '@/domains/agent/api';
import { useRouter } from 'next/navigation';
import { CallSheetStatus, ICallSheet } from '../types';
import { useAuth } from '@/domains/auth/state/AuthContext';

const callsheets: ICallSheet[] = [
  { id: '1', items: [], agentId: '1', ownerId: '1', status: CallSheetStatus.Pending },
]

type Props = {
    agentId: string
}

export default function Callsheets({ agentId }: Props) {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const [agentData, setAgentData] = useState<AgentData | null>(null);
  const router = useRouter();

  const fetchAgent = async (id: string, token: string) => {
    console.log('Fetching agent with ID:', id);
    setIsLoading(true);
    const agent = await fetchAgentById(id as string, token);
    // console.log('Agent fetched:', agent);
    if (agent) {
      setAgentData(agent);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (agentId && token) {
      fetchAgent(agentId, token);
    }
  }, [agentId, token]);


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar currentPage={SidebarPage.Logg} />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm font-light text-black">Ringelister &gt; <span className="font-bold">{agentData?.title || 'Unknown'}</span></p>
        </div>

        <div className="bg-white text-gray-900 shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Calls</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {callsheets.map((callsheet, index) => (
                <TableRow key={index} onClick={() => {
                  router.push(`/dashboard/agent/call-sheet/${callsheet.id}`);
                }}>
                  <TableCell>{callsheet.agentId}</TableCell>
                  <TableCell>{format(new Date(), "d. MMM yy 'kl' HH:mm", { locale: nb })}</TableCell>
                  <TableCell>{callsheet.status}</TableCell>
                  <TableCell>{callsheet.items.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      </main>
    </div>
  )
}