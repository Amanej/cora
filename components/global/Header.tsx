import { PhoneCall } from "lucide-react"
import Link from 'next/link'


const Header = () => {
    return (
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <PhoneCall className="h-6 w-6 mr-2" />
          <span className="font-bold">Cora</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#use-cases">
            Use Cases
          </Link>
          <Link className="text-sm font-medium underline underline-offset-4" href="https://tally.so/r/31vx9Q" target="_blank">
            Request access
          </Link>
        </nav>
      </header>
    )
  }
  
  export default Header;