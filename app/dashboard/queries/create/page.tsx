import QueryBuilder from "@/domains/queries/pages/CreateQuery"
import SideBar, { SidebarPage } from "@/components/global/Sidebar"

export default function CreateQueryPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar currentPage={SidebarPage.Queries} />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-black">Create Query</h2>
        </div>

        <QueryBuilder />
      </main>
    </div>
  )
}

