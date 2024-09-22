import APP_CONFIG from "@/lib/config";
import { AgentData } from "../types";

export const createAgent = async (agentData: AgentData) => {
    try {
        const response = await fetch(APP_CONFIG.apiUrl+'/agents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...agentData, ownerId: '123'}),
        });

        if (!response.ok) {
            throw new Error('Failed to create agent');
        }

        const newAgent = await response.json();
        console.log('Agent created successfully:', newAgent);
    } catch (error) {
        console.error('Error creating agent:', error);
    }
};

export const fetchAgents = async () => {
    try {
        const response = await fetch(APP_CONFIG.apiUrl+'/agents', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch agents');
        }

        const agents: AgentData[] = await response.json();
        console.log('Agents fetched successfully:', agents.length);
        return agents;
    } catch (error) {
        console.error('Error fetching agents:', error);
    }
};



