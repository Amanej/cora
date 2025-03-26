
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { CallTimeDistribution } from '@/domains/analysis/services/callData';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';

interface CallDistributionChartProps {
  data: CallTimeDistribution[];
  variables?: string[];
  vulnerabilityType?: string | null;
}

export const CallDistributionChart: React.FC<CallDistributionChartProps> = ({ 
  data, 
  variables = [],
  vulnerabilityType = null
}) => {
  // Map variable names to data keys and colors
  const variableMap: Record<string, { key: keyof CallTimeDistribution, color: string }> = {
    'calls': { key: 'calls', color: '#D946EF' }, // Magenta Pink
    'success': { key: 'success', color: '#33C3F0' } // Sky Blue
  };

  // If no variables selected, show all
  const activeVariables = variables.length === 0 
    ? Object.keys(variableMap) 
    : variables.filter(v => v === 'calls' || v === 'rpc').map(v => v === 'rpc' ? 'success' : v);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          Hourly Call Distribution
          {vulnerabilityType && (
            <Badge variant="outline" className="ml-1">
              {vulnerabilityType}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer 
          className="w-full aspect-[4/3] sm:aspect-[16/9]" 
          config={{
            calls: { color: '#D946EF' },
            success: { color: '#33C3F0' }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="hour" 
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
                  const labels = {
                    'calls': 'Total Calls',
                    'success': 'Successful Calls'
                  };
                  return <span style={{ color: 'hsl(var(--foreground))' }}>{labels[value as keyof typeof labels] || value}</span>;
                }}
              />
              {activeVariables.map((variable) => (
                <Bar 
                  key={variable}
                  dataKey={variableMap[variable].key} 
                  name={variable}
                  fill={variableMap[variable].color} 
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
