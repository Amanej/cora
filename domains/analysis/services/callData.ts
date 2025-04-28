import { Call, ENDING_REASON } from "@/domains/calls/types";
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

export const formatMetricValue = (total: number, percentage: number): number => {
  return Math.max(1, Math.floor(total * percentage));
};

const WHITELISTED_AGENTS = [
  '67e548d75e99abd5f8dd2a39',
  '67e5977ed5b60a6320206aed',
  '68095dd6f1642d3553c8f235',
  '68095e27f1642d3553c8f23f'
]

const getMetricCalculationConfig = (
  agentId: string | undefined,
  calls: Call[] | undefined,
  defaultPercentage: number
) => {
  const usePlaceholderValues = !agentId || !WHITELISTED_AGENTS.includes(agentId) || !calls;
  return {
    usePlaceholderValues,
    placeholderValue: (totalCalls: number) => formatMetricValue(totalCalls, defaultPercentage)
  };
}

const calculateRPC = (totalCalls: number, calls?: Call[], agentId?: string) => {
  console.log('calculateRPC', totalCalls, calls, agentId);
  const { usePlaceholderValues, placeholderValue } = getMetricCalculationConfig(agentId, calls, 0.2);
  if (usePlaceholderValues || !calls) {
    return placeholderValue(totalCalls);
  }

  console.log('calculating RPC');
  return calls.reduce((count, call) => {
    const wasRightParty = call.outcome?.contactAnalysis?.was_the_right_party;
    return count + (wasRightParty ? 1 : 0);
  }, 0);
}

const calculateWrongPartyContacts = (totalCalls: number, calls?: Call[], agentId?: string) => {
  if (!agentId || !WHITELISTED_AGENTS.includes(agentId)) {
    return formatMetricValue(totalCalls, 0.17);
  }

  if (!calls) {
    return formatMetricValue(totalCalls, 0.17);
  }

  return calls.reduce((count, call) => {
    const wasRightParty = call.outcome?.contactAnalysis?.was_the_right_party;
    const wasRightNumber = call.outcome?.contactAnalysis?.was_the_right_number;
    return count + (wasRightNumber && !wasRightParty ? 1 : 0);
  }, 0);
}

const calculateWrongNumberContacts = (totalCalls: number, calls?: Call[], agentId?: string) => {
  if (!agentId || !WHITELISTED_AGENTS.includes(agentId)) {
    return formatMetricValue(totalCalls, 0.085);
  }

  if (!calls) {
    return formatMetricValue(totalCalls, 0.085);
  }

  return calls.reduce((count, call) => {
    const wasRightNumber = call.outcome?.contactAnalysis?.was_the_right_number;
    return count + (wasRightNumber ? 1 : 0);
  }, 0);
}


const calculateVulnerableCustomers = (totalCalls: number, calls?: Call[], agentId?: string) => {
  if (!agentId || !WHITELISTED_AGENTS.includes(agentId)) {
    return formatMetricValue(totalCalls, 0.13);
  }

  if (!calls) {
    return formatMetricValue(totalCalls, 0.085);
  }

  return calls.reduce((count, call) => {
    const vulnerable = call.outcome?.vulnerability;
    return count + (vulnerable ? 1 : 0);
  }, 0);
}


const calculatePaymentsMade = (totalCalls: number, calls?: Call[], agentId?: string) => {
  if (!agentId || !WHITELISTED_AGENTS.includes(agentId)) {
    return formatMetricValue(totalCalls, 0.1);
  }

  if (!calls) {
    return formatMetricValue(totalCalls, 0.1);
  }

  return calls.reduce((count, call) => {
    const paymentMade = call.outcome?.collectionAnalysis?.paymentMade?.payment_received;
    return count + (paymentMade ? 1 : 0);
  }, 0);
}

const calculateHumanTransfer = (totalCalls: number, calls?: Call[], agentId?: string) => {
  console.log('calculateHumanTransfer', totalCalls, calls, agentId);
  if (!agentId || !WHITELISTED_AGENTS.includes(agentId)) {
    return formatMetricValue(totalCalls, 0.06);
  }

  if (!calls) {
    return formatMetricValue(totalCalls, 0.06);
  }

  console.log('calculating Human Transfer');
  return calls.reduce((count, call) => {
    const humanTransfer = call.outcome.endingReason === ENDING_REASON.ASSISTANT_FORWARDED_CALL;
    return count + (humanTransfer ? 1 : 0);
  }, 0);
}

const calculateIncomeExpenditure = (totalCalls: number, calls?: Call[], agentId?: string) => {
  if (!agentId || !WHITELISTED_AGENTS.includes(agentId)) {
    return formatMetricValue(totalCalls, 0.05);
  }

  if (!calls) {
    return formatMetricValue(totalCalls, 0.05);
  }

  return calls.reduce((count, call) => {
    const incomeExpenditure = call.outcome?.collectionAnalysis?.income_expenditure_analysis;
    return count + (incomeExpenditure ? 1 : 0);
  }, 0);
}

const calculateDebtRecovered = (totalCalls: number, calls?: Call[], agentId?: string) => {
  if (!agentId || !WHITELISTED_AGENTS.includes(agentId)) {
    return formatMetricValue(totalCalls, 0.03);
  }

  if (!calls) {
    return formatMetricValue(totalCalls, 0.03);
  }

  return calls.reduce((count, call) => {
    const paymentMadeDebt = call.outcome?.collectionAnalysis?.paymentMade?.total_debt_owed ?? 0;
    const paymentReceived = call.outcome?.collectionAnalysis?.paymentMade?.payment_received;
    
    const paymentPlanDebt = call.outcome?.collectionAnalysis?.paymentPlan?.total_debt_owed ?? 0;
    const paymentPlanAgreed = call.outcome?.collectionAnalysis?.paymentPlan?.plan_accepted;

    return count + (paymentReceived ? paymentMadeDebt : 0) + (paymentPlanAgreed ? paymentPlanDebt : 0);
  }, 0);
}

const calculateAvgSettlement = (totalCalls: number, calls?: Call[], agentId?: string) => {
  if (!agentId || !WHITELISTED_AGENTS.includes(agentId)) {
    return formatMetricValue(totalCalls, 0.02);
  }

  if (!calls) {
    return formatMetricValue(totalCalls, 0.02);
  }

  return calls.reduce((count, call) => {
    const paymentPlanAmount = call.outcome?.collectionAnalysis?.paymentPlan?.amount_agreed ?? 0;
    const paymentMadeAmount = call.outcome?.collectionAnalysis?.paymentMade?.total_debt_owed ?? 0;
    const paymentReceived = call.outcome?.collectionAnalysis?.paymentMade?.payment_received;
    return count + paymentPlanAmount + (paymentReceived ? paymentMadeAmount : 0);
  }, 0);
}

const calculateTotalDebt = (totalCalls: number, calls?: Call[], agentId?: string) => {
  const { usePlaceholderValues, placeholderValue } = getMetricCalculationConfig(agentId, calls, 0.14);
  if (usePlaceholderValues || !calls) {
    return placeholderValue(totalCalls);
  }

  return calls.reduce((total, call) => {
    // Get total debt owed from either payment made or payment plan
    const totalDebtOwed = Number(call.outcome?.collectionAnalysis?.paymentMade?.total_debt_owed ?? 
                         call.outcome?.collectionAnalysis?.paymentPlan?.total_debt_owed ?? 
                         0);
    const totalAmount = total + totalDebtOwed;
    return totalAmount;
  }, 0);
}

export const getCallMetrics = (calls?: Call[]): CallMetric[] => {
  const totalCalls = calls?.length || 1254;

  const agentId = calls?.find(call => call.agentId)?.agentId;

  const rpc = calculateRPC(totalCalls,calls, agentId);

  const wrongParty = calculateWrongPartyContacts(totalCalls, calls, agentId);

  const wrongNumber = calculateWrongNumberContacts(totalCalls, calls, agentId);

  const vulnerableCustomers = calculateVulnerableCustomers(totalCalls, calls, agentId);

  const paymentsMade = calculatePaymentsMade(totalCalls, calls, agentId);

  const humanTransfer = calculateHumanTransfer(totalCalls, calls, agentId);

  const incomeExpenditure = calculateIncomeExpenditure(totalCalls, calls, agentId);

  const debtRecovered = calculateDebtRecovered(totalCalls, calls, agentId);

  const avgSettlement = calculateAvgSettlement(totalCalls, calls, agentId);

  const outstandingTotal = calculateTotalDebt(totalCalls, calls, agentId);
  const totalDebt = Math.floor(outstandingTotal);

  return [
    {
      id: 'total-calls',
      label: 'Total Calls',
      value: totalCalls,
      change: 12.5,
      trend: 'up',
      category: 'contact'
    },
    {
      id: 'rpc',
      label: 'Right Party Contacts',
      value: rpc,
      change: 8.2,
      trend: 'up',
      category: 'contact'
    },
    {
      id: 'wrong-party',
      label: 'Wrong Party Contacts',
      value: wrongParty,
      change: -5.3,
      trend: 'down',
      category: 'contact'
    },
    {
      id: 'wrong-number',
      label: 'Wrong Numbers',
      value: wrongNumber,
      change: -7.1,
      trend: 'down',
      category: 'contact'
    },
    /*
    {
      id: 'vulnerable-customers',
      label: 'Vulnerable Customers',
      value: vulnerableCustomers,
      change: 2.4,
      trend: 'up',
      category: 'vulnerability'
    },*/
    {
      id: 'payments-made',
      label: 'Payments Made',
      value: paymentsMade,
      change: 15.7,
      trend: 'up',
      category: 'outcome'
    },
    /*
    {
      id: 'income-expenditure',
      label: 'Income & Expenditure Taken',
      value: incomeExpenditure,
      change: 4.3,
      trend: 'up',
      category: 'outcome'
    },
    */
    {
      id: 'human-transfer',
      label: 'Transfers to Human Agent',
      value: humanTransfer,
      change: -3.8,
      trend: 'down',
      category: 'outcome'
    },
    {
      id: 'total-debt',
      label: 'Total Debt Collected',
      value: totalDebt,
      change: 2.1,
      trend: 'up',
      category: 'debt'
    },
    {
      id: 'debt-recovered',
      label: 'Total Debt Recovered',
      value: debtRecovered,
      change: 12.8,
      trend: 'up',
      category: 'debt'
    },
    {
      id: 'avg-settlement',
      label: 'Average Settlement',
      value: avgSettlement,
      change: 3.5,
      trend: 'up',
      category: 'debt'
    }
  ];
}

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