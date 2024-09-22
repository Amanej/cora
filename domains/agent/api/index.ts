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

export const deleteAgent = async (agentId: string) => {
    try {
        const response = await fetch(APP_CONFIG.apiUrl+'/agents/'+agentId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete agent');
        }

        console.log('Agent deleted successfully:', agentId);
        return true;
    } catch (error) {
        console.error('Error deleting agent:', error);
    }
};

export const updateAgent = async (agentData: Partial<AgentData>) => {
    try {
        const response = await fetch(APP_CONFIG.apiUrl+'/agents/'+agentData._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...agentData}),
        });

        if (!response.ok) {
            throw new Error('Failed to update agent');
        }

        const updatedAgent = await response.json();
        console.log('Agent updated successfully:', updatedAgent);
    } catch (error) {
        console.error('Error updating agent:', error);
    }
};


