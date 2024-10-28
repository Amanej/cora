// Copied from backend - @TODO: Move to shared types - when creating monorepo
export enum CallSheetStatus {
    Pending = 'Pending',
    Processing = 'Processing',
    Completed = 'Completed',
    Failed = 'Failed'
}

export interface ICallSheetItem {
    id: string | null;
    name: string;
    phoneNumber: string;
    metadata?: object
    callId: string | null;
    saved?: boolean;
    status: CallSheetStatus;
}

export interface ICallSheet {
    id: string | null;
    items: ICallSheetItem[];
    status: CallSheetStatus;
    agentId: string;
    ownerId: string;
}