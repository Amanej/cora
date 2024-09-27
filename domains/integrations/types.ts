export type IntegrationParameter = {
    name: string;
    type: string;
    description: string;
    required: boolean;
  };
  
  export type Integration = {
    id: string;
    name: string;
    description: string;
    parameters: IntegrationParameter[];
  };