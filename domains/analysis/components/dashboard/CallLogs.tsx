
import React from 'react';
import { Shield, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CallLog } from '@/domains/analysis/services/callData';

interface CallLogsProps {
  data: CallLog[];
  vulnerabilityType: string | null;
}

// Consistent color mapping for vulnerability types
const VULNERABILITY_COLORS: Record<string, string> = {
  "Financial Hardship": "bg-destructive text-destructive-foreground",
  "Health Issues": "bg-blue-500 text-white",
  "Job Loss": "bg-amber-500 text-white",
  "Sick/Disability": "bg-emerald-600 text-white",
  "Other Issues": "bg-pink-600 text-white"
};

export const CallLogs: React.FC<CallLogsProps> = ({ data, vulnerabilityType }) => {
  // Filter data if vulnerability type is selected
  const filteredData = vulnerabilityType 
    ? data.filter(log => log.vulnerabilityType === vulnerabilityType)
    : data;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          Call Logs
          {vulnerabilityType && (
            <Badge variant="outline" className="ml-2">
              Filtered by: {vulnerabilityType}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Outcome</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      {log.vulnerabilityDetected ? (
                        <div className="tooltip" data-tooltip={log.vulnerabilityType}>
                          <ShieldAlert 
                            className="h-5 w-5 text-destructive" 
                            aria-label={`Vulnerability detected: ${log.vulnerabilityType}`}
                          />
                        </div>
                      ) : (
                        <Shield className="h-5 w-5 text-muted-foreground" aria-label="No vulnerability detected" />
                      )}
                    </TableCell>
                    <TableCell>{log.callDate}</TableCell>
                    <TableCell>{log.customerName}</TableCell>
                    <TableCell>{log.phoneNumber}</TableCell>
                    <TableCell>{log.callDuration}</TableCell>
                    <TableCell>
                      {log.vulnerabilityDetected && log.vulnerabilityType ? (
                        <div className="flex items-center gap-2">
                          <span>{log.callOutcome}</span>
                          <Badge className={VULNERABILITY_COLORS[log.vulnerabilityType] || "bg-gray-500"}>
                            {log.vulnerabilityType}
                          </Badge>
                        </div>
                      ) : (
                        log.callOutcome
                      )}
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate">{log.notes}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No call logs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
