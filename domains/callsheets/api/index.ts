import APP_CONFIG from '@/lib/config';
import { ICallSheet } from '../types';
import { getLoggedInHeaders } from '@/domains/auth/utils';

export const createCallsheet = async (callsheet: ICallSheet, token: string): Promise<ICallSheet> => {
  console.log("Create createCallsheet called");
  const response = await fetch(APP_CONFIG.backendUrl+'/callsheets', {
    method: 'POST',
    headers: getLoggedInHeaders(token),
    body: JSON.stringify(callsheet),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getCallsheetById = async (id: string, token: string): Promise<ICallSheet> => {
    const response = await fetch(`${APP_CONFIG.backendUrl}/callsheets/${id}`, {
      method: 'GET',
      headers: getLoggedInHeaders(token),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return await response.json();
};

export const getCallsheetsByAgent = async (agentId: string, token: string): Promise<ICallSheet[]> => {
  const response = await fetch(`${APP_CONFIG.backendUrl}/callsheets/agent/${agentId}`, {
    method: 'GET',
    headers: getLoggedInHeaders(token),
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

export const triggerProcessCallsheet = async (callSheetId: string, token: string): Promise<void> => {
  const response = await fetch(`${APP_CONFIG.backendUrl}/agents/process-callsheet/${callSheetId}`, {
    method: 'POST',
    headers: getLoggedInHeaders(token),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  await response.json(); // Consume the response body
};
