import APP_CONFIG from "@/lib/config";
import { AgentData } from "../types";
import { getLoggedInHeaders } from "@/domains/auth/utils";

export const createAgent = async (agentData: AgentData, token: string) => {
    try {
        const response = await fetch(APP_CONFIG.backendUrl+'/agents', {
            method: 'POST',
            headers: getLoggedInHeaders(token),
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

export const fetchAgents = async (token: string) => {
    try {
        const url = APP_CONFIG.backendUrl+'/agents';
        console.log("fetchAgents called ",url);
        const response = await fetch(url, {
            method: 'GET',
            headers: getLoggedInHeaders(token),
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

export const fetchAgentById = async (agentId: string, token: string): Promise<AgentData | null> => {
    try {
        const url = `${APP_CONFIG.backendUrl}/agents/${agentId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: getLoggedInHeaders(token),
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.log(`Agent with ID ${agentId} not found`);
                return null;
            }
            throw new Error('Failed to fetch agent');
        }

        const agent: AgentData = await response.json();
        console.log('Agent fetched successfully:', agent);
        return agent;
    } catch (error) {
        console.error('Error fetching agent:', error);
        return null;
    }
};


export const deleteAgent = async (agentId: string, token: string) => {
    try {
        const response = await fetch(APP_CONFIG.backendUrl+'/agents/'+agentId, {
            method: 'DELETE',
            headers: getLoggedInHeaders(token),
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

export const updateAgent = async (agentId: string, agentData: Partial<AgentData>, token: string) => {
    try {
        const response = await fetch(APP_CONFIG.backendUrl+'/agents/'+agentId, {
            method: 'PUT',
            headers: getLoggedInHeaders(token),
            body: JSON.stringify({...agentData}),
        });

        if (!response.ok) {
            throw new Error('Failed to update agent');
        }

        const updatedAgent = await response.json();
        console.log('Agent updated successfully:', updatedAgent);
        return true;
    } catch (error) {
        console.error('Error updating agent:', error);
        return false;
    }
};


export const testCallAgent = async (agentId: string, phoneNumberToCall: string, token: string, testValues: Record<string, string>) => {
    try {
        const response = await fetch(APP_CONFIG.backendUrl+'/calls/test-call', {
            method: 'POST',
            headers: getLoggedInHeaders(token),
            body: JSON.stringify({agentId, phoneNumberToCall, callVariables: testValues}),
        });

        if (!response.ok) {
            throw new Error('Failed to test call');
        }

        const updatedAgent = await response.json();
        console.log('Call test successfully:', updatedAgent);
    } catch (error) {
        console.error('Error testing call:', error);
    }
};

export const fetchIntegrations = async (token: string) => {
    const response = await fetch(APP_CONFIG.backendUrl+'/integrations/all', {
        method: 'GET',
        headers: getLoggedInHeaders(token),
    });     
    const data = await response.json();
    return data;
}
    


export const callApi = async (callNumber: string, useCase: string, lang: string) => {
    const response = await fetch('/api/call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phoneNumber: callNumber, useCase, lang })
    })
    const data = await response.json()
    return data
}