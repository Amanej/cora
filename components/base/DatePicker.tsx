"use client"

import * as React from "react"
import { format, setDate } from "date-fns"
import { CalendarIcon, CrossIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {     
  date?: Date;
  onChange: (date: Date | undefined) => void;
}

export function DatePicker({ date, onChange }: DatePickerProps) {
  const [calendarOpen, setCalendarOpen] = React.useState(false);

  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          id="date-picker"
          className={cn(
            "w-[240px] justify-start text-left font-normal bg-white",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="text-gray-600" />
          {date ? <span className="text-gray-600 flex items-center ml-2">{format(date, "PPP")}
            <XIcon className="text-gray-400 text-xs ml-4 cursor-pointer" onClick={() => onChange(undefined)} />
          </span> : <span className="text-gray-600 ml-2">Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            onChange(date);
            setCalendarOpen(false);
          }}
          className="bg-white text-gray-800"
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
