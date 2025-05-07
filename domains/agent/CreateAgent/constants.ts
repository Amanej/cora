import { AgentData, AgentRecordingSetting, AgentStatus, AgentType, AgentVoicemailBehaviour } from "../types";

export const DEFAULT_INSTRUCTIONS = `### **[Identity]**
- Describe who you are and what you do

### **[Style]**
- Describe the style and tone of the conversation

### **[Response Guideline]**
- Describe guidelines for how the agent should behave

### **[Task]**
- Describe the tasks the agent should perform
`;

export const defaultAgentData: AgentData = {
    title: '',
    phoneNumberId: '+4746164687',
    type: AgentType.Incoming,
    instructions: DEFAULT_INSTRUCTIONS,
    openingLine: '',
    evaluation: {
        summary: '',
        successEvaluation: '',
        structuredSummary: [],
    },
    integrations: [],
    settings: {
        recordingType: AgentRecordingSetting.ON,
        voicemailBehaviour: AgentVoicemailBehaviour.LEAVE_VOICEMAIL,
        voicemailMessage: '',
        repeatCalls: {
            enabled: false,
            delay: {
                hours: null,
            },
            max: {
                perDay: null,
                allTime: null,
            },
            schedule: {
                days: {
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false,
                },
                hours: {
                    from: "09:00",
                    to: "16:00",
                },
                timezone: null,
            },
        },
    },
    knowledgebase: [],
    integrationIds: [],
    createdAt: new Date(),
    status: AgentStatus.Active,
    templateId: '',
    persona: '', // Add this line
    externalId: '',
  }
  