import axios from 'axios';
import { Call } from '../types';
import APP_CONFIG from '@/lib/config';

export const fetchCallsByAgentId = async (agentId: string): Promise<Call[]> => {
  try {
    const response = await axios.get(`${APP_CONFIG.backendUrl}/calls/agent/${agentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching calls:', error);
    throw error;
  }
};

export const fetchCallDetails = async (callId: string): Promise<Call> => {
  try {
    const response = await axios.get(`${APP_CONFIG.backendUrl}/calls/${callId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching call details:', error);
    throw error;
  }
};

export const deleteCall = async (callId: string): Promise<void> => {
  try {
    await axios.delete(`${APP_CONFIG.backendUrl}/calls/${callId}`);
  } catch (error) {
    console.error('Error deleting call:', error);
    throw error;
  }
};
