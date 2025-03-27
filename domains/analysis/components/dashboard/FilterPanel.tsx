
import React from 'react';
import { Check, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getMetricCategories, getVariables, getVulnerabilityTypes } from '@/domains/analysis/services/callData';

interface FilterPanelProps {
  selectedMetrics: string[];
  setSelectedMetrics: (metrics: string[]) => void;
  selectedVariables: string[];
  setSelectedVariables: (variables: string[]) => void;
  selectedVulnerabilityType: string | null;
  setSelectedVulnerabilityType: (type: string | null) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedMetrics,
  setSelectedMetrics,
  selectedVariables,
  setSelectedVariables,
  selectedVulnerabilityType,
  setSelectedVulnerabilityType
}) => {
  const [open, setOpen] = React.useState(false);
  
  // Use try-catch to handle potential undefined values
  let metricCategories = [];
  let variables = [];
  let vulnerabilityTypes = [];
  
  try {
    metricCategories = getMetricCategories();
    variables = getVariables();
    vulnerabilityTypes = getVulnerabilityTypes();
  } catch (error) {
    console.error("Error loading filter data:", error);
    // Provide fallback data if functions are not available
    metricCategories = [
      { label: 'Contact', value: 'contact' },
      { label: 'Vulnerability', value: 'vulnerability' },
      { label: 'Outcome', value: 'outcome' },
      { label: 'Debt', value: 'debt' }
    ];
    variables = [
      { label: 'Right Party Contacts', value: 'rpc' },
      { label: 'Total Calls', value: 'calls' },
      { label: 'Payments', value: 'payments' },
      { label: 'Success Rate', value: 'success' }
    ];
    vulnerabilityTypes = [
      { label: 'Financial Hardship', value: 'Financial Hardship' },
      { label: 'Health Issues', value: 'Health Issues' },
      { label: 'Job Loss', value: 'Job Loss' },
      { label: 'Sick/Disability', value: 'Sick/Disability' },
      { label: 'Other Issues', value: 'Other Issues' }
    ];
  }

  const handleMetricToggle = (value: string) => {
    if (selectedMetrics.includes(value)) {
      setSelectedMetrics(selectedMetrics.filter(m => m !== value));
    } else {
      setSelectedMetrics([...selectedMetrics, value]);
    }
  };

  const handleVariableToggle = (value: string) => {
    if (selectedVariables.includes(value)) {
      setSelectedVariables(selectedVariables.filter(v => v !== value));
    } else {
      setSelectedVariables([...selectedVariables, value]);
    }
  };

  const handleVulnerabilityTypeToggle = (value: string) => {
    if (selectedVulnerabilityType === value) {
      setSelectedVulnerabilityType(null);
    } else {
      setSelectedVulnerabilityType(value);
    }
  };

  const clearAllFilters = () => {
    setSelectedMetrics([]);
    setSelectedVariables([]);
    setSelectedVulnerabilityType(null);
  };

  const totalFiltersApplied = selectedMetrics.length + selectedVariables.length + (selectedVulnerabilityType ? 1 : 0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex gap-1 h-9 pr-3 text-gray-800"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {totalFiltersApplied > 0 && (
            <Badge 
              variant="secondary" 
              className="ml-1 rounded-full px-1 py-0 text-xs h-5 min-w-5 flex items-center justify-center"
            >
              {totalFiltersApplied}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Filter by</h4>
            {totalFiltersApplied > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-xs" 
                onClick={clearAllFilters}
              >
                Clear all
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <div className="p-4">
          <h5 className="text-sm font-medium mb-3">Metric Categories</h5>
          <div className="flex flex-wrap gap-2 mb-4">
            {metricCategories.map(category => (
              <Button
                key={category.value}
                variant={selectedMetrics.includes(category.value) ? "default" : "outline"}
                size="sm"
                className="h-8"
                onClick={() => handleMetricToggle(category.value)}
              >
                {selectedMetrics.includes(category.value) && (
                  <Check className="mr-1 h-3 w-3" />
                )}
                {category.label}
              </Button>
            ))}
          </div>

          <Separator className="my-4" />

          <h5 className="text-sm font-medium mb-3">Variables</h5>
          <div className="flex flex-wrap gap-2 mb-4">
            {variables.map(variable => (
              <Button
                key={variable.value}
                variant={selectedVariables.includes(variable.value) ? "default" : "outline"}
                size="sm"
                className="h-8"
                onClick={() => handleVariableToggle(variable.value)}
              >
                {selectedVariables.includes(variable.value) && (
                  <Check className="mr-1 h-3 w-3" />
                )}
                {variable.label}
              </Button>
            ))}
          </div>

          <Separator className="my-4" />

          <h5 className="text-sm font-medium mb-3">Vulnerability Types</h5>
          <div className="flex flex-wrap gap-2">
            {vulnerabilityTypes.map(type => (
              <Button
                key={type.value}
                variant={selectedVulnerabilityType === type.value ? "default" : "outline"}
                size="sm"
                className="h-8"
                onClick={() => handleVulnerabilityTypeToggle(type.value)}
              >
                {selectedVulnerabilityType === type.value && (
                  <Check className="mr-1 h-3 w-3" />
                )}
                {type.label}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
