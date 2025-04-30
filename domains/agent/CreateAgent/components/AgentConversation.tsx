'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AgentData } from "@/domains/agent/types"
import { useEffect, useRef } from "react"

interface AgentConversationProps {
  agentData: AgentData
  setAgentData: (data: AgentData) => void
}

const HighlightedTextarea = ({ value, onChange, ...props }: any) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  console.log("HighlightedTextarea value", value)

  useEffect(() => {
    if (textareaRef.current && highlightRef.current) {
      // Get the textarea's scroll position
      const scrollTop = textareaRef.current.scrollTop;
      const scrollLeft = textareaRef.current.scrollLeft;

      // Create highlighted HTML
      const highlightedText = value.replace(
        /use function/g,
        '<span class="bg-yellow-200 text-black">use the function</span>'
      );

      // Set the highlighted text
      highlightRef.current.innerHTML = highlightedText;

      // Sync scroll positions
      highlightRef.current.scrollTop = scrollTop;
      highlightRef.current.scrollLeft = scrollLeft;
    }
  }, [value]);

  return (
    <div className="relative">
      <div
        ref={highlightRef}
        className="absolute inset-0 p-3 whitespace-pre-wrap pointer-events-none overflow-hidden"
        style={{
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          padding: 'inherit',
          border: 'inherit',
          borderRadius: 'inherit',
          backgroundColor: 'transparent',
          color: 'transparent',
          caretColor: 'black',
        }}
      />
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        className="relative bg-transparent"
        {...props}
      />
    </div>
  );
};

export default function AgentConversation({ agentData, setAgentData }: AgentConversationProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="openingLine">First message</Label>
        <Input 
          id="openingLine"
          placeholder="Opening message" 
          value={agentData.openingLine}
          onChange={(e) => {
            setAgentData({ ...agentData, openingLine: e.target.value })
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions">Instructions</Label>
        <HighlightedTextarea
          id="instructions"
          placeholder="Describe how you want the agent to behave"
          className="min-h-[200px]"
          value={agentData.instructions}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setAgentData({ ...agentData, instructions: e.target.value })
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="endCallPhrases">End call triggers<span className="text-xs text-gray-500">(comma separated)</span></Label>
        <p className="text-sm text-gray-500">Phrases that trigger the agent to end the call</p>
        <Input 
          id="endCallPhrases"
          placeholder="End call phrases" 
          value={agentData.endCallPhrases?.toString() || ''}
          onChange={(e) => {
            const endphrases = e.target.value.split(',');
            setAgentData({ ...agentData, endCallPhrases: endphrases })
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="endCallPhrases">End call message</Label>
        <p className="text-sm text-gray-500">Messages the agent will say when ending the call, default is "Goodbye" in the language of the agent</p>
        <Input 
          id="endCallMessage"
          placeholder="End call message" 
          value={agentData.endCallMessage || ''}
          onChange={(e) => {
            setAgentData({ ...agentData, endCallMessage: e.target.value })
          }}
        />
      </div>
    </div>
  )
}
