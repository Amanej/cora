import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from '@/components/ui/separator';

interface LocalizationProps {
  timezone?: string;
  setTimezone: (timezone: string) => void;
  currency?: string; 
  setCurrency: (currency: string) => void;
}

export default function Localization({ timezone, setTimezone, currency, setCurrency }: LocalizationProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="timezone">Timezone</Label>
        <Select
          value={timezone || "UTC"}
          onValueChange={(value) => setTimezone(value)}
        >
          <SelectTrigger id="timezone">
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
        <Label htmlFor="currency">Currency</Label>
        <Select
          value={currency || "USD"} 
          onValueChange={(value) => setCurrency(value)}
        >
          <SelectTrigger id="currency">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">US Dollar (USD)</SelectItem>
            <SelectItem value="EUR">Euro (EUR)</SelectItem>
            <SelectItem value="GBP">British Pound (GBP)</SelectItem>
            <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
            <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
            <SelectItem value="AUD">Australian Dollar (AUD)</SelectItem>
            <SelectItem value="NOK">Norwegian Kroner (NOK)</SelectItem>
            <SelectItem value="DKK">Danish Kroner (DKK)</SelectItem>
            <SelectItem value="SEK">Swedish Kronor (SEK)</SelectItem>
            <SelectItem value="SAR">Saudi Riyal (SAR)</SelectItem>
            <SelectItem value="AED">UAE Dirham (AED)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  )
}
