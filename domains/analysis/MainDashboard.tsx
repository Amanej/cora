import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Header } from '@/components/dashboard/Header';
import { MetricCard } from '@/domains/analysis/components/dashboard/MetricCard';
import { CallContactChart } from '@/domains/analysis/components/dashboard/CallContactChart';
import { CallTrendChart } from '@/domains/analysis/components/dashboard/CallTrendChart';
import { CallDistributionChart } from '@/domains/analysis/components/dashboard/CallDistributionChart';
import { VulnerabilityCard } from '@/domains/analysis/components/dashboard/VulnerabilityCard';
import { DropoutCard } from '@/domains/analysis/components/dashboard/DropoutCard';
import { CallLogs } from '@/domains/analysis/components/dashboard/CallLogs';
import { TeamFilter } from '@/domains/analysis/components/dashboard/TeamFilter';
import { FilterPanel } from '@/domains/analysis/components/dashboard/FilterPanel';
import { 
  getCallMetrics, 
  getVulnerabilityData,
  getDropoutData,
  getCallContactData,
  getCallTrendData,
  getCallTimeDistribution,
  getCallLogs,
  CallDataState,
  defaultCallDataState
} from '@/domains/analysis/services/callData';

const MainAnalysisDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dataState, setDataState] = useState<CallDataState>(defaultCallDataState);
  // const [selectedTeam, setSelectedTeam] = useState('all');

  const metrics = getCallMetrics();
  const vulnerabilityData = getVulnerabilityData();
  const dropoutData = getDropoutData();
  const contactData = getCallContactData();
  const trendData = getCallTrendData();
  const timeDistributionData = getCallTimeDistribution();
  const callLogs = getCallLogs();

  const contactMetrics = metrics.filter(metric => metric.category === 'contact');
  const outcomeMetrics = metrics.filter(metric => metric.category === 'outcome');
  const vulnerabilityMetrics = metrics.filter(metric => metric.category === 'vulnerability');
  const debtMetrics = metrics.filter(metric => metric.category === 'debt');

  const handlePeriodChange = (period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly') => {
    setDataState({
      ...dataState,
      period
    });
  };

  const handleDateRangeChange = (start: Date | null, end: Date | null) => {
    setDataState({
      ...dataState,
      startDate: start,
      endDate: end
    });
  };

  const handleSetMetrics = (selectedMetrics: string[]) => {
    setDataState({
      ...dataState,
      selectedMetrics
    });
  };

  const handleSetVariables = (selectedVariables: string[]) => {
    setDataState({
      ...dataState,
      selectedVariables
    });
  };

  const handleSetVulnerabilityType = (selectedVulnerabilityType: string | null) => {
    setDataState({
      ...dataState,
      selectedVulnerabilityType
    });
  };

  const filteredMetrics = metrics.filter(metric => {
    if (dataState.selectedMetrics.length === 0) return true;
    return dataState.selectedMetrics.includes(metric.category);
  });

  return (
    <div className="flex flex-col bg-background animate-fade-in">
        {/*
                    
            <Header 
                period={dataState.period}
                setPeriod={handlePeriodChange}
                startDate={dataState.startDate}
                endDate={dataState.endDate}
                setDateRange={handleDateRangeChange}
            />
        */}

      <div className="flex-1 p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex flex-col sm:flex-row justify-between mb-6">
                <TabsList className="bg-white">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="contact">Contact Success</TabsTrigger>
                  <TabsTrigger value="outcomes">Call Outcomes</TabsTrigger>
                  <TabsTrigger value="vulnerability">Vulnerability</TabsTrigger>
                  <TabsTrigger value="debt">Debt</TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                  <FilterPanel
                    selectedMetrics={dataState.selectedMetrics}
                    setSelectedMetrics={handleSetMetrics}
                    selectedVariables={dataState.selectedVariables}
                    setSelectedVariables={handleSetVariables}
                    selectedVulnerabilityType={dataState.selectedVulnerabilityType}
                    setSelectedVulnerabilityType={handleSetVulnerabilityType}
                  />
                  {/*                   
                    <TeamFilter 
                        selectedTeam={selectedTeam} 
                        setSelectedTeam={setSelectedTeam} 
                    />
                  */}
                </div>
              </div>
            
              <TabsContent value="overview" className="m-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredMetrics.slice(0, 8).map(metric => (
                    <MetricCard key={metric.id} metric={metric} />
                  ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <CallTrendChart data={trendData} variables={dataState.selectedVariables} />
                  <CallContactChart data={contactData} />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <CallDistributionChart 
                    data={timeDistributionData} 
                    variables={dataState.selectedVariables} 
                    vulnerabilityType={dataState.selectedVulnerabilityType}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <VulnerabilityCard 
                      data={vulnerabilityData} 
                      selectedType={dataState.selectedVulnerabilityType}
                    />
                    <DropoutCard data={dropoutData} />
                  </div>
                </div>
                
                <div className="mt-6">
                  <CallLogs 
                    data={callLogs} 
                    vulnerabilityType={dataState.selectedVulnerabilityType} 
                  />
                </div>
              </TabsContent>

              <TabsContent value="contact" className="m-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {contactMetrics.filter(metric => {
                    if (dataState.selectedMetrics.length === 0) return true;
                    return dataState.selectedMetrics.includes(metric.category);
                  }).map(metric => (
                    <MetricCard key={metric.id} metric={metric} />
                  ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <CallContactChart data={contactData} />
                  <CallDistributionChart 
                    data={timeDistributionData} 
                    variables={dataState.selectedVariables}
                    vulnerabilityType={dataState.selectedVulnerabilityType}
                  />
                </div>
                
                <div className="mt-6">
                  <CallLogs 
                    data={callLogs} 
                    vulnerabilityType={dataState.selectedVulnerabilityType} 
                  />
                </div>
              </TabsContent>

              <TabsContent value="outcomes" className="m-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {outcomeMetrics.filter(metric => {
                    if (dataState.selectedMetrics.length === 0) return true;
                    return dataState.selectedMetrics.includes(metric.category);
                  }).map(metric => (
                    <MetricCard key={metric.id} metric={metric} />
                  ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <CallTrendChart data={trendData} variables={dataState.selectedVariables} />
                  <DropoutCard data={dropoutData} />
                </div>
                
                <div className="mt-6">
                  <CallLogs 
                    data={callLogs} 
                    vulnerabilityType={dataState.selectedVulnerabilityType} 
                  />
                </div>
              </TabsContent>

              <TabsContent value="vulnerability" className="m-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vulnerabilityMetrics.filter(metric => {
                    if (dataState.selectedMetrics.length === 0) return true;
                    return dataState.selectedMetrics.includes(metric.category);
                  }).map(metric => (
                    <MetricCard key={metric.id} metric={metric} />
                  ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <VulnerabilityCard 
                    data={vulnerabilityData} 
                    selectedType={dataState.selectedVulnerabilityType}
                  />
                  <DropoutCard data={dropoutData} />
                </div>
                
                <div className="mt-6">
                  <CallLogs 
                    data={callLogs} 
                    vulnerabilityType={dataState.selectedVulnerabilityType} 
                  />
                </div>
              </TabsContent>

              <TabsContent value="debt" className="m-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {debtMetrics.filter(metric => {
                    if (dataState.selectedMetrics.length === 0) return true;
                    return dataState.selectedMetrics.includes(metric.category);
                  }).map(metric => (
                    <MetricCard key={metric.id} metric={metric} />
                  ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <CallTrendChart data={trendData} variables={dataState.selectedVariables} />
                  <CallDistributionChart 
                    data={timeDistributionData} 
                    variables={dataState.selectedVariables}
                    vulnerabilityType={dataState.selectedVulnerabilityType}
                  />
                </div>
                
                <div className="mt-6">
                  <CallLogs 
                    data={callLogs} 
                    vulnerabilityType={dataState.selectedVulnerabilityType} 
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MainAnalysisDashboard;