'use client';

import SideBar from '@/components/global/Sidebar';
import { SidebarPage } from '@/components/global/Sidebar';
import MainAnalysisDashboard from '@/domains/analysis/MainDashboard';

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-gray-100">
    {/* Sidebar */}
    <SideBar currentPage={SidebarPage.Analytics} />    
    <MainAnalysisDashboard />
    </div>
  );
}
