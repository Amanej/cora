import APP_CONFIG from '@/lib/config';
import { ICallSheet } from '../types';

export const createCallsheet = async (callsheet: ICallSheet): Promise<ICallSheet> => {
  console.log("Create createCallsheet called");
  const response = await fetch(APP_CONFIG.backendUrl+'/callsheets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(callsheet),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getCallsheetsByAgent = async (agentId: string): Promise<ICallSheet[]> => {
  const response = await fetch(`${APP_CONFIG.backendUrl}/callsheets/agent/${agentId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const raw = await response.json();
  return raw.map((callsheet: any) => ({
    ...callsheet,
    id: callsheet._id.toString()
  }));
};

export const triggerProcessCallsheetWithAgent = async (agentId: string, callSheetId: string): Promise<void> => {
  const response = await fetch(`${APP_CONFIG.backendUrl}/agents/${agentId}/process-callsheet/${callSheetId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  await response.json(); // Consume the response body
};
