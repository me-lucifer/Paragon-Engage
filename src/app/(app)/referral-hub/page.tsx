

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const referralStats = {
    clicks: 152,
    signups: 38,
    revenue: '$1,250.00'
};

const recentReferrals = [
    { name: 'Innovate Corp', date: '2024-07-20', status: 'Subscribed' },
    { name: 'Data Solutions LLC', date: '2024-07-18', status: 'Trial' },
    { name: 'Synergy Group', date: '2024-07-15', status: 'Contacted' },
];

export default function ReferralHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Referral Hub
        </h1>
        <p className="text-muted-foreground">
          Share Paragon Engage and earn rewards.
        </p>
      </div>

       <Card>
            <CardHeader>
                <CardTitle>Your Referral Link</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="text" value="https://paragon.engage/r/abhandari" readOnly />
                    <Button type="submit">
                        <Copy className="mr-2 h-4 w-4" /> Copy Link
                    </Button>
                </div>
            </CardContent>
        </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
            <CardHeader>
                <CardTitle>Clicks</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{referralStats.clicks}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Signups</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{referralStats.signups}</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-primary">{referralStats.revenue}</p>
            </CardContent>
        </Card>
      </div>
      
       <Card>
            <CardHeader>
                <CardTitle>Recent Referrals</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentReferrals.map((referral) => (
                        <TableRow key={referral.name}>
                            <TableCell className="font-medium">{referral.name}</TableCell>
                            <TableCell>{referral.date}</TableCell>
                            <TableCell>
                                <Badge variant={referral.status === 'Subscribed' ? 'default' : 'secondary'}>{referral.status}</Badge>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

    </div>
  );
}
