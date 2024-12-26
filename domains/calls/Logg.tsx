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
import { PlayCircle, FileText, Trash2, StickyNote } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { fetchAgents } from "../agent/api"
import { AgentData, AgentRecordingSetting } from "../agent/types"
import { fetchCallsByAgentId } from "./api"
import { Call, ENDING_REASON } from "./types"
import { useAuth } from '../auth/state/AuthContext';
import clsx from 'clsx';
import { Dialog, DialogFooter, DialogDescription, DialogTitle, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { formatEndingReason } from './utils';

export default function CallLogs() {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const [showPickUpsOnly, setShowPickUpsOnly] = useState(true);
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
  const [calls, setCalls] = useState<Call[]>([]);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);

  const getAgents = async (token: string) => {
    setIsLoading(true);
    const agents = await fetchAgents(token);
    if (agents) {
      setAgents(agents);
      if (!selectedAgent && agents.length > 0) {
        setSelectedAgent(agents[0]);
      }
    }
    setIsLoading(false);
  };

  const fetchCalls = async (agentId: string, token: string) => {
    const agentCalls = await fetchCallsByAgentId(agentId, token);
    setCalls(agentCalls);
  }

  useEffect(() => {
    if (token) {
      getAgents(token);
    }
  }, [token]);

  useEffect(() => {
    if (token && selectedAgent?._id) {
      fetchCalls(selectedAgent?._id, token);
    }
  }, [token, selectedAgent?._id]);

  const handleShowTranscript = (call: Call) => {
    setSelectedCall(call);
    document.getElementById('show-transcript-dialog')?.click();
  }

  const handlePlayAudio = (call: Call) => {
    setSelectedCall(call);
    document.getElementById('show-audio-dialog')?.click();
  }

  const handleShowNote = (call: Call) => {
    setSelectedCall(call);
    document.getElementById('show-note-dialog')?.click();
  }

  const filteredCalls = useMemo(() => {
    if (!showPickUpsOnly) return calls;
    
    return calls.filter(call => {
      return !!(call.startedAt && call.endedAt) === true && call.status !== 'Processing';
    });
  }, [calls, showPickUpsOnly]);

  const formattedEndingReason = (endingReason: ENDING_REASON) => {
    return formatEndingReason(endingReason)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar currentPage={SidebarPage.Logg} />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm font-light text-black">Logger</p>
        </div>

        <div>
          <div className="mb-4">
            <select
              className="w-full p-2 border rounded-md text-gray-800 bg-white"
              value={selectedAgent?._id}
              onChange={(e) => {
                const agent = agents.find(a => a._id === e.target.value);
                setSelectedAgent(agent || null);
                if (token) {
                  fetchCalls(e.target.value, token);
                }
              }}
            >
              {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4 pl-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="reached-only" checked={showPickUpsOnly} onCheckedChange={(checked) => {
              setShowPickUpsOnly(checked as boolean);
            }} />
            <Label htmlFor="reached-only" className="text-sm text-gray-800 font-light">Only reached calls</Label>
          </div>
        </div>

        <div className="bg-white text-gray-900 shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Successful</TableHead>
                <TableHead>Ending reason</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCalls.map((call, index) => {
                const duration = call.startedAt && call.endedAt ? new Date(call.endedAt).getTime() - new Date(call.startedAt).getTime() : 0;
                const durationFormatted = duration > 0 
                  ? format(new Date(0).setMilliseconds(duration), 'mm:ss')
                  : '00:00';
                const hideSound = call.settings?.recordingType === AgentRecordingSetting.CONDITIONAL && !call.settings?.acceptedRecording;
                const endedBecauseOfVoicemail = call.outcome.endingReason === ENDING_REASON.VOICEMAIL;
                return (
                  <TableRow key={index}>
                    <TableCell>{format(new Date(call.createdAt), "d. MMM yy 'kl' HH:mm", { locale: nb })}</TableCell>
                    <TableCell>{call.phoneNumber}</TableCell>
                    <TableCell>{call.status}</TableCell>
                    <TableCell>{durationFormatted}</TableCell>
                    <TableCell>{call.outcome.booleanValue ? "✅" : "❌"}</TableCell>
                    <TableCell>{call.outcome.endingReason ? formattedEndingReason(call.outcome.endingReason) : "Unknown"} {call.outcome.receivedVoicemail && !endedBecauseOfVoicemail ? "- Voicemail" : ""}</TableCell>
                    <TableCell>
                    <div className="flex space-x-2">
                      {!hideSound &&                      
                        <Button variant="ghost" size="icon" title="Play" onClick={() => handlePlayAudio(call)}>
                          <PlayCircle className={clsx("h-4 w-4", call.recordingUrl ? "" : "opacity-50")} />
                        </Button>
                      }
                      <Button variant="ghost" size="icon" title="Read transcript" onClick={() => handleShowTranscript(call)}>
                        <FileText className={clsx("h-4 w-4", call.transcript?.length > 0  ? "" : "opacity-50")} />
                      </Button>
                      {call.note && (
                        <Button variant="ghost" size="icon" title="Read note" onClick={() => handleShowNote(call)}>
                          <StickyNote className="h-4 w-4" />
                      </Button>)}
                      {/* TODO: Add delete call */}
                      <Button variant="ghost" size="icon" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              }
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button className="hidden" id="show-audio-dialog"></button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-white text-gray-800">
            <DialogHeader>
              <DialogTitle>Audio recording</DialogTitle>
              <DialogDescription>
                Listen to the call
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {selectedCall?.recordingUrl ? (
                <audio controls className="w-full" autoPlay>
                  <source src={selectedCall.recordingUrl} type="audio/mpeg" />
                  Your browser does not support audio playback
                </audio>
              ) : (
                <p>No audio recording available</p>
              )}
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => {
                setSelectedCall(null)
                document.getElementById('show-audio-dialog')?.click();
              }}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            {/* This is hidden and controlled programmatically */}
            <button className="hidden" id="show-transcript-dialog"></button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-white text-gray-800">
            <DialogHeader>
              <DialogTitle>Call transcript</DialogTitle>
              <DialogDescription>
                Transcript of the call
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 whitespace-pre-wrap">
              {selectedCall?.transcript || 'No transcript available'}
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => {
                setSelectedCall(null)
                document.getElementById('show-transcript-dialog')?.click();
              }}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <button className="hidden" id="show-note-dialog"></button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-white text-gray-800">
            <DialogHeader>
              <DialogTitle>Note</DialogTitle>
              <DialogDescription>
                Note from the call
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {selectedCall?.note ? (
                <div className="whitespace-pre-wrap">
                  {selectedCall.note}
                </div>
              ) : (
                <p>No note available</p>
              )}
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => {
                setSelectedCall(null)
                document.getElementById('show-note-dialog')?.click();
              }}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex justify-center mt-4">
          <nav className="inline-flex">
            <Button variant="default" size="sm">1</Button>
          </nav>
        </div>
      </main>
    </div>
  )
}