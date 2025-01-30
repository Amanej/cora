'use client'

import SideBar, { SidebarPage } from "@/components/global/Sidebar"
import { Button } from "@/components/ui/button"
import { useAuth } from '@/domains/auth/state/AuthContext';
import AccountPage from "./AccountTemplate";

export default function CallLogs() {
  const { token, user } = useAuth();

  if (!user) {
    return <div className="flex h-screen bg-gray-100">
    {/* Sidebar */}
    <SideBar currentPage={SidebarPage.Innstillinger} />
    <main className="flex-1 p-8 overflow-auto">
        <div className="flex flex-col justify-between mb-6">

          {<p>Loading...</p>}
        </div>
      </main>
  </div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar currentPage={SidebarPage.Innstillinger} />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex flex-col justify-between mb-6">

          <AccountPage user={user} />
        </div>
      </main>
    </div>
  )
}