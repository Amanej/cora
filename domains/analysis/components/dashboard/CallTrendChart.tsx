
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { CallTrendData } from '@/domains/analysis/services/callData';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

interface CallTrendChartProps {
  data: CallTrendData[];
  variables?: string[];
}

export const CallTrendChart: React.FC<CallTrendChartProps> = ({ data, variables = [] }) => {
  // Map variable names to data keys and colors
  const variableMap: Record<string, { key: keyof CallTrendData, color: string }> = {
    'calls': { key: 'calls', color: '#8B5CF6' }, // Vivid Purple
    'rpc': { key: 'rpc', color: '#0EA5E9' },     // Ocean Blue
    'payments': { key: 'payments', color: '#F97316' } // Bright Orange
  };

  // If no variables selected, show all
  const activeVariables = variables.length === 0 
    ? Object.keys(variableMap) 
    : variables.filter(v => Object.keys(variableMap).includes(v));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Weekly Call Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer 
          className="w-full aspect-[4/3] sm:aspect-[16/9]" 
          config={{
            calls: { color: '#8B5CF6' },
            rpc: { color: '#0EA5E9' },
            payments: { color: '#F97316' }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                tickLine={{ stroke: 'hsl(var(--border))' }} 
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                tickLine={{ stroke: 'hsl(var(--border))' }} 
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  borderColor: 'hsl(var(--border))' 
                }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => {
                  const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                  return <span style={{ color: 'hsl(var(--foreground))' }}>{capitalizedValue}</span>;
                }}
              />
              {activeVariables.map((variable) => (
                <Line 
                  key={variable}
                  type="monotone" 
                  dataKey={variableMap[variable].key} 
                  name={variable.charAt(0).toUpperCase() + variable.slice(1)}
                  stroke={variableMap[variable].color} 
                  strokeWidth={2} 
                  dot={{ fill: variableMap[variable].color, r: 4 }}
                  activeDot={{ fill: variableMap[variable].color, r: 6, strokeWidth: 2 }}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
