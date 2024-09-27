'use client'

import { useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routing";
import { CircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AgentData, AgentStatus, AgentType } from "../types";
import { deleteAgent, updateAgent } from "../api";
import clsx from "clsx";

type AgentCardProps = {
    agent: AgentData;
    refreshAgents: () => void;
}

const AgentCard = ({ agent, refreshAgents }: AgentCardProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const toggleAgentStatus = async (agentId: string | undefined) => {
        console.log("toggleAgentStatus", agentId);
        setIsUpdating(true);
        if(isUpdating) {
            return;
        }
        try {
            if(agentId) {
            await updateAgent(agentId, {
                status: agent.status === AgentStatus.Active ? AgentStatus.Inactive : AgentStatus.Active
            });
        }
            setIsUpdating(false);
        } catch (error) {
            console.error("Error updating agent:", error);
            setIsUpdating(false);
        }
    }

    const callDeleteAgent = async (agentId: string) => {
        console.log("deleteAgent called", agentId);
        setIsDeleting(true);
        if(isDeleting) {
            return;
        }
        try {
            await deleteAgent(agentId);
            setIsDeleting(false);
            refreshAgents();
        } catch (error) {
            console.error("Error deleting agent:", error);
            setIsDeleting(false);
        }
    }

    const showCallList = agent.type === AgentType.Outgoing;
    const hasCalls = true;
    const isActive = agent.status === AgentStatus.Active;
    return (
        <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <div className="flex items-center space-x-3">
              <CircleIcon className={clsx("h-3 w-3", isActive ? "fill-green-500 text-green-500" : "fill-red-500 text-red-500")} />
              <span>{agent.title}</span>
            </div>
          </CardTitle>
          <p className="text-sm text-link">{agent.type}</p>
        </CardHeader>
        <CardContent>
          {/*<p className="text-xs text-muted-foreground">124 samtaler håndtert idag</p>*/}
          <Separator className="my-2" />
          <div className="flex space-x-2">
            {showCallList &&
                <Button variant="outline" size="sm">Ringelister</Button>
            }
            {hasCalls &&
                <Button variant="outline" size="sm">Se samtale logger</Button>
            }
            <Button variant="outline" size="sm"
                onClick={() => {
                    toggleAgentStatus(agent._id);
                }}
            >{isActive ? "Deaktiver" : "Aktiver"}</Button>
            <Button variant="outline" size="sm">
                <Link href={ROUTES.CREATE_AGENT+"?id="+agent._id}>Rediger</Link>
            </Button>
            <Button variant="outline" size="sm"
                disabled={isDeleting}
                onClick={() => {
                    if(agent._id) {
                        callDeleteAgent(agent._id);
                    }
                }}
            >{isDeleting ? "Sletter..." : "Slett"}</Button>
          </div>
        </CardContent>
      </Card>
    )
}

export default AgentCard;