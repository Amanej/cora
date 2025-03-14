import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ROUTES } from '@/lib/routing'

type AgentHeaderProps = {
    isEditing: boolean
    title: string
}

const AgentHeader = ({ isEditing, title }: AgentHeaderProps) => {
    return (
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Link href={ROUTES.MANAGE_AGENTS}>
              <Button className="text-black" variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <p className="text-sm font-light text-black">Agents &gt; {isEditing ? title : "Create agent"}</p>
          </div>
        </div>
    )
}

export default AgentHeader;