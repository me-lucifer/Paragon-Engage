

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const logData = [
  { user: 'A. Bhandari', action: 'Updated Permissions', details: 'Admin updated Operator role for Campaign Studio', timestamp: '2024-07-29 11:00:00', ip: '192.168.1.1' },
  { user: 'A. Bhandari', action: 'Created Campaign', details: '"Q2 Outreach"', timestamp: '2024-07-29 10:30:15', ip: '192.168.1.1' },
  { user: 'System', action: 'Suppression Added', details: 'Unsubscribed: emily.white@summittax.ca', timestamp: '2024-07-29 10:15:00', ip: 'N/A' },
  { user: 'System', action: 'Enrichment Run', details: '500 new contacts', timestamp: '2024-07-29 10:00:00', ip: 'N/A' },
  { user: 'jane.doe@paragon.com', action: 'Updated Segment', details: '"High-Growth Tech"', timestamp: '2024-07-28 15:45:02', ip: '203.0.113.25' },
  { user: 'A. Bhandari', action: 'Suppression Added', details: 'DNC List Upload: competitor.com', timestamp: '2024-07-28 12:00:00', ip: '192.168.1.1' },
  { user: 'A. Bhandari', action: 'Login', details: 'Successful login', timestamp: '2024-07-28 09:01:50', ip: '192.168.1.1' },
];

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Audit Log
        </h1>
        <p className="text-muted-foreground">
          Track all activities and changes within your workspace.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
             <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search logs..." className="pl-10" />
            </div>
            <Button>Export Logs</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logData.map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{log.action}</Badge>
                  </TableCell>
                  <TableCell>{log.details}</TableCell>
                  <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
