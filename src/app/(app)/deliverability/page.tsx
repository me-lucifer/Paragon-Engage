

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MailCheck, ShieldCheck, AlertTriangle, Inbox } from 'lucide-react';
import ReportsChart from '@/components/reports-chart';

const deliverabilityStats = [
  { title: 'Inbox Placement Rate', value: '98.2%', icon: <Inbox className="h-6 w-6 text-primary" />, progress: 98.2 },
  { title: 'Spam Placement Rate', value: '1.1%', icon: <AlertTriangle className="h-6 w-6 text-yellow-500" />, progress: 1.1 },
  { title: 'Block/Bounce Rate', value: '0.7%', icon: <AlertTriangle className="h-6 w-6 text-red-500" />, progress: 0.7 },
  { title: 'Authentication (SPF, DKIM, DMARC)', value: 'Passing', icon: <ShieldCheck className="h-6 w-6 text-green-500" />, status: 'Passing' },
];

export default function DeliverabilityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Deliverability
        </h1>
        <p className="text-muted-foreground">
          Monitor and improve your email deliverability.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {deliverabilityStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              {stat.icon}
              <CardTitle className="text-base font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {stat.progress !== undefined ? (
                <>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <Progress value={stat.progress} className="mt-2 h-2" />
                </>
              ) : (
                <Badge className={stat.status === 'Passing' ? 'bg-green-100 text-green-800' : ''}>{stat.status}</Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Inbox Placement by Provider</CardTitle>
            <CardDescription>Performance across major email providers.</CardDescription>
        </CardHeader>
        <CardContent>
            <ReportsChart chartType="bar" />
        </CardContent>
      </Card>
    </div>
  );
}
