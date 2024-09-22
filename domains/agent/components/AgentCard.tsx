import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-select";
import { CircleIcon } from "lucide-react";
import { AgentData, AgentStatus, AgentType } from "../types";
import Link from "next/link";
import { ROUTES } from "@/lib/routing";

const AgentCard = ({ agent }: { agent: AgentData }) => {

    const toggleAgentStatus = async (agentId: string | undefined) => {
        console.log("toggleAgentStatus", agentId);
        /*
                    if (isActive) {
                        deactivateAgent(agent._id);
                    } else {
                        activateAgent(agent._id);
                    }
        */
    }

    const deleteAgent = async (agentId: string | undefined) => {
        console.log("deleteAgent", agentId);
    }

    const showCallList = agent.type === AgentType.Outgoing;
    const hasCalls = true;
    const isActive = agent.status === AgentStatus.Active;
    return (
        <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <div className="flex items-center space-x-3">
              <CircleIcon className="h-3 w-3 fill-green-500 text-green-500" />
              <span>{agent.title}</span>
            </div>
          </CardTitle>
          <p className="text-sm text-link">{agent.type}</p>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">124 samtaler håndtert idag</p>
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
                onClick={() => {
                    deleteAgent(agent._id);
                }}
            >Slett</Button>
          </div>
        </CardContent>
      </Card>
    )
}

export default AgentCard;