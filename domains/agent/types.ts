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


export type AgentRepeatCallsMax = {
  perDay: number | null;
  allTime: number | null;
}

export type AgentRepeatCallsDays = {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export type AgentRepeatCallsHours = {
  from: string | null;
  to: string | null;
}

export type AgentRepeatCallsSchedule = {
  timezone: string | null;
  days: AgentRepeatCallsDays;
  hours: AgentRepeatCallsHours;
}

export type AgentRepeatCalls = {
  enabled?: boolean;
  delay?: {
      hours: number | null;
  };
  max?: AgentRepeatCallsMax;
  schedule?: AgentRepeatCallsSchedule;
}


export enum IndustryStandard {
  None = "none",
  ConsumerDutyUK = "consumer-duty-uk",
  FDCPAUS = "fdcpa-us"
}

export enum IntegrationType {
  SCollect = "scollect",
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
  integrations: IntegrationType[],
  createdAt: Date,
  status: AgentStatus,
  templateId: string,
  persona: string,
  endCallPhrases?: string[];
  endCallMessage?: string;
  externalId?: string;
  evaluation: {
    summary?: string;
    successEvaluation?: string;
    structuredSummary?: AgentStructuredSummaryFields[];
  };
  settings: {
    recordingType: AgentRecordingSetting;
    industryStandard?: IndustryStandard;
    localization?: {
      timezone?: string;
      currency?: string;
    };
    voicemailBehaviour?: AgentVoicemailBehaviour;
    voicemailMessage?: string;
    transferCallTo?: string;
    repeatCalls?: AgentRepeatCalls;
  };
};
