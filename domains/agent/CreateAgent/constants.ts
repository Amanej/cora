import { AgentData, AgentStatus, AgentType } from "../types";

export const DEFAULT_INSTRUCTIONS = `### **[Identity]**
- Beskriv hvem du er og hva du gjør

### **[Style]**
- Beskriv stil og tone i dialogen

### **[Response Guideline]**
- Beskriv guidelines for hvordan agenten skal oppføre seg

### **[Task]**
- Beskrive oppgavene agent skal utføre
`;

export const defaultAgentData: AgentData = {
    title: '',
    phoneNumberId: '+4746164687',
    subTitle: '',
    type: AgentType.Incoming,
    instructions: DEFAULT_INSTRUCTIONS,
    knowledgebase: [],
    createdAt: new Date(),
    status: AgentStatus.Active,
    templateId: '',
    persona: '', // Add this line
  }
  