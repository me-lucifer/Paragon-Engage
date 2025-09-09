
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle, Plug, Rss, Briefcase, Globe, Mail, Bot, Inbox } from 'lucide-react';
import Image from 'next/image';

const dataSources = [
  { name: 'Apollo.io', icon: <Plug className="h-6 w-6 text-primary" />, status: 'Connected', lastSync: '2h ago', records: '1.2M' },
  { name: 'LinkedIn Sales Navigator', icon: <Briefcase className="h-6 w-6 text-blue-700" />, status: 'Not Connected', lastSync: 'N/A', records: 'N/A', placeholder: true },
  { name: 'Clearbit / Hunter', icon: <Plug className="h-6 w-6 text-primary" />, status: 'Connected', lastSync: '30m ago', records: '850K' },
  { name: 'Crunchbase / Tracxn', icon: <Plug className="h-6 w-6 text-primary" />, status: 'Not Connected', lastSync: 'N/A', records: 'N/A', placeholder: true },
  { name: 'Google News', icon: <Rss className="h-6 w-6 text-orange-500" />, status: 'Connected', lastSync: '15m ago', records: '5.2K' },
  { name: 'Company Websites', icon: <Globe className="h-6 w-6 text-primary" />, status: 'Active', lastSync: 'Continuous', records: '780K' },
  { name: 'Mailgun / Sendgrid', icon: <Mail className="h-6 w-6 text-red-500" />, status: 'Connected', lastSync: '1m ago', records: '2.1M' },
  { name: 'Instantly.ai', icon: <Bot className="h-6 w-6 text-purple-500" />, status: 'Connected', lastSync: '5m ago', records: '300K' },
  { name: 'Google Workspace / O365', icon: <Inbox className="h-6 w-6 text-blue-500" />, status: 'Connected', lastSync: 'Real-time', records: '1.5M' },
];

export default function DataSourcesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Data Sources
          </h1>
          <p className="text-muted-foreground">
            Connect and manage your data sources for enrichment and outreach.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Custom Source
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Custom Source</DialogTitle>
              <DialogDescription>
                Configure a new custom data source for ingestion.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" placeholder="e.g., Industry News API" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">
                  URL Pattern
                </Label>
                <Input id="url" placeholder="https://api.example.com/posts/*" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="parser" className="text-right">
                  Parser
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a parser" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="xml">XML</SelectItem>
                    <SelectItem value="html">HTML Crawler</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="schedule" className="text-right">
                  Schedule
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select refresh schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save Source</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dataSources.map((source) => (
          <Card key={source.name}>
            <CardHeader className="flex flex-row items-center gap-4">
              {source.icon}
              <CardTitle>{source.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant={source.status === 'Connected' || source.status === 'Active' ? 'default' : 'secondary'}
                        className={source.status === 'Connected' || source.status === 'Active' ? 'bg-green-100 text-green-800' : ''}>
                        {source.status}
                    </Badge>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Sync</span>
                    <span>{source.lastSync}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Records</span>
                    <span>{source.records}</span>
                </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={source.status === 'Connected' || source.status === 'Active' ? 'destructive' : 'default'}>
                {source.status === 'Connected' || source.status === 'Active' ? 'Disconnect' : 'Connect'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
