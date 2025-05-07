import { format } from 'date-fns';
import { enUS, nb } from 'date-fns/locale';
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { PlayCircle, FileText, StickyNote, Phone, Copy } from "lucide-react"
import clsx from 'clsx';
import { Call, ENDING_REASON } from "../types";
import { AgentRecordingSetting } from "../../agent/types";
import { OutcomesCell } from "../component/Outcomes";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from '@/hooks/use-toast';
import { CallProgress } from '../component/CallProgress';

interface CallLogRowProps {
  call: Call;
  index: number;
  phoneFilter: string;
  isSelectedAgentOutbound: boolean;
  agentIsScollect: boolean;
  onPhoneClick: (phoneNumber: string) => void;
  onPlayAudio: (call: Call) => void;
  onShowTranscript: (call: Call) => void;
  onShowNote: (call: Call) => void;
  onTriggerCall: (call: Call) => void;
  onShowPaymentPlan: (call: Call) => void;
  formattedEndingReason: (endingReason: ENDING_REASON) => string;
}

export const CallLogRow = ({
  call,
  index,
  phoneFilter,
  isSelectedAgentOutbound,
  agentIsScollect,
  onPhoneClick,
  onPlayAudio,
  onShowTranscript,
  onShowNote,
  onTriggerCall,
  onShowPaymentPlan,
  formattedEndingReason,
}: CallLogRowProps) => {
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
  const planAccepted = call.outcome.collectionAnalysis?.paymentPlan?.plan_accepted;

  return (
    <TableRow key={index}>
      <TableCell>{format(new Date(call.startedAt || call.createdAt), "d. MMM yy 'kl' HH:mm")}</TableCell>
      <TableCell>
        <button 
          className={clsx(
            "text-left hover:underline focus:outline-none", 
            phoneFilter === call.phoneNumber ? "font-bold text-blue-600" : ""
          )}
          onClick={() => onPhoneClick(call.phoneNumber)}
        >
          {call.phoneNumber}
        </button>
      </TableCell>
      {isSelectedAgentOutbound && <TableCell>{call.status}</TableCell>}
      <TableCell>{durationFormatted}</TableCell>
      <TableCell>{call.outcome.booleanValue ? "✅" : "❌"}</TableCell>
      {isSelectedAgentOutbound && <TableCell>{reached ? "✅" : "❌"}</TableCell>}
      {agentIsScollect && <TableCell>
        <CallProgress
          attemptedVerification={call.outcome.collectionAnalysis?.callProgress?.attemptedVerification}
          explainedDebt={call.outcome.collectionAnalysis?.callProgress?.explainedDebt}
          offeredPaymentOptions={call.outcome.collectionAnalysis?.callProgress?.offeredPaymentOptions}
        />
      </TableCell>}
      <TableCell>
        {call.outcome.endingReason ? formattedEndingReason(call.outcome.endingReason) : "Unknown"} 
        {isSelectedAgentOutbound && call.outcome.receivedVoicemail && !endedBecauseOfVoicemail ? "- Voicemail" : ""}
        {call.outcome.vulnerability && <span>⚠️</span>}
      </TableCell>
      <TableCell>
        <OutcomesCell 
          paymentFailed={paymentFailed}
          paymentMade={paymentMade}
          humanWantedToTalk={humanWantedToTalk}
          isCeaseAndDesist={isCeaseAndDesist}
          isBankruptcy={isBankruptcy}
          isLegalAction={isLegalAction}
        />
        {planAccepted && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge 
                  className="ml-1 cursor-pointer" 
                  onClick={() => onShowPaymentPlan(call)}
                >
                  Plan accepted
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to view payment plan details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          {!hideSound &&
            <Button variant="ghost" size="icon" title="Play" onClick={() => onPlayAudio(call)}>
              <PlayCircle className={clsx("h-4 w-4", call.recordingUrl ? "" : "opacity-50")} />
            </Button>
          }
          <Button variant="ghost" size="icon" title="Read transcript" onClick={() => onShowTranscript(call)}>
            <FileText className={clsx("h-4 w-4", call.transcript?.length > 0 ? "" : "opacity-50")} />
          </Button>
          {call.note && (
            <Button variant="ghost" size="icon" title="Read note" onClick={() => onShowNote(call)}>
              <StickyNote className="h-4 w-4" />
            </Button>
          )}
          {isQueued && (
            <Button variant="ghost" size="icon" title="Trigger call" onClick={() => onTriggerCall(call)}>
              <Phone className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost" 
            size="icon"
            title="Copy ID"
            onClick={async () => {
              await navigator.clipboard.writeText(call._id);
              toast({
                className: "bg-white text-gray-800",
                description: "ID copied to clipboard",
                duration: 2000,
              });
            }}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}; 