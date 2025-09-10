

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Building, Eye, Shield, Users, Database, UploadCloud, Key, RotateCw, Trash2, EyeOff, Link as LinkIcon, Mail, Inbox, FileText, HelpCircle, Bot } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { RolesMatrix, defaultPermissions } from '@/components/roles-matrix';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { useIntegrationStatus } from '@/hooks/use-integration-status';
import { WarningBanner } from '@/components/warning-banner';
import Link from 'next/link';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { useRole } from '@/hooks/use-role';
import { allNavGroups } from '@/components/layout/sidenav';

const dncList = [
    { source: "List Upload", reason: "Global DNC", added: "2024-06-01" },
    { source: "Apollo.io", reason: "Do Not Contact", added: "2024-05-28" },
];

const initialIntegrationStates = {
    apollo: true,
    clearbit: true,
    hunter: false,
    mailgun: true,
    sendgrid: false,
    'google-workspace': true,
    'microsoft-365': false,
    salesforce: false,
    hubspot: false,
};

const negativePhraseSeeds = [
    "unsubscribe", "remove me", "opt out", "stop emailing", "do not contact",
    "not interested", "no interest", "not now", "no thanks", "wrong contact", "cease contact"
];

export default function SettingsPage() {
    const { toast } = useToast();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { role } = useRole();

    const [orgName, setOrgName] = useState("Paragon Engage Demo");
    const [primaryDomain, setPrimaryDomain] = useState("paragon-demo.io");
    const [supportEmail, setSupportEmail] = useState("support@paragon-demo.io");
    const [footerIdentity, setFooterIdentity] = useState("You’re receiving this business outreach from {{org_name}} ({{legal_name}}). To stop further emails, use the unsubscribe link below.");
    const [orgNameError, setOrgNameError] = useState("");
    const [supportEmailError, setSupportEmailError] = useState("");
    
    const [isUnsubscribePreviewOpen, setIsUnsubscribePreviewOpen] = useState(false);
    const [unsubscribeKeywords, setUnsubscribeKeywords] = useState(["unsubscribe", "remove me", "opt out"]);
    const [newKeyword, setNewKeyword] = useState("");
    const { statuses: integrationStatuses, testConnection, isTesting, revealed, toggleReveal, setStatuses: setIntegrationStatuses, rotateKey } = useIntegrationStatus(initialIntegrationStates);
    
    const [retentionReplies, setRetentionReplies] = useState(90);
    const [retentionLogs, setRetentionLogs] = useState(180);
    const [retentionAggregates, setRetentionAggregates] = useState(24);

    const [negativePhrases, setNegativePhrases] = useState(negativePhraseSeeds);
    const [newNegativePhrase, setNewNegativePhrase] = useState("");

    const handleAddNegativePhrase = () => {
        if (newNegativePhrase && !negativePhrases.includes(newNegativePhrase)) {
            setNegativePhrases([...negativePhrases, newNegativePhrase]);
            setNewNegativePhrase("");
        }
    };

    const handleRemoveNegativePhrase = (phraseToRemove: string) => {
        setNegativePhrases(negativePhrases.filter(phrase => phrase !== phraseToRemove));
    };


    const enabledDiscoveryProviders = Object.entries(integrationStatuses)
        .filter(([key, isConnected]) => ['apollo', 'clearbit', 'hunter'].includes(key) && isConnected)
        .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1));

    const areVerificationProvidersEnabled = enabledDiscoveryProviders.length > 0;

    const activeTab = searchParams.get('tab') || 'organization';

    const hasConfigureCompliancePermission = defaultPermissions['Compliance']?.[role]?.includes('Configure');
    
    const handleTabChange = (value: string) => {
        const newPath = `${pathname}?tab=${value}`;
        const navItems = allNavGroups.flatMap(group => group.items.flatMap(item => (item.subItems ? item.subItems : item)));
        let currentNavItem = navItems.find(item => item.href === newPath);
        if (!currentNavItem) {
            currentNavItem = navItems.find(item => item.href.split('?')[0] === pathname);
        }
        const hasPermission = currentNavItem ? defaultPermissions[currentNavItem.label as keyof typeof defaultPermissions]?.[role]?.includes('View') : true;

        if(hasPermission) {
            router.push(newPath);
        } else {
             toast({
                variant: 'destructive',
                title: "Access Denied",
                description: `You do not have permission to view this page with the "${role}" role.`,
             });
        }
    };

    const handleAddKeyword = () => {
        if (newKeyword && !unsubscribeKeywords.includes(newKeyword)) {
            setUnsubscribeKeywords([...unsubscribeKeywords, newKeyword]);
            setNewKeyword("");
        }
    };

    const handleRemoveKeyword = (keywordToRemove: string) => {
        setUnsubscribeKeywords(unsubscribeKeywords.filter(keyword => keyword !== keywordToRemove));
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSaveChanges = () => {
        let hasError = false;
        if (!orgName) {
            setOrgNameError("Organization Name is required.");
            hasError = true;
        } else {
            setOrgNameError("");
        }

        if (supportEmail && !validateEmail(supportEmail)) {
            setSupportEmailError("Please enter a valid email address.");
            hasError = true;
        } else {
            setSupportEmailError("");
        }

        if (!hasError) {
             toast({
                title: "Success",
                description: "Organization profile saved.",
            });
        }
    };

    const handleSaveCompliance = () => {
        toast({
            title: "Success",
            description: "Compliance saved.",
        });
    };
    
    const handleOAuthConnect = (id: string) => {
        setIntegrationStatuses(prev => ({...prev, [id]: !prev[id]}));
        toast({
            title: `Integration ${integrationStatuses[id] ? 'Disconnected' : 'Connected'}`,
            description: `Successfully ${integrationStatuses[id] ? 'disconnected' : 'connected'} ${id}.`
        });
    };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account, workspace, and preferences.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-col md:flex-row gap-6">
        <TabsList className="flex-col h-auto justify-start p-2 gap-1 bg-transparent border-r-0 md:border-r w-full md:w-48">
          <TabsTrigger value="organization" className="w-full justify-start gap-2">
            <Building className="h-4 w-4" /> Organization
          </TabsTrigger>
           <TabsTrigger value="roles" className="w-full justify-start gap-2">
            <Users className="h-4 w-4" /> Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="compliance" className="w-full justify-start gap-2">
            <Shield className="h-4 w-4" /> Compliance
          </TabsTrigger>
           <TabsTrigger value="integrations" className="w-full justify-start gap-2">
            <Database className="h-4 w-4" /> Integrations
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1">
            <TabsContent value="organization">
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div>
                                <CardTitle>Company Details</CardTitle>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => setIsUnsubscribePreviewOpen(true)}>
                                <Eye className="mr-2 h-4 w-4" /> Unsubscribe Preview
                            </Button>
                        </CardHeader>
                        <CardContent className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="org-name">Organization Name*</Label>
                                <Input id="org-name" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
                                {orgNameError && <p className="text-sm text-destructive">{orgNameError}</p>}
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="primary-domain">Primary Domain</Label>
                                <Input id="primary-domain" value={primaryDomain} onChange={e => setPrimaryDomain(e.target.value)} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="timezone">Default Timezone*</Label>
                                <Select defaultValue="Asia/Kolkata">
                                    <SelectTrigger id="timezone">
                                        <SelectValue placeholder="Select a timezone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="EST">EST (UTC-5)</SelectItem>
                                        <SelectItem value="PST">PST (UTC-8)</SelectItem>
                                        <SelectItem value="GMT">GMT (UTC+0)</SelectItem>
                                        <SelectItem value="Asia/Kolkata">IST (UTC+5:30)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="locale">Default Locale</Label>
                                <Select defaultValue="en-US">
                                    <SelectTrigger id="locale">
                                        <SelectValue placeholder="Select a locale" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en-US">en-US</SelectItem>
                                        <SelectItem value="en-GB">en-GB</SelectItem>
                                        <SelectItem value="fr-FR">fr-FR</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="currency">Default Currency</Label>
                                <Select defaultValue="USD">
                                    <SelectTrigger id="currency">
                                        <SelectValue placeholder="Select a currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USD">USD</SelectItem>
                                        <SelectItem value="EUR">EUR</SelectItem>
                                        <SelectItem value="INR">INR</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2 col-span-2">
                                <Label htmlFor="logo">Logo</Label>
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center">
                                        <Building className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <Input id="logo" type="file" className="max-w-xs" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Email Identity</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="sender-name">Default Sender Display Name</Label>
                                <Input id="sender-name" defaultValue="Paragon Outreach" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="support-email">Support Email</Label>
                                <Input id="support-email" type="email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
                                {supportEmailError && <p className="text-sm text-destructive">{supportEmailError}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Legal / Footer Identity</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="legal-name">Legal Business Name</Label>
                                <Input id="legal-name" placeholder="Paragon Intelligence, Inc." />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="legal-address">Legal Address</Label>
                                <Textarea id="legal-address" placeholder="123 Main St, New York, NY 10001" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="footer-text">Footer Identity Text</Label>
                                <Textarea id="footer-text" value={footerIdentity} onChange={e => setFooterIdentity(e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handleSaveChanges} variant="accent">Save Changes</Button>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="roles">
              <Card>
                <CardHeader>
                  <CardTitle>Roles & Permissions</CardTitle>
                  <CardDescription>
                    Manage user roles and access levels for each module.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                    <RolesMatrix />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="compliance">
              <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Unsubscribe & Footer</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground">Preview what users see when they unsubscribe.</p>
                            <Button variant="secondary" onClick={() => setIsUnsubscribePreviewOpen(true)} disabled={!hasConfigureCompliancePermission}>
                                <Eye className="mr-2 h-4 w-4" /> Unsubscribe Page Preview
                            </Button>
                        </div>
                        <div className="space-y-2">
                             <Label>Footer Lines (read-only)</Label>
                             <div className="p-4 border rounded-lg bg-muted/50">
                                <p className="text-sm text-muted-foreground">{footerIdentity}</p>
                                <Button variant="link" size="sm" className="p-0 h-auto mt-2" onClick={() => handleTabChange("organization")}>
                                    <LinkIcon className="mr-2 h-3 w-3" /> Edit in Organization
                                </Button>
                             </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Intent Classification</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3 p-4 border rounded-lg">
                            <Label className="font-medium flex items-center gap-2">
                                <Bot className="h-5 w-5 text-primary" />
                                Classification Mode
                            </Label>
                            <RadioGroup defaultValue="rules-ml" disabled={!hasConfigureCompliancePermission}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="rules" id="rules" />
                                    <Label htmlFor="rules">Rules only</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="rules-ml" id="rules-ml" />
                                    <Label htmlFor="rules-ml">Rules + ML (recommended)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="rules-ml-llm" id="rules-ml-llm" />
                                    <Label htmlFor="rules-ml-llm">Rules + ML + LLM fallback</Label>
                                </div>
                            </RadioGroup>
                        </div>
                         <div className="flex items-center justify-between p-4 border rounded-lg">
                             <div className="flex items-center gap-2">
                                <div>
                                    <Label htmlFor="auto-suppress-negative" className="font-medium">Auto-suppress strong negative replies (≥0.90)</Label>
                                </div>
                            </div>
                            <Switch id="auto-suppress-negative" disabled={!hasConfigureCompliancePermission} />
                        </div>
                        <div className="space-y-2 p-4 border rounded-lg">
                            <Label className="font-medium">Negative Phrases</Label>
                            <div className="flex flex-wrap gap-2">
                                {negativePhrases.map(phrase => (
                                    <Badge key={phrase} variant="secondary">
                                        {phrase}
                                        <button
                                            onClick={() => handleRemoveNegativePhrase(phrase)}
                                            className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5"
                                            disabled={!hasConfigureCompliancePermission}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex gap-2 pt-2">
                                <Input
                                    value={newNegativePhrase}
                                    onChange={e => setNewNegativePhrase(e.target.value)}
                                    placeholder="Add phrase"
                                    disabled={!hasConfigureCompliancePermission}
                                />
                                <Button onClick={handleAddNegativePhrase} disabled={!hasConfigureCompliancePermission}>Add</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>


                 <Card>
                    <CardHeader>
                        <CardTitle>Suppression Policies</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="space-y-4 p-4 border rounded-lg">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="global-dnc" className="font-medium">Global DNC List</Label>
                                <div className="flex gap-2">
                                     <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div tabIndex={0} className={!hasConfigureCompliancePermission ? 'cursor-not-allowed' : ''}>
                                                    <Button variant="outline" size="sm" disabled={!hasConfigureCompliancePermission}><UploadCloud className="mr-2" /> Upload CSV</Button>
                                                </div>
                                            </TooltipTrigger>
                                            {!hasConfigureCompliancePermission && <TooltipContent><p>Admin/Analyst only</p></TooltipContent>}
                                        </Tooltip>
                                    </TooltipProvider>
                                    <Button variant="outline" size="sm" disabled={!hasConfigureCompliancePermission}>Export</Button>
                                </div>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Source</TableHead>
                                        <TableHead>Reason</TableHead>
                                        <TableHead>Added On</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dncList.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.source}</TableCell>
                                            <TableCell>{item.reason}</TableCell>
                                            <TableCell>{item.added}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        
                        <div className="space-y-4 p-4 border rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="in-conversation" className="font-medium">In-Conversation Suppression</Label>
                                    <p className="text-sm text-muted-foreground">Skip contacts currently in active human threads.</p>
                                </div>
                                <Switch id="in-conversation" defaultChecked disabled={!hasConfigureCompliancePermission} />
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <Label htmlFor="auto-lift">Auto-lift after</Label>
                                <Select defaultValue="14" disabled={!hasConfigureCompliancePermission}>
                                    <SelectTrigger id="auto-lift" className="w-[180px]">
                                        <SelectValue placeholder="Select a period" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="off">Off</SelectItem>
                                        <SelectItem value="7">7 days</SelectItem>
                                        <SelectItem value="14">14 days</SelectItem>
                                        <SelectItem value="30">30 days</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">
                                    If no human reply activity for this period, remove ‘In-Conversation’ flag.
                                </p>
                            </div>
                        </div>
                        
                        <div className="space-y-2 p-4 border rounded-lg">
                            <Label className="font-medium">Unsubscribe Keywords</Label>
                            <div className="flex flex-wrap gap-2">
                                {unsubscribeKeywords.map(keyword => (
                                    <Badge key={keyword} variant="secondary">
                                        {keyword}
                                        <button onClick={() => handleRemoveKeyword(keyword)} className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5" disabled={!hasConfigureCompliancePermission}>
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex gap-2 pt-2">
                                <Input value={newKeyword} onChange={e => setNewKeyword(e.target.value)} placeholder="Add keyword" disabled={!hasConfigureCompliancePermission}/>
                                <Button onClick={handleAddKeyword} disabled={!hasConfigureCompliancePermission}>Add</Button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                             <div className="flex items-center gap-2">
                                <div>
                                    <Label htmlFor="negative-intent" className="font-medium">Negative-Intent Auto-Suppress</Label>
                                    <p className="text-sm text-muted-foreground">Automatically add contacts with strong negative intent to the DNC list.</p>
                                </div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent side="top" align="start">
                                            <p className="max-w-xs">
                                                Uses reply classifier (keywords + model) to detect strong ‘no interest/stop’ replies and auto-add to DNC. You can override in Lead Triage.
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Switch id="negative-intent" disabled={!hasConfigureCompliancePermission}/>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Retention & Region</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3 p-4 border rounded-lg">
                            <Label className="font-medium">Region Mode</Label>
                            <RadioGroup defaultValue="us-only" disabled={!hasConfigureCompliancePermission}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="us-only" id="us-only" />
                                    <Label htmlFor="us-only">US-only</Label>
                                </div>
                                <p className="text-xs text-muted-foreground pl-6">Standard CAN-SPAM compliance rules apply.</p>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="eu-uk" id="eu-uk" />
                                    <Label htmlFor="eu-uk">EU/UK</Label>
                                </div>
                                 <p className="text-xs text-muted-foreground pl-6">Stricter GDPR and PECR rules apply. Legitimate Interest basis required.</p>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="canada" id="canada" />
                                    <Label htmlFor="canada">Canada</Label>
                                </div>
                                <p className="text-xs text-muted-foreground pl-6">CASL rules apply. Implied or express consent required.</p>
                            </RadioGroup>
                        </div>
                         <div className="space-y-4 p-4 border rounded-lg">
                             <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Label htmlFor="retention-replies" className="font-medium">Raw Replies Retention</Label>
                                    <span className="text-sm text-muted-foreground font-medium">{retentionReplies} days</span>
                                </div>
                                <Slider id="retention-replies" value={[retentionReplies]} onValueChange={(value) => setRetentionReplies(value[0])} max={365} min={30} step={15} disabled={!hasConfigureCompliancePermission}/>
                             </div>
                             <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Label htmlFor="retention-logs" className="font-medium">Logs Retention</Label>
                                    <span className="text-sm text-muted-foreground font-medium">{retentionLogs} days</span>
                                </div>
                                <Slider id="retention-logs" value={[retentionLogs]} onValueChange={(value) => setRetentionLogs(value[0])} max={365} min={30} step={30} disabled={!hasConfigureCompliancePermission}/>
                             </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Label htmlFor="retention-aggregates" className="font-medium">Aggregates Retention</Label>
                                    <span className="text-sm text-muted-foreground font-medium">{retentionAggregates} months</span>
                                </div>
                                <Slider id="retention-aggregates" value={[retentionAggregates]} onValueChange={(value) => setRetentionAggregates(value[0])} max={48} min={6} step={3} disabled={!hasConfigureCompliancePermission}/>
                             </div>
                        </div>
                    </CardContent>
                </Card>

                 <div className="flex justify-end">
                    <Button variant="accent" onClick={handleSaveCompliance} disabled={!hasConfigureCompliancePermission}>Save Compliance</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="integrations">
               <div className="space-y-6">
                {!areVerificationProvidersEnabled && (
                    <WarningBanner
                    title="Low Email Confidence"
                    message="No email verification provider (e.g., Hunter, Clearbit) is active. This may result in lower email confidence."
                    actions={[{ href: '/data-sources', text: 'Enable a Provider' }]}
                    />
                )}
                <Card>
                    <CardHeader>
                    <CardTitle>Integrations</CardTitle>
                    <CardDescription>
                        Manage your tools and API keys.
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {Object.entries({
                            apollo: 'Used for data enrichment and verification.',
                            clearbit: 'Used for data enrichment and verification.',
                            hunter: 'Used for data enrichment and verification.',
                        }).map(([id, description]) => (
                            <div key={id} className="space-y-4 p-4 border rounded-lg">
                                <div className="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                                    <Key className="h-6 w-6 text-primary flex-shrink-0" />
                                    <div className="flex-1">
                                        <Label htmlFor={`${id}-key`} className="font-medium capitalize">{id}</Label>
                                        <p className="text-xs text-muted-foreground">{description}</p>
                                    </div>
                                    <Badge variant={integrationStatuses[id] ? 'default' : 'secondary'} className={integrationStatuses[id] ? 'bg-green-100 text-green-800' : ''}>
                                        {integrationStatuses[id] ? 'Connected' : 'Not Connected'}
                                    </Badge>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`${id}-key`} className="text-xs font-medium text-muted-foreground">API Key</Label>
                                    <div className="flex items-center gap-2">
                                        <Input 
                                            id={`${id}-key`} 
                                            type={revealed[id] ? 'text' : 'password'} 
                                            defaultValue={revealed[id] ? 'sk_live_****demo****' : '••••••••••••••••••••'}
                                            readOnly
                                        />
                                        <Button variant="outline" size="icon" onClick={() => toggleReveal(id)}>
                                            {revealed[id] ? <EyeOff /> : <Eye />}
                                            <span className="sr-only">{revealed[id] ? 'Hide' : 'Reveal'} key</span>
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={() => rotateKey(id)}><RotateCw /><span className="sr-only">Rotate key</span></Button>
                                        <Button variant="destructive" size="icon" outline><Trash2 /><span className="sr-only">Delete key</span></Button>
                                        <Button variant="secondary" onClick={() => testConnection(id)} disabled={isTesting[id]}>
                                            {isTesting[id] ? 'Testing...' : 'Test'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                         <div key="mailgun" className="space-y-4 p-4 border rounded-lg">
                            <div className="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                                <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                                <div className="flex-1">
                                    <Label htmlFor="mailgun-key" className="font-medium capitalize">Mailgun</Label>
                                    <p className="text-xs text-muted-foreground">Used for sending emails and deliverability tracking.</p>
                                </div>
                                <Badge variant={integrationStatuses.mailgun ? 'default' : 'secondary'} className={integrationStatuses.mailgun ? 'bg-green-100 text-green-800' : ''}>
                                    {integrationStatuses.mailgun ? 'Connected' : 'Not Connected'}
                                </Badge>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Switch id="mailgun-sending" checked={integrationStatuses.mailgun} onCheckedChange={(checked) => testConnection('mailgun')} />
                                <Label htmlFor="mailgun-sending">Enable for Sending/Infra</Label>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="mailgun-key" className="text-xs font-medium text-muted-foreground">API Key</Label>
                                    <Input id="mailgun-key" type="password" defaultValue="••••••••••••••••••••" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mailgun-domain" className="text-xs font-medium text-muted-foreground">Sending Domain</Label>
                                    <Input id="mailgun-domain" defaultValue="mg.paragon-demo.io" />
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="mailgun-webhook" className="text-xs font-medium text-muted-foreground">Webhook Signing Key</Label>
                                    <Input id="mailgun-webhook" type="password" defaultValue="••••••••••••••••••••" />
                                </div>
                            </div>
                             <Button variant="secondary" onClick={() => testConnection('mailgun')} disabled={isTesting.mailgun}>
                                {isTesting.mailgun ? 'Testing...' : 'Test Connection'}
                            </Button>
                        </div>

                        <div key="sendgrid" className="space-y-4 p-4 border rounded-lg">
                            <div className="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                                <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                                <div className="flex-1">
                                    <Label htmlFor="sendgrid-key" className="font-medium capitalize">SendGrid</Label>
                                    <p className="text-xs text-muted-foreground">Used for sending emails and deliverability tracking.</p>
                                </div>
                                <Badge variant={integrationStatuses.sendgrid ? 'default' : 'secondary'} className={integrationStatuses.sendgrid ? 'bg-green-100 text-green-800' : ''}>
                                    {integrationStatuses.sendgrid ? 'Connected' : 'Not Connected'}
                                </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="sendgrid-sending" checked={integrationStatuses.sendgrid} onCheckedChange={(checked) => testConnection('sendgrid')} />
                                <Label htmlFor="sendgrid-sending">Enable for Sending/Infra</Label>
                            </div>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="sendgrid-key" className="text-xs font-medium text-muted-foreground">API Key</Label>
                                    <Input id="sendgrid-key" type="password" defaultValue="••••••••••••••••••••" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sendgrid-domain" className="text-xs font-medium text-muted-foreground">From Domain</Label>
                                    <Input id="sendgrid-domain" defaultValue="send.paragon-demo.io" />
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">Sends include correlation headers (campaign, sequence, contact) for precise event mapping.</p>
                            <Button variant="secondary" onClick={() => testConnection('sendgrid')} disabled={isTesting.sendgrid}>
                                {isTesting.sendgrid ? 'Testing...' : 'Test Connection'}
                            </Button>
                        </div>
                         {Object.entries({
                            'google-workspace': 'Connect your Google Workspace account to manage inboxes.',
                            'microsoft-365': 'Connect your Microsoft 365 account to manage inboxes.',
                        }).map(([id, description]) => (
                             <div key={id} className="space-y-4 p-4 border rounded-lg">
                                <div className="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                                    <Inbox className="h-6 w-6 text-primary flex-shrink-0" />
                                    <div className="flex-1">
                                        <Label className="font-medium capitalize">{id.replace('-', ' ')}</Label>
                                        <p className="text-xs text-muted-foreground">{description}</p>
                                    </div>
                                    <Badge variant={integrationStatuses[id] ? 'default' : 'secondary'} className={integrationStatuses[id] ? 'bg-green-100 text-green-800' : ''}>
                                        {integrationStatuses[id] ? 'Connected' : 'Not Connected'}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Scopes: send/read headers, webhooks for bounces.
                                </p>
                                <Button 
                                    variant={integrationStatuses[id] ? 'destructive' : 'default'} 
                                    onClick={() => handleOAuthConnect(id)}
                                >
                                    {integrationStatuses[id] ? 'Disconnect' : `Connect ${id.replace('-', ' ')}`}
                                </Button>
                            </div>
                        ))}
                        {Object.entries({
                            salesforce: 'Sync leads and contacts, push positive intent signals.',
                            hubspot: 'Sync leads and contacts, enroll in sequences.',
                        }).map(([id, description]) => (
                            <div key={id} className="space-y-4 p-4 border rounded-lg">
                                <div className="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                                    <Database className="h-6 w-6 text-primary flex-shrink-0" />
                                    <div className="flex-1">
                                        <Label className="font-medium capitalize">{id}</Label>
                                        <p className="text-xs text-muted-foreground">{description}</p>
                                    </div>
                                    <Badge variant={integrationStatuses[id] ? 'default' : 'secondary'} className={integrationStatuses[id] ? 'bg-green-100 text-green-800' : ''}>
                                        {integrationStatuses[id] ? 'Connected' : 'Not Connected'}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Switch id={`${id}-push`} disabled={!integrationStatuses[id]} />
                                        <Label htmlFor={`${id}-push`} className={!integrationStatuses[id] ? 'text-muted-foreground' : ''}>Enable Positive-Intent Push</Label>
                                    </div>
                                    <Link href="#">
                                        <Button variant="link" className="p-0 h-auto" disabled={!integrationStatuses[id]}>
                                            <FileText className="mr-2 h-4 w-4" /> Field Mapping
                                        </Button>
                                    </Link>
                                </div>
                                <Button 
                                    variant={integrationStatuses[id] ? 'destructive' : 'default'} 
                                    onClick={() => handleOAuthConnect(id)}
                                >
                                    {integrationStatuses[id] ? `Disconnect ${id.charAt(0).toUpperCase() + id.slice(1)}` : `Connect ${id.charAt(0).toUpperCase() + id.slice(1)}`}
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
               </div>
            </TabsContent>
        </div>
      </Tabs>
      <Dialog open={isUnsubscribePreviewOpen} onOpenChange={setIsUnsubscribePreviewOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Unsubscribe Page Preview</DialogTitle>
            <DialogDescription>
              This is what users will see when they unsubscribe from your communications.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-6">
            <div className="text-center p-8 border rounded-lg bg-muted/30">
              <h2 className="text-xl font-semibold">Unsubscribe Successful</h2>
              <p className="text-muted-foreground mt-2">
                You have been unsubscribed as of {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}.
              </p>
            </div>
            <Separator />
            <div className="text-xs text-muted-foreground space-y-2">
                <p>
                    {footerIdentity.replace('{{org_name}}', orgName).replace('{{legal_name}}', 'Paragon Intelligence, Inc.')}
                </p>
                <p>
                    If you have any questions or wish to resubscribe, please contact our support team at{' '}
                    <a href={`mailto:${supportEmail}`} className="underline text-primary">{supportEmail}</a>.
                </p>
                 <p>&copy; {new Date().getFullYear()} {orgName}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
                setIsUnsubscribePreviewOpen(false);
                handleTabChange("compliance");
            }}>
              Go to Compliance
            </Button>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
    
