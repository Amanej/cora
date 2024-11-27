import { AgentData, AgentRecordingSetting, AgentStatus, AgentType } from "../types";

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
    settings: {
        recordingType: AgentRecordingSetting.ON,
    },
    knowledgebase: [],
    integrationIds: [],
    createdAt: new Date(),
    status: AgentStatus.Active,
    templateId: '',
    persona: '', // Add this line
  }
  