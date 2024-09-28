'use client'

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label"
import { Trash } from "lucide-react"
import { fetchIntegrations } from "../../api";
import { Integration } from "@/domains/integrations/types";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";

type AgentActionProps = {
    integrationIds: string[];
    setIntegrationIds: (integrationIds: string[]) => void;
}

const AgentActions = ({ integrationIds, setIntegrationIds }: AgentActionProps) => {
    const [integrations, setIntegrations] = useState<Integration[]>([]);
    const [selectedIntegrationIds, setSelectedIntegrationIds] = useState<string[]>(integrationIds);

    const getIntegrations = async () => {
        const integrations = await fetchIntegrations();
        setIntegrations(integrations.integrations);
    }

    useEffect(() => {
        getIntegrations();
    }, []);

    useEffect(() => {
        setSelectedIntegrationIds(integrationIds);
    }, [integrationIds]);

    const updateAgent = () => {
        setIntegrationIds(selectedIntegrationIds);
    }

    return (
        <div className="space-y-2">
            <Label>Handlinger</Label>
            <div className="space-y-1">
                {selectedIntegrationIds.map((integrationId) => {
                    const selectedIntegration = integrations.find((integration) => integration.id === integrationId);
                    return (
                        <div className="flex items-center justify-between" key={integrationId}>
                        <div>
                            <span>{selectedIntegration?.name}</span><span className="text-gray-400 ml-2">{selectedIntegration?.description}</span>
                        </div>
                        <div className="flex">
                            <Trash className="h-4 w-4 text-gray-400"
                                onClick={() => {
                                    setSelectedIntegrationIds(selectedIntegrationIds.filter((integration) => integration !== integrationId));
                                }}
                            />
                            {/*<PenSquare className="h-4 w-4 text-gray-400 ml-2" />*/}
                        </div>
                    </div>

                    )
                })}
            </div>
            <Select
                onValueChange={(value) => {
                        if(selectedIntegrationIds.includes(value)) {
                            setSelectedIntegrationIds(selectedIntegrationIds.filter((integration) => integration !== value));
                        } else {
                            setSelectedIntegrationIds([...selectedIntegrationIds, value]);
                        }
                        updateAgent();
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={"Velg en handling"} />
                    </SelectTrigger>
                    <SelectContent>
                        {integrations.map((integration: Integration) => (
                            <SelectItem disabled={selectedIntegrationIds.includes(integration.id)} key={integration.id} value={integration.id}>{integration.name}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
        </div>
    )
}

export default AgentActions;