

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
  SheetFooter,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Info, PlusCircle, ArrowRight, BrainCircuit, Check, FileText, HelpCircle, Pencil } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CompanyDetailsDrawer } from '@/components/company-details-drawer';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';


const companies = [
  // Accounting (CPAs)
  { name: 'Precision Accounts', domain: 'precisionaccounts.com', industry: 'Accounting', hqRegion: 'US', fteBand: '5-50', owner: 'Sarah Chen', signals: 3, confidence: 95, status: 'Mapped' },
  { name: 'Keystone CPA', domain: 'keystonecpa.com', industry: 'Accounting', hqRegion: 'US', fteBand: '5-50', owner: 'David Lee', signals: 2, confidence: 91, status: 'Mapped' },
  { name: 'Summit Tax', domain: 'summittax.ca', industry: 'Accounting', hqRegion: 'CA', fteBand: '5-50', owner: 'Emily White', signals: 4, confidence: 75, status: 'In Progress' },
  { name: 'EuroBalance', domain: 'eurobalance.de', industry: 'Accounting', hqRegion: 'EU', fteBand: '5-50', owner: 'Lukas Weber', signals: 5, confidence: 72, status: 'Mapped' },
  { name: 'Veritas Financials', domain: 'veritasfinancials.com', industry: 'Accounting', hqRegion: 'US', fteBand: '5-50', owner: 'Maria Garcia', signals: 3, confidence: 85, status: 'To Do' },
  { name: 'Maple Leaf Tax', domain: 'mapleleaftax.ca', industry: 'Accounting', hqRegion: 'CA', fteBand: '5-50', owner: 'Johnathan Tremblay', signals: 2, confidence: 68, status: 'Mapped' },
  { name: 'Apex Audit', domain: 'apexaudit.co.uk', industry: 'Accounting', hqRegion: 'EU', fteBand: '5-50', owner: 'James Smith', signals: 6, confidence: 64, status: 'Mapped' },
  { name: 'Golden Gate CPA', domain: 'goldengatecpa.com', industry: 'Accounting', hqRegion: 'US', fteBand: '5-50', owner: 'Michael Johnson', signals: 4, confidence: 58, status: 'In Progress' },
  { name: 'Pacific Coast Tax', domain: 'pacificcoasttax.com', industry: 'Accounting', hqRegion: 'US', fteBand: '5-50', owner: 'Olivia Kim', signals: 3, confidence: 55, status: 'Mapped' },
  { name: 'Alpha Omega Advisors', domain: 'ao-advisors.com', industry: 'Accounting', hqRegion: 'US', fteBand: '5-50', owner: 'Ben Carter', signals: 5, confidence: 49, status: 'Mapped' },

  // IT MSPs
  { name: 'Secure IT Solutions', domain: 'secureitsolutions.com', industry: 'IT MSP', hqRegion: 'US', fteBand: '5-50', owner: 'Kevin Brown', signals: 6, confidence: 98, status: 'Mapped' },
  { name: 'Proactive Tech', domain: 'proactivetech.net', industry: 'IT MSP', hqRegion: 'US', fteBand: '5-50', owner: 'Rachel Green', signals: 4, confidence: 87, status: 'In Progress' },
  { name: 'Canuck IT', domain: 'canuckit.ca', industry: 'IT MSP', hqRegion: 'CA', fteBand: '5-50', owner: 'Sophie Martin', signals: 3, confidence: 80, status: 'To Do' },
  { name: 'Berlin IT Services', domain: 'berlin-it.de', industry: 'IT MSP', hqRegion: 'EU', fteBand: '5-50', owner: 'Max Muller', signals: 5, confidence: 78, status: 'Mapped' },
  { name: 'Cloud Cover MSP', domain: 'cloudcovermsp.com', industry: 'IT MSP', hqRegion: 'US', fteBand: '5-50', owner: 'Daniel Rodriguez', signals: 7, confidence: 92, status: 'Mapped' },
  { name: 'VanCity Tech', domain: 'vancitytech.ca', industry: 'IT MSP', hqRegion: 'CA', fteBand: '5-50', owner: 'Liam Campbell', signals: 4, confidence: 71, status: 'Mapped' },
  { name: 'London Tech Support', domain: 'londontech.co.uk', industry: 'IT MSP', hqRegion: 'EU', fteBand: '5-50', owner: 'Oliver Taylor', signals: 6, confidence: 66, status: 'In Progress' },
  { name: 'Cybernetic Protections', domain: 'cyberneticprotections.com', industry: 'IT MSP', hqRegion: 'US', fteBand: '5-50', owner: 'Jessica Miller', signals: 8, confidence: 62, status: 'Mapped' },
  { name: 'First Call IT', domain: 'firstcallit.com', industry: 'IT MSP', hqRegion: 'US', fteBand: '5-50', owner: 'Chris Wilson', signals: 5, confidence: 56, status: 'To Do' },
  { name: 'InfraNorth', domain: 'infranorth.ca', industry: 'IT MSP', hqRegion: 'CA', fteBand: '5-50', owner: 'Chloe Roy', signals: 3, confidence: 51, status: 'Mapped' },

  // Dental Clinics
  { name: 'Bright Smile Dental', domain: 'brightsmiledental.com', industry: 'Dental', hqRegion: 'US', fteBand: '5-50', owner: 'Dr. Anna Williams', signals: 2, confidence: 89, status: 'Mapped' },
  { name: 'Prestige Dentistry', domain: 'prestigedentistry.com', industry: 'Dental', hqRegion: 'US', fteBand: '5-50', owner: 'Dr. Mark Harris', signals: 3, confidence: 82, status: 'In Progress' },
  { name: 'Healthy Smiles CA', domain: 'healthysmiles.ca', industry: 'Dental', hqRegion: 'CA', fteBand: '5-50', owner: 'Dr. Laura Chen', signals: 2, confidence: 77, status: 'Mapped' },
  { name: 'ZahnKlinik Berlin', domain: 'zahnklinik-berlin.de', industry: 'Dental', hqRegion: 'EU', fteBand: '5-50', owner: 'Dr. Schmidt', signals: 4, confidence: 74, status: 'To Do' },
  { name: 'City Dental Center', domain: 'citydentalcenter.com', industry: 'Dental', hqRegion: 'US', fteBand: '5-50', owner: 'Dr. Michael Davis', signals: 3, confidence: 69, status: 'Mapped' },
  { name: 'Toronto Dental Arts', domain: 'torontodentalarts.ca', industry: 'Dental', hqRegion: 'CA', fteBand: '5-50', owner: 'Dr. Olivia Chow', signals: 2, confidence: 65, status: 'Mapped' },
  { name: 'The Molar Practice', domain: 'themolarpractice.co.uk', industry: 'Dental', hqRegion: 'EU', fteBand: '5-50', owner: 'Dr. Harry Jones', signals: 3, confidence: 61, status: 'In Progress' },
  { name: 'Smile Studio', domain: 'smilestudious.com', industry: 'Dental', hqRegion: 'US', fteBand: '5-50', owner: 'Dr. Emily Clark', signals: 4, confidence: 57, status: 'Mapped' },
  { name: 'Gentle Dental Care', domain: 'gentledentalcare.com', industry: 'Dental', hqRegion: 'US', fteBand: '5-50', owner: 'Dr. Robert Martinez', signals: 2, confidence: 53, status: 'Mapped' },
  { name: 'Urban Orthodontics', domain: 'urbanortho.ca', industry: 'Dental', hqRegion: 'CA', fteBand: '5-50', owner: 'Dr. Isabelle Gauthier', signals: 3, confidence: 48, status: 'To Do' },
];

const dataSources = [
    { id: 'apollo', label: 'Apollo.io' },
    { id: 'zoominfo', label: 'ZoomInfo' },
    { id: 'clearbit', label: 'Clearbit' },
    { id: 'crunchbase', label: 'Crunchbase' },
    { id: 'linkedin', label: 'LinkedIn Sales Navigator' },
];

const initialIndustries = [
    { value: 'accounting', label: 'Accounting (CPAs)' },
    { value: 'it-msp', label: 'IT MSPs' },
    { value: 'dental', label: 'Dental Clinics' },
];

export type Company = typeof companies[0];

export default function MarketMappingPage() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [industries, setIndustries] = useState(initialIndustries);
  const [isManageIndustriesOpen, setIsManageIndustriesOpen] = useState(false);
  const [newIndustryName, setNewIndustryName] = useState('');
  const [newIndustryNaics, setNewIndustryNaics] = useState('');
  const [newIndustrySynonyms, setNewIndustrySynonyms] = useState('');
  const { toast } = useToast();

  const handleRowClick = (company: Company) => {
    setSelectedCompany(company);
  };

  const handleDrawerOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedCompany(null);
    }
  };
  
  const handleAddIndustry = (e: React.FormEvent) => {
      e.preventDefault();
      if (newIndustryName) {
          const newIndustry = {
              value: newIndustryName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
              label: newIndustryName
          };
          setIndustries(prev => [...prev, newIndustry]);
          setNewIndustryName('');
          setNewIndustryNaics('');
          setNewIndustrySynonyms('');
          toast({
              title: "Industry Added",
              description: `${newIndustry.label} has been added to the taxonomy.`,
          });
      }
  };

  return (
    <>
    <TooltipProvider>
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
                  <div className="flex justify-between items-start">
                    <div>
                      <SheetTitle>Map New Industry</SheetTitle>
                      <SheetDescription>
                          Follow the steps to define and map a new industry segment.
                      </SheetDescription>
                    </div>
                    <Dialog open={isManageIndustriesOpen} onOpenChange={setIsManageIndustriesOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm"><Pencil className="mr-2 h-4 w-4" /> Manage Industries</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Manage Industry Taxonomy</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <ul className="space-y-2 max-h-48 overflow-y-auto">
                                    {industries.map(industry => (
                                        <li key={industry.value} className="text-sm p-2 border rounded-md">{industry.label}</li>
                                    ))}
                                </ul>
                                <Separator />
                                <form onSubmit={handleAddIndustry} className="space-y-4">
                                    <h4 className="font-medium">Add New Industry</h4>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-industry-name">Name</Label>
                                        <Input id="new-industry-name" value={newIndustryName} onChange={e => setNewIndustryName(e.target.value)} required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="new-industry-naics">NAICS (Optional)</Label>
                                            <Input id="new-industry-naics" value={newIndustryNaics} onChange={e => setNewIndustryNaics(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-industry-synonyms">Synonyms</Label>
                                            <Input id="new-industry-synonyms" value={newIndustrySynonyms} onChange={e => setNewIndustrySynonyms(e.target.value)} placeholder="comma-separated" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Save Industry</Button>
                                    </DialogFooter>
                                </form>
                            </div>
                        </DialogContent>
                    </Dialog>
                  </div>
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
                          {industries.map(industry => (
                            <SelectItem key={industry.value} value={industry.value}>{industry.label}</SelectItem>
                          ))}
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
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Signals
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Count of evidence items that support this mapping (news, directories, keywords…).</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableHead>
                  <TableHead>
                     <div className="flex items-center gap-1">
                      Confidence
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Model’s probability the company belongs in this segment (based on signals + source agreement).</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableHead>
                  <TableHead>
                     <div className="flex items-center gap-1">
                      Status
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Workflow state. ‘Mapped’ moves to Enrichment.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.domain} onClick={() => handleRowClick(company)} className="cursor-pointer">
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.domain}</TableCell>
                    <TableCell>{company.industry}</TableCell>
                    <TableCell>{company.hqRegion}</TableCell>
                    <TableCell>{company.fteBand}</TableCell>
                    <TableCell>{company.owner}</TableCell>
                    <TableCell>{company.signals}</TableCell>
                    <TableCell>
                      <Badge variant={company.confidence > 90 ? 'default' : company.confidence > 75 ? 'secondary' : 'outline'}>
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
        <p className="text-center text-sm text-muted-foreground mt-8">What happens next? Approved companies go to Enrichment.</p>
      </div>
      </TooltipProvider>

      <CompanyDetailsDrawer 
        company={selectedCompany}
        open={!!selectedCompany}
        onOpenChange={handleDrawerOpenChange}
      />
    </>
  );
}

    
