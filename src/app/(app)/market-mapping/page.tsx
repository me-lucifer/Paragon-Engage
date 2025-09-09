
import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Info, PlusCircle, ArrowRight, BrainCircuit, Check, FileText } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const companies = [
  {
    name: 'Innovate Inc.',
    domain: 'innovate.com',
    industry: 'Technology',
    hqRegion: 'North America',
    fteBand: '1001-5000',
    owner: 'Alex Chen',
    signals: 3,
    confidence: 95,
    status: 'Mapped',
  },
  {
    name: 'HealthWell Group',
    domain: 'healthwell.org',
    industry: 'Healthcare',
    hqRegion: 'Europe',
    fteBand: '501-1000',
    owner: 'Sarah Lee',
    signals: 5,
    confidence: 88,
    status: 'In Progress',
  },
  {
    name: 'EcoSolutions',
    domain: 'ecosolutions.co',
    industry: 'Renewable Energy',
    hqRegion: 'North America',
    fteBand: '201-500',
    owner: 'David Kim',
    signals: 2,
    confidence: 92,
    status: 'Mapped',
  },
  {
    name: 'FinSecure',
    domain: 'finsecure.io',
    industry: 'Finance',
    hqRegion: 'APAC',
    fteBand: '5001-10000',
    owner: 'Priya Patel',
    signals: 8,
    confidence: 98,
    status: 'To Do',
  },
  {
    name: 'RetailNext',
    domain: 'retailnext.com',
    industry: 'Retail',
    hqRegion: 'Europe',
    fteBand: '1001-5000',
    owner: 'Michael B.',
    signals: 4,
    confidence: 85,
    status: 'Mapped',
  },
];

const dataSources = [
    { id: 'apollo', label: 'Apollo.io' },
    { id: 'zoominfo', label: 'ZoomInfo' },
    { id: 'clearbit', label: 'Clearbit' },
    { id: 'crunchbase', label: 'Crunchbase' },
    { id: 'linkedin', label: 'LinkedIn Sales Navigator' },
];

export default function MarketMappingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Market Mapping
            </h1>
            <p className="text-muted-foreground">
                Define and explore your target market segments.
            </p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Map New Industry
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-2xl w-full">
            <Tabs defaultValue="step1" className="h-full flex flex-col">
              <SheetHeader>
                <SheetTitle>Map New Industry</SheetTitle>
                <SheetDescription>
                    Follow the steps to define and map a new industry segment.
                </SheetDescription>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="step1">Step 1: Industry</TabsTrigger>
                    <TabsTrigger value="step2">Step 2: Sources</TabsTrigger>
                    <TabsTrigger value="step3">Step 3: Estimate</TabsTrigger>
                </TabsList>
              </SheetHeader>
              <div className="flex-grow overflow-y-auto p-1">
                <TabsContent value="step1" className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry-select">Select Industry</Label>
                    <Select>
                      <SelectTrigger id="industry-select">
                        <SelectValue placeholder="e.g., SaaS, Biotechnology, E-commerce" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saas">SaaS</SelectItem>
                        <SelectItem value="biotech">Biotechnology</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="keywords">Primary Keywords</Label>
                    <Input id="keywords" placeholder="e.g., artificial intelligence, machine learning" />
                     <p className="text-xs text-muted-foreground">Enter comma-separated keywords that define this industry.</p>
                  </div>
                </TabsContent>
                <TabsContent value="step2" className="space-y-6 py-4">
                    <div className="space-y-4">
                        <Label>Select Data Sources</Label>
                        {dataSources.map(source => (
                            <div key={source.id} className="flex items-center space-x-2">
                                <Checkbox id={source.id} />
                                <Label htmlFor={source.id} className="font-normal">{source.label}</Label>
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="step3" className="space-y-6 py-4">
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <BrainCircuit /> Estimated Volume
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-4xl font-bold text-primary">~15,400</p>
                            <p className="text-muted-foreground">companies match your criteria.</p>
                        </CardContent>
                    </Card>
                     <div className="flex items-start gap-3 rounded-lg border p-4 text-sm">
                        <Info className="h-5 w-5 text-primary mt-0.5" />
                        <div className="space-y-1">
                            <h4 className="font-semibold">Ethical Sourcing & Compliance</h4>
                            <p className="text-muted-foreground">
                                Paragon Engage is committed to ethical data practices. We only use publicly available information and respect all platforms' Terms of Service. All data enrichment is performed in compliance with applicable data privacy regulations.
                            </p>
                        </div>
                    </div>
                </TabsContent>
              </div>
              <SheetFooter className="pt-4 border-t">
                <SheetClose asChild>
                    <Button variant="outline">Cancel</Button>
                </SheetClose>
                <Button>
                    Start Mapping <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </SheetFooter>
            </Tabs>
          </SheetContent>
        </Sheet>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-4">
            <Select defaultValue="industry">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="region">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="na">North America</SelectItem>
                <SelectItem value="eu">Europe</SelectItem>
                <SelectItem value="apac">APAC</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="fte">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="FTE Band" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All FTE Bands</SelectItem>
                <SelectItem value="1-50">1-50</SelectItem>
                <SelectItem value="51-200">51-200</SelectItem>
                <SelectItem value="201-1000">201-1000</SelectItem>
                <SelectItem value="1001-5000">1001-5000</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Switch id="ownership" />
              <Label htmlFor="ownership">Principal Owned</Label>
            </div>
            <Button className="ml-auto w-full sm:w-auto">
              Refresh Map
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>HQ Region</TableHead>
                <TableHead>FTE Band</TableHead>
                <TableHead>Owner/Principal</TableHead>
                <TableHead>Signals</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.domain}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.domain}</TableCell>
                  <TableCell>{company.industry}</TableCell>
                  <TableCell>{company.hqRegion}</TableCell>
                  <TableCell>{company.fteBand}</TableCell>
                  <TableCell>{company.owner}</TableCell>
                  <TableCell>{company.signals}</TableCell>
                  <TableCell>
                    <Badge variant={company.confidence > 90 ? 'default' : 'secondary'}>
                      {company.confidence}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={company.status === 'Mapped' ? 'secondary' : company.status === 'In Progress' ? 'default' : 'outline'}>
                        {company.status}
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
