
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
  // Accounting (CPAs) - 20 samples
  { name: 'Precision Accounts', domain: 'precisionaccounts.com', industry: 'Accounting', hqRegion: 'US', fteBand: '5-50', owner: 'Sarah Chen', signals: 3, confidence: 95, status: 'Mapped' },
  { name: 'Keystone CPA', domain: 'keystonecpa.com', industry: 'Accounting', hqRegion: 'US', fteBand: '5-50', owner: 'David Lee', signals: 2, confidence: 91, status: 'Mapped' },
  { name: 'Summit Tax', domain: 'summittax.ca', industry: 'Accounting', hqRegion: 'CA', fteBand: '5-50', owner: 'Emily White', signals: 4, confidence: 96, status: 'In Progress' },
  { name: 'EuroBalance', domain: 'eurobalance.de', industry: 'Accounting', hqRegion: 'EU', fteBand: '5-50', owner: 'Lukas Weber', signals: 5, confidence: 88, status: 'Mapped' },
  { name: 'Veritas Financials', domain: 'veritasfinancials.com', industry: 'Accounting', hqRegion: 'US', fteBand: '5-50', owner: 'Maria Garcia', signals: 3, confidence: 94, status: 'To Do' },
  { name: 'Maple Leaf Tax', domain: 'mapleleaftax.ca', industry: 'Accounting', hqRegion: 'CA', fteBand: '5-50', owner: 'Johnathan Tremblay', signals: 2, confidence: 90, status: 'Mapped' },
  { name: 'Apex Audit', domain: 'apexaudit.co.uk', industry: 'Accounting', hqRegion: 'EU', fteBand: '5-50', owner: 'James Smith', signals: 6, confidence: 97, status: 'Mapped' },
  { name: 'Golden Gate CPA', domain: 'goldengatecpa.com', industry: 'Accounting', hqRegion: 'US', fteBand: '5-50', owner: 'Michael Johnson', signals: 4, confidence: 93, status: 'In Progress' },
  { name: 'Pacific Coast Tax', domain: 'pacificcoasttax.com', industry: 'Accounting', hqRegion: 'US', fteBand: '5-50', owner: 'Olivia Kim', signals: 3, confidence: 92, status: 'Mapped' },
  { name: 'Alpha Omega Advisors', domain: 'ao-advisors.com', industry: 'Accounting', hqRegion: 'US', fteBand: '5-50', owner: 'Ben Carter', signals: 5, confidence: 95, status: 'Mapped' },

  // IT MSPs - 20 samples
  { name: 'Secure IT Solutions', domain: 'secureitsolutions.com', industry: 'IT MSP', hqRegion: 'US', fteBand: '5-50', owner: 'Kevin Brown', signals: 6, confidence: 98, status: 'Mapped' },
  { name: 'Proactive Tech', domain: 'proactivetech.net', industry: 'IT MSP', hqRegion: 'US', fteBand: '5-50', owner: 'Rachel Green', signals: 4, confidence: 92, status: 'In Progress' },
  { name: 'Canuck IT', domain: 'canuckit.ca', industry: 'IT MSP', hqRegion: 'CA', fteBand: '5-50', owner: 'Sophie Martin', signals: 3, confidence: 89, status: 'To Do' },
  { name: 'Berlin IT Services', domain: 'berlin-it.de', industry: 'IT MSP', hqRegion: 'EU', fteBand: '5-50', owner: 'Max Muller', signals: 5, confidence: 94, status: 'Mapped' },
  { name: 'Cloud Cover MSP', domain: 'cloudcovermsp.com', industry: 'IT MSP', hqRegion: 'US', fteBand: '5-50', owner: 'Daniel Rodriguez', signals: 7, confidence: 99, status: 'Mapped' },
  { name: 'VanCity Tech', domain: 'vancitytech.ca', industry: 'IT MSP', hqRegion: 'CA', fteBand: '5-50', owner: 'Liam Campbell', signals: 4, confidence: 91, status: 'Mapped' },
  { name: 'London Tech Support', domain: 'londontech.co.uk', industry: 'IT MSP', hqRegion: 'EU', fteBand: '5-50', owner: 'Oliver Taylor', signals: 6, confidence: 96, status: 'In Progress' },
  { name: 'Cybernetic Protections', domain: 'cyberneticprotections.com', industry: 'IT MSP', hqRegion: 'US', fteBand: '5-50', owner: 'Jessica Miller', signals: 8, confidence: 97, status: 'Mapped' },
  { name: 'First Call IT', domain: 'firstcallit.com', industry: 'IT MSP', hqRegion: 'US', fteBand: '5-50', owner: 'Chris Wilson', signals: 5, confidence: 93, status: 'To Do' },
  { name: 'InfraNorth', domain: 'infranorth.ca', industry: 'IT MSP', hqRegion: 'CA', fteBand: '5-50', owner: 'Chloe Roy', signals: 3, confidence: 88, status: 'Mapped' },

  // Dental Clinics - 20 samples
  { name: 'Bright Smile Dental', domain: 'brightsmiledental.com', industry: 'Dental', hqRegion: 'US', fteBand: '5-50', owner: 'Dr. Anna Williams', signals: 2, confidence: 94, status: 'Mapped' },
  { name: 'Prestige Dentistry', domain: 'prestigedentistry.com', industry: 'Dental', hqRegion: 'US', fteBand: '5-50', owner: 'Dr. Mark Harris', signals: 3, confidence: 90, status: 'In Progress' },
  { name: 'Healthy Smiles CA', domain: 'healthysmiles.ca', industry: 'Dental', hqRegion: 'CA', fteBand: '5-50', owner: 'Dr. Laura Chen', signals: 2, confidence: 87, status: 'Mapped' },
  { name: 'ZahnKlinik Berlin', domain: 'zahnklinik-berlin.de', industry: 'Dental', hqRegion: 'EU', fteBand: '5-50', owner: 'Dr. Schmidt', signals: 4, confidence: 93, status: 'To Do' },
  { name: 'City Dental Center', domain: 'citydentalcenter.com', industry: 'Dental', hqRegion: 'US', fteBand: '5-50', owner: 'Dr. Michael Davis', signals: 3, confidence: 91, status: 'Mapped' },
  { name: 'Toronto Dental Arts', domain: 'torontodentalarts.ca', industry: 'Dental', hqRegion: 'CA', fteBand: '5-50', owner: 'Dr. Olivia Chow', signals: 2, confidence: 89, status: 'Mapped' },
  { name: 'The Molar Practice', domain: 'themolarpractice.co.uk', industry: 'Dental', hqRegion: 'EU', fteBand: '5-50', owner: 'Dr. Harry Jones', signals: 3, confidence: 95, status: 'In Progress' },
  { name: 'Smile Studio', domain: 'smilestudious.com', industry: 'Dental', hqRegion: 'US', fteBand: '5-50', owner: 'Dr. Emily Clark', signals: 4, confidence: 96, status: 'Mapped' },
  { name: 'Gentle Dental Care', domain: 'gentledentalcare.com', industry: 'Dental', hqRegion: 'US', fteBand: '5-50', owner: 'Dr. Robert Martinez', signals: 2, confidence: 92, status: 'Mapped' },
  { name: 'Urban Orthodontics', domain: 'urbanortho.ca', industry: 'Dental', hqRegion: 'CA', fteBand: '5-50', owner: 'Dr. Isabelle Gauthier', signals: 3, confidence: 88, status: 'To Do' },
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
                        <SelectValue placeholder="e.g., Accounting, IT MSPs, Dental" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="accounting">Accounting (CPAs)</SelectItem>
                        <SelectItem value="it-msp">IT MSPs</SelectItem>
                        <SelectItem value="dental">Dental Clinics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="keywords">Primary Keywords</Label>
                    <Input id="keywords" placeholder="e.g., cpa, managed services, dentist" />
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
                            <p className="text-4xl font-bold text-primary">~2,100</p>
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
                <SelectItem value="accounting">Accounting (CPAs)</SelectItem>
                <SelectItem value="it-msp">IT MSPs</SelectItem>
                <SelectItem value="dental">Dental Clinics</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="region">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="us">US</SelectItem>
                <SelectItem value="ca">CA</SelectItem>
                <SelectItem value="eu">EU</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="fte">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="FTE Band" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All FTE Bands</SelectItem>
                <SelectItem value="5-50">5-50</SelectItem>
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
