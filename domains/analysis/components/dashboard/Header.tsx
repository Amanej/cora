
import React from 'react';
import { BarChart3, Bell, Calendar, Filter, Search, Settings, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { DatePicker } from './DatePicker';

interface HeaderProps {
  period: string;
  setPeriod: (period: string) => void;
  startDate: Date | null;
  endDate: Date | null;
  setDateRange: (start: Date | null, end: Date | null) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  period, 
  setPeriod, 
  startDate, 
  endDate,
  setDateRange
}) => {
  return (
    <header className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b animate-fade-in">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold tracking-tight">Call Analytics Dashboard</h1>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search dashboard..." 
            className="pl-9 w-full"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="hidden md:flex gap-1">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium leading-none">Filter by Period</h4>
              <div className="flex flex-wrap gap-2">
                {['daily', 'weekly', 'monthly', 'quarterly', 'yearly'].map((p) => (
                  <Button 
                    key={p}
                    variant={period === p ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setPeriod(p)}
                    className="capitalize"
                  >
                    {p}
                  </Button>
                ))}
              </div>

              <h4 className="font-medium leading-none">Custom Date Range</h4>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Start Date:</span>
                  <DatePicker 
                    date={startDate} 
                    setDate={(date) => setDateRange(date, endDate)} 
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">End Date:</span>
                  <DatePicker 
                    date={endDate} 
                    setDate={(date) => setDateRange(startDate, date)} 
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-auto">
              {[1, 2, 3].map((i) => (
                <DropdownMenuItem key={i} className="cursor-pointer py-2">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">Performance alert</p>
                    <p className="text-xs text-muted-foreground">
                      {i === 1 
                        ? "Call success rate dropped below 30%" 
                        : i === 2 
                          ? "New vulnerable customer markers identified" 
                          : "Team reached 90% of monthly target"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{i * 2} hours ago</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                <UserCircle className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Team Settings</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
