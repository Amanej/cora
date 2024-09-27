import { Label } from "@/components/ui/label"
import { Trash } from "lucide-react"

const AgentActions = () => {
    return (
        <div className="space-y-2">
            <Label>Handlinger</Label>
            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <div>
                        <span>isMyCaseActive</span><span className="text-gray-400 ml-2">Henter om kunden har aktiv sak</span>
                    </div>
                    <div className="flex">
                        <Trash className="h-4 w-4 text-gray-400" />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <span>getTotalDebt</span><span className="text-gray-400 ml-2">Henter kundens totale gjeld på tvers av saker</span>
                    </div>
                    <div className="flex">
                        <Trash className="h-4 w-4 text-gray-400" />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <span>howMuchDoIOwe</span><span className="text-gray-400 ml-2">Henter hvor mye kunden skylder til banken</span>
                    </div>
                    <div className="flex">
                        <Trash className="h-4 w-4 text-gray-400" />
                        {/*<PenSquare className="h-4 w-4 text-gray-400 ml-2" />*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgentActions;