
'use client';

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
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowUp, Briefcase, Target, Heart, MessageCircle, Calendar, Bot, CheckCircle, Mail, PlayCircle } from 'lucide-react';
import DashboardChart from '@/components/dashboard-chart';
import { DemoWalkthrough } from '@/components/demo-walkthrough';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const kpiData = [
  { title: 'Mapped Companies', value: '52,840', trend: '+12.5%', icon: <Briefcase className="text-primary" /> },
  { title: 'Reachable Contacts', value: '76,320', trend: '+8.2%', icon: <Target className="text-primary" /> },
  { title: 'Active Campaigns', value: '12', trend: '-3', icon: <Mail className="text-primary" /> },
  { title: 'Warm Replies (30d)', value: '1,146', trend: '-5%', icon: <MessageCircle className="text-primary" /> },
  { title: 'Positive Intent (30d)', value: '318', trend: '-8%', icon: <Heart className="text-primary" /> },
  { title: 'Meetings Booked (30d)', value: '94', trend: '+15%', icon: <Calendar className="text-primary" /> },
];

const activityData = [
    { event: 'Enrichment Run', description: 'Enriched 500 new contacts', time: '2m ago', status: 'Completed' },
    { event: 'Campaign Send', description: 'Sent "Intro" campaign to 150 contacts', time: '10m ago', status: 'Sent' },
    { event: 'New Reply', description: 'from john.doe@acme.com', time: '12m ago', status: 'Positive' },
    { event: 'Campaign Send', description: 'Sent "Follow-up" to 75 contacts', time: '1h ago', status: 'Sent' },
    { event: 'New Reply', description: 'from jane.s@example.co', time: '2h ago', status: 'Neutral' },
];

export default function DashboardPage() {
    const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }, []);

  return (
    <div className="space-y-6">
        <DemoWalkthrough open={isWalkthroughOpen} onOpenChange={setIsWalkthroughOpen} />
       <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Dashboard
            </h1>
            <Button variant="outline" onClick={() => setIsWalkthroughOpen(true)}>
                <PlayCircle className="mr-2 h-4 w-4" />
                Start Tour
            </Button>
       </div>
      
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-1/3 mb-1" />
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))
        ) : (
          kpiData.map((kpi) => (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                {kpi.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{kpi.value}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                  {kpi.trend}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Charts and Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Outreach</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? <Skeleton className="h-[200px] w-full" /> : <DashboardChart chartType="bar" />}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Open vs. Reply Rate</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? <Skeleton className="h-[200px] w-full" /> : <DashboardChart chartType="line" />}
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              {loading ? <Skeleton className="h-[250px] w-full max-w-lg" /> : <DashboardChart chartType="funnel" />}
            </CardContent>
          </Card>
        </div>

        {/* Autopilot and Activity */}
        <div className="space-y-6">
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bot /> Autopilot Status
                </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="font-medium">Autopilot</div>
                    <Switch defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground">
                    Last run: {new Date().toLocaleString()}
                </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>Today's Activity</CardTitle>
                </CardHeader>
                <CardContent>
                {loading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ) : (
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {activityData.map((item, index) => (
                        <TableRow key={index}>
                        <TableCell>
                            <div className="font-medium">{item.event}</div>
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                        </TableCell>
                        <TableCell>
                            <Badge
                            variant={
                                item.status === 'Completed' || item.status === 'Sent' ? 'secondary'
                                : item.status === 'Positive' ? 'default'
                                : 'outline'
                            }
                            className={item.status === 'Positive' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' : ''}
                            >
                            {item.status}
                            </Badge>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
