'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  LineChart, 
  Line, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Dummy data
const DUMMY_ANALYTICS = {
  totalCalls: 1000,
  contactSuccess: 750,
  wrongPartyContacts: 100,
  wrongNumbers: 50,
  rightPartyContacts: 600,
  vulnerableCustomers: {
    total: 200,
    financialHardship: 80,
    healthIssues: 70,
    otherIssues: 50
  },
  customerSituations: {
    jobLoss: 45,
    sickness: 65,
    incomeExpenditureTaken: 120,
    payments: 200,
    humanHandoffs: 80
  },
  dropOffPoints: [
    { name: 'Initial Contact', value: 1000 },
    { name: 'Authentication', value: 800 },
    { name: 'Assessment', value: 600 },
    { name: 'Resolution', value: 400 }
  ]
};

const callOutcomesData = [
  { name: 'Successful Contacts', value: DUMMY_ANALYTICS.contactSuccess },
  { name: 'Wrong Party', value: DUMMY_ANALYTICS.wrongPartyContacts },
  { name: 'Wrong Numbers', value: DUMMY_ANALYTICS.wrongNumbers },
  { name: 'Right Party Contacts', value: DUMMY_ANALYTICS.rightPartyContacts }
];

const vulnerableCustomersData = [
  { name: 'Financial Hardship', value: DUMMY_ANALYTICS.vulnerableCustomers.financialHardship },
  { name: 'Health Issues', value: DUMMY_ANALYTICS.vulnerableCustomers.healthIssues },
  { name: 'Other Issues', value: DUMMY_ANALYTICS.vulnerableCustomers.otherIssues }
];

const customerSituationsData = [
  { name: 'Job Loss', value: DUMMY_ANALYTICS.customerSituations.jobLoss },
  { name: 'Sickness', value: DUMMY_ANALYTICS.customerSituations.sickness },
  { name: 'I&E Taken', value: DUMMY_ANALYTICS.customerSituations.incomeExpenditureTaken },
  { name: 'Payments Made', value: DUMMY_ANALYTICS.customerSituations.payments },
  { name: 'Human Handoffs', value: DUMMY_ANALYTICS.customerSituations.humanHandoffs }
];

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function Component() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors" nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}


export default function AnalyticsDashboard() {
  const [selectedPeriod] = useState('30days'); // Dummy state

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Call Analytics Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{DUMMY_ANALYTICS.totalCalls}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {Math.round((DUMMY_ANALYTICS.contactSuccess / DUMMY_ANALYTICS.totalCalls) * 100)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vulnerable Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{DUMMY_ANALYTICS.vulnerableCustomers.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Human Handoffs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{DUMMY_ANALYTICS.customerSituations.humanHandoffs}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Card>
          <CardHeader>
            <CardTitle>Call Outcomes Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={callOutcomesData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Component />

        <Card>
          <CardHeader>
            <CardTitle>Vulnerable Customer Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vulnerableCustomersData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Situations</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={customerSituationsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call Drop-off Points</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={DUMMY_ANALYTICS.dropOffPoints}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}


