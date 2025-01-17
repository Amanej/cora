import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import clsx from 'clsx';
import { AgentRepeatCalls, AgentRepeatCallsHours, AgentRepeatCallsDays, AgentRepeatCallsMax, AgentRepeatCallsSchedule } from '../../types';

type AgentRepeatCallsFormProps = {
    schedule?: AgentRepeatCallsSchedule;
    setSchedule: (schedule: AgentRepeatCallsSchedule) => void;
    days: AgentRepeatCallsDays;
    setDays: (days: AgentRepeatCallsDays) => void;
    hours: AgentRepeatCallsHours;
    setHours: (hours: AgentRepeatCallsHours) => void;
    setMax: (max: AgentRepeatCallsMax) => void;
    max?: AgentRepeatCallsMax;
    setRepeatCallDelay: (delay: number | null) => void;
    delay?: number | null;
    enabled?: boolean;
    setEnabled: (enabled: boolean) => void;
}

const AgentRepeatCallsForm = ({ schedule, setSchedule, setMax, max, setRepeatCallDelay, delay, enabled, setEnabled, days, setDays, hours, setHours }: AgentRepeatCallsFormProps) => {
    /*
    const [cron, setCron] = useState<{
        delay: string;
        timezone: string;
        enabled: boolean;
    }>({
        delay: '',
        timezone: '',
        enabled: false,
    });

    const [days, setDays] = useState<AgentRepeatCallsDays>({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    });

    const [hours, setHours] = useState<AgentRepeatCallsHours>({
        from: null,
        to: null,
    });
    */

    /*
    console.log("enabled ", enabled)
    console.log("Max ", max)
    console.log("Days ", schedule?.days)
    console.log("Hours ", schedule?.hours)
    */
    return (
        <div className="grid grid-cols-2 gap-4">

            <div className={clsx("space-y-2", enabled ? "opacity-100" : "opacity-50")}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Hours delay</Label>
                        <div className="flex items-center">
                            <Input
                                value={delay || ''}
                                onChange={(e) => setRepeatCallDelay(Number(e.target.value) || null )}
                                placeholder="Hours delay between repeat calls"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Timezone</Label>
                        <Select
                            value={schedule?.timezone || ''}
                            onValueChange={(value) => setSchedule({ ...schedule, timezone: value, days: schedule?.days || { monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false }, hours: schedule?.hours || { from: null, to: null } })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="UTC">UTC (GMT +00:00)</SelectItem>
                                <SelectItem value="Pacific/Midway">Midway Island (GMT -11:00)</SelectItem>
                                <SelectItem value="Pacific/Honolulu">Hawaii (GMT -10:00)</SelectItem>
                                <SelectItem value="America/Anchorage">Alaska (GMT -09:00)</SelectItem>
                                <SelectItem value="America/Los_Angeles">Pacific Time (GMT -08:00)</SelectItem>
                                <SelectItem value="America/Phoenix">Mountain Time - Arizona (GMT -07:00)</SelectItem>
                                <SelectItem value="America/Denver">Mountain Time (GMT -07:00)</SelectItem>
                                <SelectItem value="America/Chicago">Central Time (GMT -06:00)</SelectItem>
                                <SelectItem value="America/New_York">Eastern Time (GMT -05:00)</SelectItem>
                                <SelectItem value="America/Caracas">Venezuela (GMT -04:00)</SelectItem>
                                <SelectItem value="America/Sao_Paulo">Brazil (GMT -03:00)</SelectItem>
                                <SelectItem value="Atlantic/South_Georgia">Mid-Atlantic (GMT -02:00)</SelectItem>
                                <SelectItem value="Atlantic/Azores">Azores (GMT -01:00)</SelectItem>
                                <SelectItem value="Europe/London">London (GMT +00:00)</SelectItem>
                                <SelectItem value="Europe/Paris">Central Europe (GMT +01:00)</SelectItem>
                                <SelectItem value="Europe/Istanbul">Eastern Europe (GMT +02:00)</SelectItem>
                                <SelectItem value="Asia/Baghdad">Baghdad (GMT +03:00)</SelectItem>
                                <SelectItem value="Asia/Dubai">UAE (GMT +04:00)</SelectItem>
                                <SelectItem value="Asia/Karachi">Pakistan (GMT +05:00)</SelectItem>
                                <SelectItem value="Asia/Dhaka">Bangladesh (GMT +06:00)</SelectItem>
                                <SelectItem value="Asia/Bangkok">Thailand (GMT +07:00)</SelectItem>
                                <SelectItem value="Asia/Singapore">Singapore (GMT +08:00)</SelectItem>
                                <SelectItem value="Asia/Tokyo">Japan (GMT +09:00)</SelectItem>
                                <SelectItem value="Australia/Sydney">Sydney (GMT +10:00)</SelectItem>
                                <SelectItem value="Pacific/Noumea">New Caledonia (GMT +11:00)</SelectItem>
                                <SelectItem value="Pacific/Auckland">New Zealand (GMT +12:00)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Opening hours</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                {/* <Label>From</Label> */}
                                <Select
                                    value={hours.from || ''}
                                    onValueChange={(value) => setHours({ from: value, to: schedule?.hours?.to || null })}
                                    defaultValue="09:00"
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select start time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 24 }, (_, i) => {
                                            const hour = i.toString().padStart(2, '0');
                                            return (
                                                <SelectItem key={hour} value={`${hour}:00`}>
                                                    {`${hour}:00`}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                {/* <Label>To</Label> */}
                                <Select
                                    value={hours.to || ''}
                                    onValueChange={(value) => setHours({ ...hours, to: value })}
                                    defaultValue="16:00"
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select end time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 24 }, (_, i) => {
                                            const hour = i.toString().padStart(2, '0');
                                            return (
                                                <SelectItem key={hour} value={`${hour}:00`}>
                                                    {`${hour}:00`}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={clsx("space-y-2", enabled ? "opacity-100" : "opacity-50")}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Per Calls per day</Label>
                        <Input
                            type="number"
                            value={max?.perDay || ''}
                            onChange={(e) => setMax({ ...max, perDay: Number(e.target.value) || null, allTime: max?.allTime || null })}
                            placeholder="Max calls per day"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>All Time</Label>
                        <Input
                            type="number"
                            value={max?.allTime || ''}
                            onChange={(e) => setMax({ ...max, allTime: Number(e.target.value) || null, perDay: max?.perDay || null })}
                            placeholder="Max calls of all time"
                        />
                    </div>
                </div>
            </div>

            <div className={clsx("space-y-2", enabled ? "opacity-100" : "opacity-50")}>
                <Label>Days of the week</Label>
                <div className="flex flex-wrap gap-4">
                    {Object.entries({ monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday' }).map(([key, label]) => (
                        <div key={key} className="flex items-center gap-2">
                            <Checkbox
                                id={key}
                                checked={days[key as keyof typeof days]}
                                onCheckedChange={(checked) => setDays({ ...days, [key]: !!checked })}
                            />
                            <Label htmlFor={key}>{label}</Label>
                        </div>
                    ))}
                </div>
            </div>

            <div></div>
            <div></div>

            <div className="flex items-center gap-2 ml-auto">
                <Label htmlFor="enabled">Enabled</Label>
                <Switch id="enabled" className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input [&>span]:bg-white" checked={enabled} onCheckedChange={(checked) => setEnabled(checked)} />
            </div>

        </div>
    );
};

export default AgentRepeatCallsForm;

