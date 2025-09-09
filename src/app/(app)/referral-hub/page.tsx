
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Copy, PlusCircle } from 'lucide-react';
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
  revenue: '$1,250.00',
};

const recentReferrals = [
  { name: 'Innovate Corp', date: '2024-07-20', status: 'Subscribed' },
  { name: 'Data Solutions LLC', date: '2024-07-18', status: 'Trial' },
  { name: 'Synergy Group', date: '2024-07-15', status: 'Contacted' },
];

const initialReferralLink = 'https://paragon.engage/r/abhandari';

export default function ReferralHubPage() {
  const [referralLink, setReferralLink] = useState(initialReferralLink);
  const [showPreview, setShowPreview] = useState(true);

  const handleCreateCampaign = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const utmSource = formData.get('utm-source') as string;
    const newLink = `${initialReferralLink}?utm_source=${utmSource || 'custom'}`;
    setReferralLink(newLink);
    setShowPreview(true);
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Referral Hub
          </h1>
          <p className="text-muted-foreground">
            Share Paragon Engage and earn rewards.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Referral Campaign
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleCreateCampaign}>
                <DialogHeader>
                <DialogTitle>Create Referral Campaign</DialogTitle>
                <DialogDescription>
                    Configure a new referral link with custom tracking.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="landing-title">Landing Title</Label>
                        <Input id="landing-title" placeholder="e.g., Exclusive Offer for Friends" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="utm-source">UTM Source</Label>
                        <Input id="utm-source" name="utm-source" placeholder="e.g., summer-promo" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry (Optional)</Label>
                        <Input id="expiry" type="date" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                     <DialogClose asChild>
                        <Button type="submit">Save & Generate Link</Button>
                     </DialogClose>
                </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {showPreview && (
        <Card>
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" value={referralLink} readOnly />
              <Button>
                <Copy className="mr-2 h-4 w-4" /> Copy Link
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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
            <p className="text-3xl font-bold text-primary">
              {referralStats.revenue}
            </p>
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
                    <Badge
                      variant={
                        referral.status === 'Subscribed'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {referral.status}
                    </Badge>
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
