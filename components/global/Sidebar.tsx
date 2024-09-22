import { ROUTES } from "@/lib/routing";
import Link from "next/link"

export enum SidebarPage {
    Manage = "manage",
    Logg = "logg",
    Innstillinger = "innstillinger",
}

interface SideBarProps {
    currentPage: SidebarPage;
}

const SideBar: React.FC<SideBarProps> = ({ currentPage }) => {

    return (
        <aside className="w-64 bg-white p-6 shadow-md">
            <nav className="space-y-2">
                <Link href={ROUTES.MANAGE_AGENTS} className={`flex items-center py-2 px-4 text-black ${currentPage === SidebarPage.Manage ? 'bg-gray-200' : 'hover:bg-gray-100'} rounded font-medium`}>
                    Agenter
                </Link>
                <Link href={ROUTES.LOGG} className={`flex items-center py-2 px-4 text-black ${currentPage === SidebarPage.Logg ? 'bg-gray-200' : 'hover:bg-gray-100'} rounded`}>
                    Logger
                </Link>
                <Link href="#" className={`flex items-center py-2 px-4 text-black ${currentPage === SidebarPage.Innstillinger ? 'bg-gray-200' : 'hover:bg-gray-100'} rounded`}>
                    Innstillinger
                </Link>
            </nav>
        </aside>
    )
}

export default SideBar