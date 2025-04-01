
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropoutData } from '@/domains/analysis/services/callData';

interface DropoutCardProps {
  data: DropoutData[];
}

// Consistent color palette
const COLORS = [
  'bg-[hsl(230,85%,60%)]',   // chart-1 - blue
  'bg-[hsl(200,85%,60%)]',   // chart-2 - light blue
  'bg-[hsl(170,75%,45%)]',   // chart-3 - green
  'bg-[hsl(140,65%,45%)]',   // chart-4 - light green
  'bg-[hsl(350,70%,55%)]',   // chart-5 - red
  'bg-[hsl(325,65%,50%)]'    // chart-6 - pink
];

export const DropoutCard: React.FC<DropoutCardProps> = ({ data }) => {
  const total = data.reduce((acc, item) => acc + item.count, 0);
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Call Dropout Stages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pt-2">
          {data.map((item, index) => {
            const percentage = (item.count / total) * 100;
            const colorClass = COLORS[index % COLORS.length];
            
            return (
              <div key={item.stage} className="mb-5">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{item.stage}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.count} calls
                  </span>
                </div>
                <div className="w-full h-8 bg-muted rounded-md overflow-hidden">
                  <div 
                    className={`h-full ${colorClass} transition-all duration-500 ease-in-out`} 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
