'use client'

import { format, isSameDay } from 'date-fns';
import { useSearchParams } from 'next/navigation';
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
import { PlayCircle, FileText, Trash2, StickyNote, Phone } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { fetchAgents } from "../agent/api"
import { AgentData, AgentRecordingSetting, AgentType } from "../agent/types"
import { fetchCallsByAgentId, triggerCall } from "./api"
import { Call, ENDING_REASON } from "./types"
import { useAuth } from '../auth/state/AuthContext';
import clsx from 'clsx';
import { Dialog, DialogFooter, DialogDescription, DialogTitle, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { formatEndingReason } from './utils';
import { Separator } from '@/components/ui/separator';
import { DatePicker } from '@/components/base/DatePicker';
import { Badge } from '@/components/ui/badge';
import { OutcomeCallCell } from './component/OutcomeCallCell';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CallLogs() {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const [showPickUpsOnly, setShowPickUpsOnly] = useState(true);
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
  const [calls, setCalls] = useState<Call[]>([]);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [showRealtime, setShowRealtime] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [durationFilter, setDurationFilter] = useState<string>('all');
  const [minDuration, setMinDuration] = useState<string>('');
  const [maxDuration, setMaxDuration] = useState<string>('');

  const searchParams = useSearchParams();
  const searchId = searchParams.get('agentId');

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

  const fetchCallsIfAgentIsSelected = async () => {
    if (token && selectedAgent?._id) {
      fetchCalls(selectedAgent?._id, token);
    }
  }

  const handleTriggerCall = async (call: Call) => {
    // console.log("LOGG - trigger call", call);
    // @ts-ignore
    if (call._id && token) {
      // @ts-ignore
      await triggerCall(call._id, token);
      await fetchCallsIfAgentIsSelected();
    }
  }

  useEffect(() => {
    if (token) {
      getAgents(token);
    }
  }, [token]);

  useEffect(() => {
    fetchCallsIfAgentIsSelected();
  }, [token, selectedAgent?._id]);

  const refreshLogsRealtime = () => {       
    if (token && selectedAgent?._id && showRealtime) {
      const THIRTY_SECONDS = 30 * 1000;
      const interval = setInterval(() => {
        fetchCallsIfAgentIsSelected();
      }, THIRTY_SECONDS);

      return () => clearInterval(interval);
    }
  }

  useEffect(() => {
    refreshLogsRealtime();
  }, [token, selectedAgent?._id, showRealtime]);

  const setSelectedAgentFromSearchParams = () => {
    if (searchId && agents.length > 0) {
      setSelectedAgent(agents.find(a => a._id === searchId) || null);
    }
  }

  useEffect(() => {
    setSelectedAgentFromSearchParams();
  }, [searchId, agents]);

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
    const sameDayCalls = calls.filter(call => {
      if (date) {
        return isSameDay(call.createdAt, date);
      }
      return true;
    });

    let filteredByPickUps = sameDayCalls;
    if (showPickUpsOnly) {
      filteredByPickUps = sameDayCalls.filter(call => {
        return !!(call.startedAt && call.endedAt) === true && call.status !== 'Processing';
      });
    }

    // Apply duration filter
    if (durationFilter !== 'all') {
      return filteredByPickUps.filter(call => {
        if (!call.startedAt || !call.endedAt) return false;
        
        const duration = new Date(call.endedAt).getTime() - new Date(call.startedAt).getTime();
        const durationInSeconds = Math.floor(duration / 1000);
        
        switch (durationFilter) {
          case 'short':
            return durationInSeconds < 30;
          case 'medium':
            return durationInSeconds >= 30 && durationInSeconds < 120;
          case 'long':
            return durationInSeconds >= 120;
          case 'custom':
            const min = minDuration ? parseInt(minDuration) : 0;
            const max = maxDuration ? parseInt(maxDuration) : Infinity;
            return durationInSeconds >= min && durationInSeconds <= max;
          default:
            return true;
        }
      });
    }

    return filteredByPickUps;
  }, [calls, showPickUpsOnly, date, durationFilter, minDuration, maxDuration]);

  const formattedEndingReason = (endingReason: ENDING_REASON) => {
    return formatEndingReason(endingReason)
  }

  const isSelectedAgentOutbound = selectedAgent?.type === AgentType.Outgoing;

  return (
    <div>
      {isLoading ? <SkeletonLoader /> : (
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

            <div className="flex mb-4 pl-4 justify-between items-center">
              <div className="flex items-center space-x-2">
                <Checkbox id="realtime" checked={showRealtime} onCheckedChange={(checked) => {
                  setShowRealtime(checked as boolean);
                }} />
                <Label htmlFor="realtime" className="text-sm text-gray-800 font-light">Watch</Label>

                <Checkbox id="reached-only" checked={showPickUpsOnly} onCheckedChange={(checked) => {
                  setShowPickUpsOnly(checked as boolean);
                }} />
                <Label htmlFor="reached-only" className="text-sm text-gray-800 font-light">Only Reached</Label>

                <Separator orientation="vertical" className="h-4 bg-gray-600 mx-2" />

                <DatePicker date={date} onChange={setDate} />
                
                <Separator orientation="vertical" className="h-4 bg-gray-600 mx-2" />
                
                <div className="flex items-center space-x-2">
                  <Label htmlFor="duration-filter" className="text-sm text-gray-800 font-light">Duration:</Label>
                  <Select value={durationFilter} onValueChange={setDurationFilter}>
                    <SelectTrigger className="w-[120px] bg-white text-gray-800">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="short">Short (&lt; 30s)</SelectItem>
                      <SelectItem value="medium">Medium (30s-2m)</SelectItem>
                      <SelectItem value="long">Long (&gt; 2m)</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {durationFilter === 'custom' && (
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="number" 
                        placeholder="Min (s)" 
                        className="w-20 bg-white text-gray-800" 
                        value={minDuration}
                        onChange={(e) => setMinDuration(e.target.value)}
                      />
                      <span className="text-sm text-gray-800">-</span>
                      <Input 
                        type="number" 
                        placeholder="Max (s)" 
                        className="w-20 bg-white text-gray-800" 
                        value={maxDuration}
                        onChange={(e) => setMaxDuration(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-800 font-light"><span className="font-bold">Total calls:</span> {filteredCalls.length}</p>
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
                    {isSelectedAgentOutbound && <TableHead>Reached</TableHead>}
                    <TableHead>Ending reason</TableHead>
                    <TableHead>Outcomes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCalls.map((call, index) => {
                    console.log("LOGG - call", call)
                    const duration = call.startedAt && call.endedAt ? new Date(call.endedAt).getTime() - new Date(call.startedAt).getTime() : 0;
                    const durationFormatted = duration > 0
                      ? format(new Date(0).setMilliseconds(duration), 'mm:ss')
                      : '00:00';
                    const hideSound = call.settings?.recordingType === AgentRecordingSetting.CONDITIONAL && !call.settings?.acceptedRecording;
                    const endedBecauseOfVoicemail = call.outcome.endingReason === ENDING_REASON.VOICEMAIL;
                    const reached = call.status === 'Completed' && duration > 0 && !endedBecauseOfVoicemail && !call.outcome.receivedVoicemail;
                    const isQueued = call.status === 'Queued';
                    const isCeaseAndDesist = call.outcome.collectionAnalysis?.cease_and_desist;
                    const isBankruptcy = call.outcome.collectionAnalysis?.bankruptcy;
                    const isLegalAction = call.outcome.collectionAnalysis?.legal_action;
                    const paymentMade = call.outcome.collectionAnalysis?.paymentMade?.payment_received;
                    const paymentFailed = call.outcome.collectionAnalysis?.paymentMade?.payment_failed;
                    const humanWantedToTalk = call.outcome.contactAnalysis?.wanted_to_talk_human;
                    return (
                      <TableRow key={index}>
                        <TableCell>{format(new Date(call.createdAt), "d. MMM yy 'kl' HH:mm", { locale: nb })}</TableCell>
                        <TableCell>{call.phoneNumber}</TableCell>
                        <TableCell>{call.status}</TableCell>
                        <TableCell>{durationFormatted}</TableCell>
                        <TableCell>{call.outcome.booleanValue ? "✅" : "❌"}</TableCell>
                        {isSelectedAgentOutbound && <TableCell>{reached ? "✅" : "❌"}</TableCell>}
                        <TableCell>{call.outcome.endingReason ? formattedEndingReason(call.outcome.endingReason) : "Unknown"} {call.outcome.receivedVoicemail && !endedBecauseOfVoicemail ? "- Voicemail" : ""}

                          {call.outcome.vulnerability && <span>⚠️</span>}
                        </TableCell>
                        <TableCell>
                          {paymentFailed && <Badge variant="destructive">Payment failed</Badge>}
                          {paymentMade && <Badge className="ml-1">Payment made</Badge>}
                          {humanWantedToTalk && <Badge className="ml-1">Wants human</Badge>}
                          <OutcomeCallCell
                            isCeaseAndDesist={isCeaseAndDesist}
                            isBankruptcy={isBankruptcy}
                            isLegalAction={isLegalAction}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {!hideSound &&
                              <Button variant="ghost" size="icon" title="Play" onClick={() => handlePlayAudio(call)}>
                                <PlayCircle className={clsx("h-4 w-4", call.recordingUrl ? "" : "opacity-50")} />
                              </Button>
                            }
                            <Button variant="ghost" size="icon" title="Read transcript" onClick={() => handleShowTranscript(call)}>
                              <FileText className={clsx("h-4 w-4", call.transcript?.length > 0 ? "" : "opacity-50")} />
                            </Button>
                            {call.note && (
                              <Button variant="ghost" size="icon" title="Read note" onClick={() => handleShowNote(call)}>
                                <StickyNote className="h-4 w-4" />
                              </Button>)}
                            {isQueued && (
                              <Button variant="ghost" size="icon" title="Trigger call" onClick={() => handleTriggerCall(call)}>
                                <Phone className="h-4 w-4" />
                              </Button>
                            )}
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
      )}
    </div>
  )
}


export const SkeletonLoader = () => {
  return (
    <div className="flex h-screen bg-gray-100 animate-pulse">
      {/* Sidebar */}
      <SideBar currentPage={SidebarPage.Logg} />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>

        <div className="mb-4">
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>

        <div className="mb-4 pl-4">
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-gray-300 rounded w-6"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-6"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-1"></div>
            <div className="h-10 bg-gray-300 rounded w-32"></div>
          </div>
        </div>

        <div className="bg-white text-gray-900 shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><div className="h-4 bg-gray-300 rounded w-20"></div></TableHead>
                <TableHead><div className="h-4 bg-gray-300 rounded w-20"></div></TableHead>
                <TableHead><div className="h-4 bg-gray-300 rounded w-20"></div></TableHead>
                <TableHead><div className="h-4 bg-gray-300 rounded w-20"></div></TableHead>
                <TableHead><div className="h-4 bg-gray-300 rounded w-20"></div></TableHead>
                <TableHead><div className="h-4 bg-gray-300 rounded w-20"></div></TableHead>
                <TableHead><div className="h-4 bg-gray-300 rounded w-20"></div></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell><div className="h-4 bg-gray-300 rounded w-full"></div></TableCell>
                  <TableCell><div className="h-4 bg-gray-300 rounded w-full"></div></TableCell>
                  <TableCell><div className="h-4 bg-gray-300 rounded w-full"></div></TableCell>
                  <TableCell><div className="h-4 bg-gray-300 rounded w-full"></div></TableCell>
                  <TableCell><div className="h-4 bg-gray-300 rounded w-full"></div></TableCell>
                  <TableCell><div className="h-4 bg-gray-300 rounded w-full"></div></TableCell>
                  <TableCell><div className="h-4 bg-gray-300 rounded w-full"></div></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}