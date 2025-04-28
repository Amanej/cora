
import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CallMetric } from '@/domains/analysis/services/callData';

interface MetricCardProps {
  metric: CallMetric;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const { label, value, change, trend } = metric;
  
  // Format the value differently for different metrics
  const formattedValue = metric.id === 'avg-settlement' 
    ? `${value}%` 
    : metric.id.includes('debt') && !metric.id.includes('avg') 
      ? `$${value.toLocaleString()}` 
      : value.toLocaleString();
  
  return (
    <Card className="overflow-hidden h-full">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold tracking-tight">{formattedValue}</span>
            {/*
            <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full
              ${trend === 'up' 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                : trend === 'down' 
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}`}>
              {trend === 'up' ? (
                <ArrowUpIcon className="h-3 w-3 mr-1" />
              ) : trend === 'down' ? (
                <ArrowDownIcon className="h-3 w-3 mr-1" />
              ) : null}
              {Math.abs(change).toFixed(1)}%
            </div>
            */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
