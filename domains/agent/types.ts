export enum AgentStatus {
  Draft = 'Draft',
  Active = 'Active',
  Inactive = 'Inactive',
}

export enum AgentType {
  Incoming = 'Incoming',
  Outgoing = 'Outgoing',
}

export enum AgentStructuredSummaryType {
  Boolean = 'boolean',
  String = 'string',
  Number = 'number',
}

export type AgentStructuredSummaryFields = {
  name: string;
  type: AgentStructuredSummaryType;
  description?: string;
  required?: boolean;
}

export enum AgentRecordingSetting {
  ON = 'on',
  OFF = 'off',
  CONDITIONAL = 'conditional',
}

export enum AgentVoicemailBehaviour {
  LEAVE_VOICEMAIL = 'leave_voicemail',
  HANG_UP = 'hang_up',
}

export type AgentData = {
  _id?: string,
  title: string,
  phoneNumberId: string,
  type: AgentType,
  instructions: string,
  openingLine: string,
  knowledgebase: {
    url: string,
    name: string
  }[],
  integrationIds: string[],
  createdAt: Date,
  status: AgentStatus,
  templateId: string,
  persona: string,
  endCallPhrases?: string[];
  evaluation: {
    summary?: string;
    successEvaluation?: string;
    structuredSummary?: AgentStructuredSummaryFields[];
  };
  settings: {
    recordingType: AgentRecordingSetting;
    voicemailBehaviour?: AgentVoicemailBehaviour;
    voicemailMessage?: string;
  };
};
