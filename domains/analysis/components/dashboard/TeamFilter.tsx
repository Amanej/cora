
import React from 'react';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const teams = [
  { label: "All Teams", value: "all" },
  { label: "Team Alpha", value: "alpha" },
  { label: "Team Beta", value: "beta" },
  { label: "Team Gamma", value: "gamma" },
  { label: "Team Delta", value: "delta" },
];

interface TeamFilterProps {
  selectedTeam: string;
  setSelectedTeam: (value: string) => void;
}

export const TeamFilter: React.FC<TeamFilterProps> = ({ selectedTeam, setSelectedTeam }) => {
  const [open, setOpen] = React.useState(false);
  
  const selectedTeamLabel = React.useMemo(() => {
    const team = teams.find(t => t.value === selectedTeam);
    return team ? team.label : "All Teams";
  }, [selectedTeam]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {selectedTeamLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search team..." />
          <CommandEmpty>No team found.</CommandEmpty>
          <CommandGroup>
            {teams.map((team) => (
              <CommandItem
                key={team.value}
                value={team.value}
                onSelect={(currentValue) => {
                  setSelectedTeam(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedTeam === team.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {team.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
