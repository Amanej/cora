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
import { getCallsheetsByAgent } from '../api';
import { ROUTES } from '@/lib/routing';
import { Button } from '@/components/ui/button';

type Props = {
    agentId: string
}

export default function Callsheets({ agentId }: Props) {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const [agentData, setAgentData] = useState<AgentData | null>(null);
  const [callsheets, setCallsheets] = useState<ICallSheet[]>([]);
  const router = useRouter();

  const fetchAgent = async (id: string, token: string) => {
    setIsLoading(true);
    const agent = await fetchAgentById(id as string, token);
    // console.log('Agent fetched:', agent);
    if (agent) {
      setAgentData(agent);
    }
    setIsLoading(false);
  };

  const fetchCallsheets = async (agentId: string, token: string) => {
    setIsLoading(true);
    const callsheets = await getCallsheetsByAgent(agentId, token);
    console.log("callsheets ", callsheets);
    setCallsheets(callsheets);
    setIsLoading(false);
  }

  useEffect(() => {
    if (agentId && token) {
      fetchAgent(agentId, token);
      fetchCallsheets(agentId, token);
    }
  }, [agentId, token]);


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar currentPage={SidebarPage.Logg} />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm font-light text-black">Callsheets &gt; <span className="font-bold">{agentData?.title || 'Unknown'}</span></p>
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
              {callsheets.map((callsheet: ICallSheet, index: number) => (
                <TableRow key={index} className="cursor-pointer" onClick={() => {
                  router.push(`${ROUTES.CALL_SHEET}${callsheet.id}`);
                }}>
                  <TableCell>{callsheet.title || 'No title'}</TableCell>
                  <TableCell>{callsheet.createdAt ? format(new Date(callsheet.createdAt), "d. MMM yy 'kl' HH:mm", { locale: nb }) : ''}</TableCell>
                  <TableCell>{callsheet.status}</TableCell>
                  <TableCell>{callsheet.items.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4">
          <Button onClick={() => router.push(`${ROUTES.CREATE_CALL_SHEET}${agentId}`)}>
            New callsheet
          </Button>
        </div>

      </main>
    </div>
  )
}