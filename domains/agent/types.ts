export enum AgentStatus {
  Draft = 'Draft',
  Active = 'Active',
  Inactive = 'Inactive',
}

export enum AgentType {
  Incoming = 'Incoming',
  Outgoing = 'Outgoing',
}


export type AgentData = {
  _id?: string,
  title: string,
  phoneNumberId: string,
  subTitle: string,
  type: AgentType,
  instructions: string,
  knowledgebase: {
    url: string,
    name: string
  }[],
  integrationIds: string[],
  createdAt: Date,
  status: AgentStatus,
  templateId: string,
  persona: string,
};
