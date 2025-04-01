'use client'

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SelectNumberInfoProps {
  hasExistingAgent: boolean
  onOverwriteChange: (checked: boolean) => void
}

export default function SelectedNumberToolTip({ hasExistingAgent, onOverwriteChange }: SelectNumberInfoProps) {
  if (!hasExistingAgent) return null

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox id="overwrite" onCheckedChange={onOverwriteChange} />
        <Label htmlFor="overwrite">
          Overwrite existing agent assignment
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-1 cursor-help">ⓘ</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>This phone number is currently assigned to another agent. Check this box to reassign it.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
      </div>
    </div>
  )
}
