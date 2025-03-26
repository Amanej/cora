
export interface CallMetric {
    id: string;
    label: string;
    value: number;
    change: number;
    trend: 'up' | 'down' | 'stable';
    category: string;
  }
  
  export interface VulnerabilityData {
    type: string;
    count: number;
  }
  
  export interface DropoutData {
    stage: string;
    count: number;
  }
  
  export interface CallContactData {
    name: string;
    value: number;
    color: string;
  }
  
  export interface CallTrendData {
    date: string;
    rpc: number;
    calls: number;
    payments: number;
  }
  
  export interface CallTimeDistribution {
    hour: string;
    calls: number;
    success: number;
  }
  
  export interface CallLog {
    id: string;
    callDate: string;
    customerName: string;
    phoneNumber: string;
    callDuration: string;
    callOutcome: string;
    vulnerabilityDetected: boolean;
    vulnerabilityType: string | null;
    notes: string;
  }
  
  export interface CallDataState {
    period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
    team: string | null;
    startDate: Date | null;
    endDate: Date | null;
    selectedMetrics: string[];
    selectedVariables: string[];
    selectedVulnerabilityType: string | null;
  }
  
  export const getCallMetrics = (): CallMetric[] => [
    {
      id: 'total-calls',
      label: 'Total Calls Made',
      value: 1254,
      change: 12.5,
      trend: 'up',
      category: 'contact'
    },
    {
      id: 'rpc',
      label: 'Right Party Contacts',
      value: 487,
      change: 8.2,
      trend: 'up',
      category: 'contact'
    },
    {
      id: 'wrong-party',
      label: 'Wrong Party Contacts',
      value: 213,
      change: -5.3,
      trend: 'down',
      category: 'contact'
    },
    {
      id: 'wrong-number',
      label: 'Wrong Numbers',
      value: 107,
      change: -7.1,
      trend: 'down',
      category: 'contact'
    },
    {
      id: 'vulnerable-customers',
      label: 'Vulnerable Customers',
      value: 163,
      change: 2.4,
      trend: 'up',
      category: 'vulnerability'
    },
    {
      id: 'payments-made',
      label: 'Payments Made',
      value: 142,
      change: 15.7,
      trend: 'up',
      category: 'outcome'
    },
    {
      id: 'income-expenditure',
      label: 'Income & Expenditure Taken',
      value: 98,
      change: 4.3,
      trend: 'up',
      category: 'outcome'
    },
    {
      id: 'human-transfer',
      label: 'Transfers to Human Agent',
      value: 76,
      change: -3.8,
      trend: 'down',
      category: 'outcome'
    },
    {
      id: 'total-debt',
      label: 'Total Debt Outstanding',
      value: 1862450,
      change: 2.1,
      trend: 'up',
      category: 'debt'
    },
    {
      id: 'debt-recovered',
      label: 'Total Debt Recovered',
      value: 458700,
      change: 12.8,
      trend: 'up',
      category: 'debt'
    },
    {
      id: 'avg-settlement',
      label: 'Average Settlement',
      value: 24.6,
      change: 3.5,
      trend: 'up',
      category: 'debt'
    }
  ];
  
  export const getVulnerabilityData = (): VulnerabilityData[] => [
    { type: 'Financial Hardship', count: 92 },
    { type: 'Health Issues', count: 47 },
    { type: 'Job Loss', count: 38 },
    { type: 'Sick/Disability', count: 25 },
    { type: 'Other Issues', count: 18 }
  ];
  
  export const getDropoutData = (): DropoutData[] => [
    { stage: 'Initial Greeting', count: 187 },
    { stage: 'Identity Verification', count: 143 },
    { stage: 'Debt Discussion', count: 79 },
    { stage: 'Payment Negotiation', count: 53 },
    { stage: 'After Payment Attempt', count: 25 }
  ];
  
  export const getCallContactData = (): CallContactData[] => [
    { name: 'Right Party', value: 487, color: 'chart-1' },
    { name: 'Wrong Party', value: 213, color: 'chart-2' },
    { name: 'Wrong Number', value: 107, color: 'chart-3' },
    { name: 'No Answer', value: 368, color: 'chart-4' },
    { name: 'Voicemail', value: 79, color: 'chart-5' }
  ];
  
  export const getCallTrendData = (): CallTrendData[] => [
    { date: 'Mon', rpc: 72, calls: 186, payments: 19 },
    { date: 'Tue', rpc: 81, calls: 209, payments: 24 },
    { date: 'Wed', rpc: 95, calls: 248, payments: 31 },
    { date: 'Thu', rpc: 89, calls: 225, payments: 27 },
    { date: 'Fri', rpc: 102, calls: 241, payments: 32 },
    { date: 'Sat', rpc: 43, calls: 107, payments: 9 },
    { date: 'Sun', rpc: 5, calls: 38, payments: 0 }
  ];
  
  export const getCallTimeDistribution = (): CallTimeDistribution[] => [
    { hour: '8am', calls: 45, success: 12 },
    { hour: '9am', calls: 87, success: 28 },
    { hour: '10am', calls: 123, success: 45 },
    { hour: '11am', calls: 145, success: 58 },
    { hour: '12pm', calls: 112, success: 47 },
    { hour: '1pm', calls: 98, success: 41 },
    { hour: '2pm', calls: 132, success: 53 },
    { hour: '3pm', calls: 156, success: 63 },
    { hour: '4pm', calls: 137, success: 59 },
    { hour: '5pm', calls: 125, success: 51 },
    { hour: '6pm', calls: 94, success: 30 }
  ];
  
  export const getCallLogs = (): CallLog[] => [
    {
      id: '1',
      callDate: '2023-03-26 09:15',
      customerName: 'John Smith',
      phoneNumber: '(555) 123-4567',
      callDuration: '4:32',
      callOutcome: 'Payment Promised',
      vulnerabilityDetected: true,
      vulnerabilityType: 'Financial Hardship',
      notes: 'Customer lost job recently, agreed to reduced payment plan.'
    },
    {
      id: '2',
      callDate: '2023-03-26 10:20',
      customerName: 'Mary Johnson',
      phoneNumber: '(555) 234-5678',
      callDuration: '6:15',
      callOutcome: 'Successful Contact',
      vulnerabilityDetected: false,
      vulnerabilityType: null,
      notes: 'Customer will call back after checking finances.'
    },
    {
      id: '3',
      callDate: '2023-03-26 11:30',
      customerName: 'Robert Brown',
      phoneNumber: '(555) 345-6789',
      callDuration: '3:45',
      callOutcome: 'Payment Made',
      vulnerabilityDetected: false,
      vulnerabilityType: null,
      notes: 'Customer made full payment during call.'
    },
    {
      id: '4',
      callDate: '2023-03-26 13:05',
      customerName: 'Sarah Wilson',
      phoneNumber: '(555) 456-7890',
      callDuration: '5:20',
      callOutcome: 'No Payment',
      vulnerabilityDetected: true,
      vulnerabilityType: 'Health Issues',
      notes: 'Customer in hospital, requires follow-up in 2 weeks.'
    },
    {
      id: '5',
      callDate: '2023-03-26 14:15',
      customerName: 'Michael Davis',
      phoneNumber: '(555) 567-8901',
      callDuration: '2:50',
      callOutcome: 'Wrong Party',
      vulnerabilityDetected: false,
      vulnerabilityType: null,
      notes: 'Reached roommate, customer not available.'
    },
    {
      id: '6',
      callDate: '2023-03-26 15:30',
      customerName: 'Jennifer Garcia',
      phoneNumber: '(555) 678-9012',
      callDuration: '7:10',
      callOutcome: 'Payment Arrangement',
      vulnerabilityDetected: true,
      vulnerabilityType: 'Job Loss',
      notes: 'Customer was laid off, set up reduced payment plan.'
    },
    {
      id: '7',
      callDate: '2023-03-26 16:45',
      customerName: 'David Martinez',
      phoneNumber: '(555) 789-0123',
      callDuration: '5:05',
      callOutcome: 'Successful Contact',
      vulnerabilityDetected: true,
      vulnerabilityType: 'Sick/Disability',
      notes: 'Customer on disability leave, requested hardship assistance.'
    },
    {
      id: '8',
      callDate: '2023-03-26 17:20',
      customerName: 'Lisa Rodriguez',
      phoneNumber: '(555) 890-1234',
      callDuration: '3:30',
      callOutcome: 'Payment Promised',
      vulnerabilityDetected: false,
      vulnerabilityType: null,
      notes: 'Customer will make payment on Friday.'
    }
  ];
  
  export const getVulnerabilityTypes = () => [
    { label: 'Financial Hardship', value: 'Financial Hardship' },
    { label: 'Health Issues', value: 'Health Issues' },
    { label: 'Job Loss', value: 'Job Loss' },
    { label: 'Sick/Disability', value: 'Sick/Disability' },
    { label: 'Other Issues', value: 'Other Issues' }
  ];
  
  export const getMetricCategories = () => [
    { label: 'Contact', value: 'contact' },
    { label: 'Vulnerability', value: 'vulnerability' },
    { label: 'Outcome', value: 'outcome' },
    { label: 'Debt', value: 'debt' }
  ];
  
  export const getVariables = () => [
    { label: 'Right Party Contacts', value: 'rpc' },
    { label: 'Total Calls', value: 'calls' },
    { label: 'Payments', value: 'payments' },
    { label: 'Success Rate', value: 'success' }
  ];
  
  export const defaultCallDataState: CallDataState = {
    period: 'weekly',
    team: null,
    startDate: null,
    endDate: null,
    selectedMetrics: [],
    selectedVariables: [],
    selectedVulnerabilityType: null
  };