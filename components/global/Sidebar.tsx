import { ROUTES } from "@/lib/routing";
import Link from "next/link"
import { useState } from "react";
import { ChevronLeft, ChevronRight, Users, Plus, FileText, Settings, BarChart } from "lucide-react";

export enum SidebarPage {
    Manage = "manage",
    CreateAgent = "create-agent",
    Logg = "logg",
    Innstillinger = "innstillinger",
    Analytics = "analytics",
}

interface SideBarProps {
    currentPage: SidebarPage;
}

const SideBar: React.FC<SideBarProps> = ({ currentPage }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white ${isCollapsed ? 'p-4' : 'p-6'} shadow-md transition-all duration-300 relative`}>
            <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-6 bg-white text-gray-800 rounded-full p-1 shadow-md hover:bg-gray-100"
            >
                {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            <nav className="space-y-2">
                <Link href={ROUTES.MANAGE_AGENTS} className={`flex items-center ${isCollapsed ? 'py-2 px-0' : 'py-2 px-4'} ${isCollapsed ? "justify-center rounded-s-full" : ""} text-black ${currentPage === SidebarPage.Manage ? 'bg-gray-200' : 'hover:bg-gray-100'} rounded font-medium`}>
                    <Users size={20} className={!isCollapsed ? "mr-3" : ""} />
                    {!isCollapsed && "Agents"}
                </Link>
                <Link href={ROUTES.CREATE_AGENT} className={`flex items-center ${isCollapsed ? 'py-2 px-0' : 'py-2 px-4'} ${isCollapsed ? "justify-center rounded-s-full" : ""} text-black ${currentPage === SidebarPage.CreateAgent ? 'bg-gray-200' : 'hover:bg-gray-100'} rounded font-medium`}>
                    <Plus size={20} className={!isCollapsed ? "mr-3" : ""} />
                    {!isCollapsed && "Create"}
                </Link>
                <Link href={ROUTES.LOGG} className={`flex items-center ${isCollapsed ? 'py-2 px-0' : 'py-2 px-4'} ${isCollapsed ? "justify-center rounded-s-full" : ""} text-black ${currentPage === SidebarPage.Logg ? 'bg-gray-200' : 'hover:bg-gray-100'} rounded`}>
                    <FileText size={20} className={!isCollapsed ? "mr-3" : ""} />   
                    {!isCollapsed && "Logs"}
                </Link>
                <Link href={ROUTES.SETTINGS} className={`flex items-center ${isCollapsed ? 'py-2 px-0' : 'py-2 px-4'} ${isCollapsed ? "justify-center rounded-s-full" : ""} text-black ${currentPage === SidebarPage.Innstillinger ? 'bg-gray-200' : 'hover:bg-gray-100'} rounded`}>
                    <Settings size={20} className={!isCollapsed ? "mr-3" : ""} />
                    {!isCollapsed && "Settings"}
                </Link>
                <Link href={ROUTES.ANALYTICS} className={`flex items-center ${isCollapsed ? 'py-2 px-0' : 'py-2 px-4'} ${isCollapsed ? "justify-center rounded-s-full" : ""} text-black ${currentPage === SidebarPage.Analytics ? 'bg-gray-200' : 'hover:bg-gray-100'} rounded`}>
                    <BarChart size={20} className={!isCollapsed ? "mr-3" : ""} />
                    {!isCollapsed && "Analytics"}
                </Link>
            </nav>
        </aside>
    )
}

export default SideBar