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
import { ArrowUp, Briefcase, Target, Heart, MessageCircle, Calendar, Bot, CheckCircle, Mail } from 'lucide-react';
import DashboardChart from '@/components/dashboard-chart';

const kpiData = [
  { title: 'Mapped Companies', value: '12,450', trend: '+12.5%', icon: <Briefcase className="text-primary" /> },
  { title: 'Reachable Contacts', value: '8,340', trend: '+8.2%', icon: <Target className="text-primary" /> },
  { title: 'Active Campaigns', value: '27', trend: '+2', icon: <Mail className="text-primary" /> },
  { title: 'Warm Replies', value: '1,289', trend: '+15%', icon: <MessageCircle className="text-primary" /> },
  { title: 'Positive Intent', value: '342', trend: '+22%', icon: <Heart className="text-primary" /> },
  { title: 'Meetings Booked', value: '58', trend: '+5', icon: <Calendar className="text-primary" /> },
];

const activityData = [
    { event: 'Enrichment Run', description: 'Enriched 500 new contacts', time: '2m ago', status: 'Completed' },
    { event: 'Campaign Send', description: 'Sent "Intro" campaign to 150 contacts', time: '10m ago', status: 'Sent' },
    { event: 'New Reply', description: 'from john.doe@acme.com', time: '12m ago', status: 'Positive' },
    { event: 'Campaign Send', description: 'Sent "Follow-up" to 75 contacts', time: '1h ago', status: 'Sent' },
    { event: 'New Reply', description: 'from jane.s@example.co', time: '2h ago', status: 'Neutral' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
        Dashboard
      </h1>
      
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpiData.map((kpi) => (
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
        ))}
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
                <DashboardChart chartType="bar" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Open vs. Reply Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <DashboardChart chartType="line" />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <DashboardChart chartType="funnel" />
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
                            className={item.status === 'Positive' ? 'bg-green-100 text-green-800' : ''}
                            >
                            {item.status}
                            </Badge>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
