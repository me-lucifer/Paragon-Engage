
'use client';

import { useState } from 'react';
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
import { Building, Eye, Shield, Users, Database, Mail, FileText, Globe } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { RolesMatrix } from '@/components/roles-matrix';

export default function SettingsPage() {
    const { toast } = useToast();
    const [orgName, setOrgName] = useState("Paragon Engage Demo");
    const [supportEmail, setSupportEmail] = useState("support@paragon-demo.io");
    const [footerIdentity, setFooterIdentity] = useState("You’re receiving this business outreach from {{org_name}} ({{legal_name}}). To stop further emails, use the unsubscribe link below.");
    const [orgNameError, setOrgNameError] = useState("");
    const [supportEmailError, setSupportEmailError] = useState("");
    const [activeTab, setActiveTab] = useState("organization");
    const [isUnsubscribePreviewOpen, setIsUnsubscribePreviewOpen] = useState(false);

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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col md:flex-row gap-6">
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
                                <Input id="primary-domain" placeholder="paragonintel.com" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="timezone">Default Timezone*</Label>
                                <Select defaultValue="ist">
                                    <SelectTrigger id="timezone">
                                        <SelectValue placeholder="Select a timezone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="est">EST (UTC-5)</SelectItem>
                                        <SelectItem value="pst">PST (UTC-8)</SelectItem>
                                        <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
                                        <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="locale">Default Locale</Label>
                                <Select defaultValue="en-us">
                                    <SelectTrigger id="locale">
                                        <SelectValue placeholder="Select a locale" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en-us">en-US</SelectItem>
                                        <SelectItem value="en-gb">en-GB</SelectItem>
                                        <SelectItem value="fr-fr">fr-FR</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="currency">Default Currency</Label>
                                <Select defaultValue="usd">
                                    <SelectTrigger id="currency">
                                        <SelectValue placeholder="Select a currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="usd">USD</SelectItem>
                                        <SelectItem value="eur">EUR</SelectItem>
                                        <SelectItem value="inr">INR</SelectItem>
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
                        <Button onClick={handleSaveChanges}>Save Changes</Button>
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
              <Card>
                <CardHeader>
                  <CardTitle>Compliance</CardTitle>
                  <CardDescription>
                    Manage compliance and data governance settings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Compliance settings will be configured here.</p>
                </CardContent>
              </Card>
            </TabsContent>

             <TabsContent value="integrations">
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>
                    Connect your tools and manage API keys.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Globe className="h-6 w-6 text-primary" />
                            <Label htmlFor="apollo-key" className="flex-1 font-medium">Apollo.io</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Input id="apollo-key" type="password" defaultValue="fadshgkuuasdhfgaskdfj" />
                            <Button variant="outline">Test</Button>
                        </div>
                    </div>
                     <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Globe className="h-6 w-6 text-primary" />
                            <Label htmlFor="clearbit-key" className="flex-1 font-medium">Clearbit</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Input id="clearbit-key" type="password" defaultValue="qweriuopqweurioasdfh" />
                            <Button variant="outline">Test</Button>
                        </div>
                    </div>
                </CardContent>
              </Card>
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
                setActiveTab("compliance");
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
    
