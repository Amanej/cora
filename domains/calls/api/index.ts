import axios from 'axios';
import { Call } from '../types';
import APP_CONFIG from '@/lib/config';
import { getLoggedInHeaders } from '@/domains/auth/utils';

export const fetchCallsByAgentId = async (agentId: string, token: string): Promise<Call[]> => {
  try {
    const response = await axios.get(`${APP_CONFIG.backendUrl}/calls/agent/${agentId}`, { headers: getLoggedInHeaders(token) });
    return response.data;
  } catch (error) {
    console.error('Error fetching calls:', error);
    throw error;
  }
};

export const fetchCallDetails = async (callId: string, token: string): Promise<Call> => {
  try {
    const response = await axios.get(`${APP_CONFIG.backendUrl}/calls/${callId}`, { headers: getLoggedInHeaders(token) });
    return response.data;
  } catch (error) {
    console.error('Error fetching call details:', error);
    throw error;
  }
};

export const deleteCall = async (callId: string, token: string): Promise<void> => {
  try {
    await axios.delete(`${APP_CONFIG.backendUrl}/calls/${callId}`, { headers: getLoggedInHeaders(token) });
  } catch (error) {
    console.error('Error deleting call:', error);
    throw error;
  }
};

export const triggerCall = async (callId: string, token: string): Promise<void> => {
  try {
    await axios.post(`${APP_CONFIG.backendUrl}/calls/trigger/${callId}`, { headers: getLoggedInHeaders(token) });
  } catch (error) {
    console.error('Error triggering call:', error);
    throw error;
  }
};