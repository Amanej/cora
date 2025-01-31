'use client'

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label"
import { Trash } from "lucide-react"
import { fetchIntegrations } from "../../api";
import { Integration } from "@/domains/integrations/types";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { useAuth } from "@/domains/auth/state/AuthContext";

type AgentActionProps = {
    integrationIds: string[];
    setIntegrationIds: (integrationIds: string[]) => void;
}

const AgentActions = ({ integrationIds, setIntegrationIds }: AgentActionProps) => {
    const { token } = useAuth();
    const [integrations, setIntegrations] = useState<Integration[]>([]);
    const [selectedIntegrationIds, setSelectedIntegrationIds] = useState<string[]>(integrationIds);

    const getIntegrations = async (token: string) => {
        const integrations = await fetchIntegrations(token);
        setIntegrations(integrations.integrations);
    }

    const updateAgent = () => {
        // console.log("Update agent called with ", selectedIntegrationIds)
        setIntegrationIds(selectedIntegrationIds);
    }

    useEffect(() => {
        if (token) {
            getIntegrations(token);
        }
    }, [token]);

    useEffect(() => {
        setSelectedIntegrationIds(integrationIds);
    }, [integrationIds]);

    useEffect(() => {
        updateAgent();
    }, [selectedIntegrationIds]);


    // console.log("Selected integration ids", selectedIntegrationIds)

    return (
        <div className="space-y-2">
            <Label>Actions</Label>
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
                    // console.log("Value changed to ", value)
                    if (selectedIntegrationIds.includes(value)) {
                        setSelectedIntegrationIds(selectedIntegrationIds.filter((integration) => integration !== value));
                    } else {
                        setSelectedIntegrationIds([...selectedIntegrationIds, value]);
                    }
                }}
            >
                <SelectTrigger>
                    <SelectValue placeholder={"Select an action"} />
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