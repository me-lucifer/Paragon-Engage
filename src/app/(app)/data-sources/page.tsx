
'use client';

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
import { PlusCircle, Plug, Rss, Briefcase, Globe, Mail, Bot, Inbox, Info, HelpCircle } from 'lucide-react';
import { useIntegrationStatus } from '@/hooks/use-integration-status';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const initialDataSources = [
  { id: 'apollo', name: 'Apollo.io', icon: <Plug className="h-6 w-6 text-primary" />, defaultStatus: 'Connected', lastSync: '2h ago', records: '1.2M', tooltip: 'Ingests company and contact data for enrichment and list building.' },
  { id: 'linkedin', name: 'LinkedIn Sales Navigator', icon: <Briefcase className="h-6 w-6 text-blue-700" />, defaultStatus: 'Not Connected', lastSync: 'N/A', records: 'N/A', tooltip: 'Import contacts and company lists exported from Sales Navigator.', note: 'Supported via CSV import (use LinkedIn’s Export features). We do not scrape LinkedIn.' },
  { id: 'clearbit', name: 'Clearbit', icon: <Plug className="h-6 w-6 text-primary" />, defaultStatus: 'Connected', lastSync: '30m ago', records: '850K', tooltip: 'Provides real-time company and contact enrichment.' },
  { id: 'hunter', name: 'Hunter', icon: <Plug className="h-6 w-6 text-primary" />, defaultStatus: 'Not Connected', lastSync: 'N/A', records: 'N/A', tooltip: 'Finds and verifies professional email addresses.' },
  { id: 'google-news', name: 'Google News', icon: <Rss className="h-6 w-6 text-orange-500" />, defaultStatus: 'Connected', lastSync: '15m ago', records: '5.2K', tooltip: 'Ingests news articles as triggers for personalized outreach.' },
  { id: 'company-websites', name: 'Company Websites', icon: <Globe className="h-6 w-6 text-primary" />, defaultStatus: 'Active', lastSync: 'Continuous', records: '780K', tooltip: 'Crawls company websites for firmographic data and tech stack information.' },
  { id: 'mailgun', name: 'Mailgun', icon: <Mail className="h-6 w-6 text-red-500" />, defaultStatus: 'Connected', lastSync: '1m ago', records: '2.1M', tooltip: 'Monitors email events to track deliverability.', note: 'Events only (delivered/bounce/complaint) to improve deliverability analytics.' },
  { id: 'sendgrid', name: 'SendGrid', icon: <Mail className="h-6 w-6 text-blue-400" />, defaultStatus: 'Not Connected', lastSync: 'N/A', records: 'N/A', tooltip: 'Monitors email events to track deliverability.', note: 'Events only (delivered/bounce/complaint) to improve deliverability analytics.'},
  { id: 'google-workspace', name: 'Google Workspace / O365', icon: <Inbox className="h-6 w-6 text-blue-500" />, defaultStatus: 'Connected', lastSync: 'Real-time', records: '1.5M', tooltip: 'Connects to your mailboxes for sending and reply detection.', note: 'Used to suppress ‘already in conversation’ and enrich known contacts.' },
];

export default function DataSourcesPage() {
  const { statuses, connect, disconnect } = useIntegrationStatus(
    initialDataSources.reduce((acc, source) => {
      acc[source.id] = source.defaultStatus === 'Connected' || source.defaultStatus === 'Active';
      return acc;
    }, {} as Record<string, boolean>)
  );

  const dataSources = initialDataSources.map(source => ({
      ...source,
      status: statuses[source.id] ? (source.defaultStatus === 'Active' ? 'Active' : 'Connected') : 'Not Connected'
  }));

  const handleToggleConnect = (id: string) => {
    if (statuses[id]) {
      disconnect(id);
    } else {
      connect(id);
    }
  };


  return (
    <TooltipProvider>
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
          <Card key={source.name} className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
              {source.icon}
              <div className="flex-1">
                <CardTitle>{source.name}</CardTitle>
              </div>
               {source.tooltip && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="max-w-xs">{source.tooltip}</p>
                    </TooltipContent>
                </Tooltip>
              )}
            </CardHeader>
            <CardContent className="space-y-4 text-sm flex-1">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant={source.status === 'Connected' || source.status === 'Active' ? 'default' : 'secondary'}
                        className={source.status === 'Connected' || source.status === 'Active' ? 'bg-green-100 text-green-800' : ''}>
                        {source.status}
                    </Badge>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Sync</span>
                    <span>{source.status === 'Connected' || source.status === 'Active' ? source.lastSync : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Records</span>
                    <span>{source.status === 'Connected' || source.status === 'Active' ? source.records : 'N/A'}</span>
                </div>
                {source.note && (
                    <div className="flex items-start gap-3 rounded-lg border bg-muted/50 p-3 text-xs mt-4">
                        <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-muted-foreground">
                           {source.note}
                        </p>
                    </div>
                )}
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleToggleConnect(source.id)} className="w-full" variant={source.status === 'Connected' || source.status === 'Active' ? 'destructive' : 'default'}>
                {source.status === 'Connected' || source.status === 'Active' ? 'Disconnect' : 'Connect'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
    </TooltipProvider>
  );
}
