
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CallContactData } from '@/domains/analysis/services/callData';

interface CallContactChartProps {
  data: CallContactData[];
}

// Consistent color palette
const COLORS = [
  'hsl(230, 85%, 60%)', // chart-1 - blue
  'hsl(350, 70%, 55%)', // chart-5 - red
  'hsl(170, 75%, 45%)', // chart-3 - green
  'hsl(38, 92%, 50%)',  // warning - amber
  'hsl(325, 65%, 50%)'  // chart-6 - pink
];

export const CallContactChart: React.FC<CallContactChartProps> = ({ data }) => {
  // Ensure we have color mapping for each data point
  const chartData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length]
  }));

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Call Contact Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer 
            config={{
              "Right Party": { theme: { light: COLORS[0], dark: COLORS[0] } },
              "Wrong Party": { theme: { light: COLORS[1], dark: COLORS[1] } },
              "Wrong Number": { theme: { light: COLORS[2], dark: COLORS[2] } },
              "No Answer": { theme: { light: COLORS[3], dark: COLORS[3] } },
              "Voicemail": { theme: { light: COLORS[4], dark: COLORS[4] } }
            }}
          >
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${entry.name}`} 
                    fill={entry.fill} 
                  />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
