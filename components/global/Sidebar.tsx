import Link from "next/link"

const SideBar = () => {
  return (
    <aside className="w-64 bg-white p-6 shadow-md">
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-black">Cora</h1>
    </div>
    <nav className="space-y-2">
      <Link href="/manage" className="flex items-center py-2 px-4 text-black bg-gray-200 rounded font-medium">
        Agenter
      </Link>
      <Link href="/logg" className="flex items-center py-2 px-4 text-black hover:bg-gray-100 rounded">
        Logger
      </Link>
      <Link href="#" className="flex items-center py-2 px-4 text-black hover:bg-gray-100 rounded">
        Innstillinger
      </Link>
    </nav>
  </aside>
  )
}

export default SideBar