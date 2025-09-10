
'use client';

import { useState } from 'react';
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
import { PlusCircle, Plug, Rss, Briefcase, Globe, Mail, Bot, Inbox, Info, HelpCircle, FileText } from 'lucide-react';
import { useIntegrationStatus } from '@/hooks/use-integration-status';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

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

type CustomSource = {
    id: string;
    name: string;
    icon: React.ReactNode;
    status: string;
    lastSync: string;
    records: string;
    tooltip: string;
    parser?: 'json' | 'xml' | 'html';
};

type ParserType = 'json' | 'xml' | 'html';

export default function DataSourcesPage() {
  const { statuses, connect, disconnect } = useIntegrationStatus(
    initialDataSources.reduce((acc, source) => {
      acc[source.id] = source.defaultStatus === 'Connected' || source.defaultStatus === 'Active';
      return acc;
    }, {} as Record<string, boolean>)
  );

  const [customSources, setCustomSources] = useState<CustomSource[]>([]);
  const [isCustomSourceDialogOpen, setIsCustomSourceDialogOpen] = useState(false);
  const [customSourceName, setCustomSourceName] = useState('');
  const [customSourceParser, setCustomSourceParser] = useState<ParserType | ''>('');
  const [customSourceSchedule, setCustomSourceSchedule] = useState('');
  const [parserPath, setParserPath] = useState('');
  const { toast } = useToast();


  const dataSources = initialDataSources.map(source => ({
      ...source,
      status: statuses[source.id] ? (source.defaultStatus === 'Active' ? 'Active' : 'Connected') : 'Not Connected'
  })).concat(customSources);

  const handleToggleConnect = (id: string) => {
    if (statuses[id]) {
      disconnect(id);
    } else {
      connect(id);
    }
  };

  const resetDialog = () => {
    setCustomSourceName('');
    setCustomSourceParser('');
    setCustomSourceSchedule('');
    setParserPath('');
  }

  const handleAddCustomSource = (e: React.FormEvent) => {
    e.preventDefault();
    const newSource: CustomSource = {
        id: `custom-${customSourceName.toLowerCase().replace(/\s/g, '-')}`,
        name: customSourceName,
        icon: <Bot className="h-6 w-6 text-primary" />,
        status: 'Active',
        lastSync: `Scheduled: ${customSourceSchedule}`,
        records: 'N/A',
        tooltip: `Custom source with ${customSourceParser} parser.`,
        parser: customSourceParser as ParserType,
    };
    setCustomSources(prev => [...prev, newSource]);
    toast({ title: "Custom Source Added", description: `${customSourceName} has been configured.` });
    setIsCustomSourceDialogOpen(false);
    resetDialog();
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
        <Dialog open={isCustomSourceDialogOpen} onOpenChange={setIsCustomSourceDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsCustomSourceDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Custom Source
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <form onSubmit={handleAddCustomSource}>
            <DialogHeader>
              <DialogTitle>Add Custom Source</DialogTitle>
              <DialogDescription>
                Configure a new custom data source for ingestion.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="e.g., Industry News API" value={customSourceName} onChange={e => setCustomSourceName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" placeholder="https://api.example.com/posts" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="parser">Parser</Label>
                    <Select value={customSourceParser} onValueChange={(value) => setCustomSourceParser(value as ParserType)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parser" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="xml">XML</SelectItem>
                        <SelectItem value="html">HTML Crawler</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule">Schedule</Label>
                    <Select value={customSourceSchedule} onValueChange={setCustomSourceSchedule}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select refresh schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hourly">Hourly</SelectItem>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              </div>
              
                {customSourceParser === 'json' && (
                    <div className="space-y-2">
                        <Label htmlFor="json-path">JSONPath Expression</Label>
                        <Input id="json-path" placeholder="e.g., $.items[*]" value={parserPath} onChange={e => setParserPath(e.target.value)} />
                    </div>
                )}
                {customSourceParser === 'xml' && (
                    <div className="space-y-2">
                        <Label htmlFor="xpath">XPath Expression</Label>
                        <Input id="xpath" placeholder="e.g., //item" value={parserPath} onChange={e => setParserPath(e.target.value)} />
                    </div>
                )}
                {customSourceParser === 'html' && (
                    <div className="space-y-2">
                        <Label htmlFor="css-selector">CSS Selector</Label>
                        <Input id="css-selector" placeholder="e.g., .article-link" value={parserPath} onChange={e => setParserPath(e.target.value)} />
                    </div>
                )}
             
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button" onClick={reset}>Cancel</Button>
              </DialogClose>
              <Button type="submit">Save Source</Button>
            </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dataSources.map((source) => (
          <Card key={source.id} className="flex flex-col">
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
                    <span>{source.lastSync}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Records</span>
                    <span>{source.records}</span>
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
            <CardFooter className="flex gap-2">
                {source.id.startsWith('custom-') ? (
                     <Button className="w-full" variant="secondary"><FileText className="mr-2 h-4 w-4" /> Test Fetch</Button>
                ) : (
                     <Button onClick={() => handleToggleConnect(source.id)} className="w-full" variant={source.status === 'Connected' || source.status === 'Active' ? 'destructive' : 'default'}>
                        {source.status === 'Connected' || source.status === 'Active' ? 'Disconnect' : 'Connect'}
                    </Button>
                )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
    </TooltipProvider>
  );
}
