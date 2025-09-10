
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { HelpCircle, Info, Copy, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from './ui/tooltip';
import { useIntegrationStatus } from '@/hooks/use-integration-status';
import { useToast } from '@/hooks/use-toast';

const initialIntegrationStates = {
    mailgun: true,
    sendgrid: false,
};

type VerificationStatus = 'pending' | 'passing' | 'fail';

export function DnsSetupHelper() {
    const [domain, setDomain] = useState('paragon-demo.io');
    const [subdomain, setSubdomain] = useState(`engage.${domain}`);
    const [dmarcPolicy, setDmarcPolicy] = useState('warmup');
    const [verificationStatus, setVerificationStatus] = useState<Record<string, VerificationStatus>>({
        spf: 'pending',
        dkim: 'pending',
        dmarc: 'pending',
    });
    const [isVerifying, setIsVerifying] = useState(false);
    const { statuses: integrationStatuses } = useIntegrationStatus(initialIntegrationStates);
    const { toast } = useToast();

    const handleDomainChange = (newDomain: string) => {
        setDomain(newDomain);
        setSubdomain(`engage.${newDomain}`);
    };
    
    const handleSubdomainChipClick = (prefix: string) => {
        setSubdomain(`${prefix}.${domain}`);
    };

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to clipboard",
            description: text,
        });
    };
    
    const handleVerify = () => {
        setIsVerifying(true);
        setTimeout(() => {
            setVerificationStatus({
                spf: Math.random() > 0.3 ? 'passing' : 'fail',
                dkim: Math.random() > 0.3 ? 'passing' : 'fail',
                dmarc: Math.random() > 0.3 ? 'passing' : 'fail',
            });
            setIsVerifying(false);
        }, 1500);
    };

    const dmarcValues: Record<string, string> = {
        warmup: `v=DMARC1; p=none; rua=mailto:dmarc@${domain}; fo=1; pct=100`,
        partial: `v=DMARC1; p=quarantine; pct=25; rua=mailto:dmarc@${domain}; fo=1`,
        full: `v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc@${domain}; fo=1`,
        mature: `v=DMARC1; p=reject; pct=100; rua=mailto:dmarc@${domain}; fo=1`,
    };

    const getStatusIcon = (status: VerificationStatus) => {
        if (status === 'passing') return <CheckCircle className="h-4 w-4 text-green-500" />;
        if (status === 'fail') return <AlertCircle className="h-4 w-4 text-red-500" />;
        return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />;
    };
    
    return (
        <Card className="sticky top-20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    DNS Setup Helper
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">SPF, DKIM, and DMARC are DNS records you publish at your DNS provider (e.g., Cloudflare, GoDaddy).</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="sending-domain">Sending Domain</Label>
                    <Select value={domain} onValueChange={handleDomainChange}>
                        <SelectTrigger id="sending-domain">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="paragon-demo.io">paragon-demo.io</SelectItem>
                            <SelectItem value="example.com">example.com</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="subdomain">Subdomain</Label>
                    <div className="flex gap-2 mb-2">
                        <Badge variant="outline" className="cursor-pointer" onClick={() => handleSubdomainChipClick('engage')}>engage.{domain}</Badge>
                        <Badge variant="outline" className="cursor-pointer" onClick={() => handleSubdomainChipClick('outreach')}>outreach.{domain}</Badge>
                    </div>
                    <Input id="subdomain" value={subdomain} onChange={(e) => setSubdomain(e.target.value)} />
                </div>
                
                <div className="space-y-4 pt-2">
                    {/* SPF */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label className="font-semibold">1. SPF (TXT)</Label>
                            <div className="flex items-center gap-2">
                               {isVerifying ? getStatusIcon('pending') : getStatusIcon(verificationStatus.spf)}
                            </div>
                        </div>
                        <div className="p-3 border rounded-md space-y-2 bg-muted/30">
                            <p className="text-xs text-muted-foreground">Name: {subdomain}</p>
                            {integrationStatuses.mailgun && (
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-mono bg-muted p-1 rounded-sm">v=spf1 include:mailgun.org -all</p>
                                    <Button size="sm" variant="ghost" onClick={() => handleCopyToClipboard('v=spf1 include:mailgun.org -all')}><Copy className="h-3 w-3" /></Button>
                                </div>
                            )}
                            {integrationStatuses.sendgrid && (
                                 <div className="flex items-center justify-between">
                                    <p className="text-xs font-mono bg-muted p-1 rounded-sm">v=spf1 include:sendgrid.net -all</p>
                                    <Button size="sm" variant="ghost" onClick={() => handleCopyToClipboard('v=spf1 include:sendgrid.net -all')}><Copy className="h-3 w-3" /></Button>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* DKIM */}
                    <div className="space-y-2">
                       <div className="flex items-center justify-between">
                            <Label className="font-semibold">2. DKIM (TXT)</Label>
                            <div className="flex items-center gap-2">
                               {isVerifying ? getStatusIcon('pending') : getStatusIcon(verificationStatus.dkim)}
                            </div>
                        </div>
                        <div className="p-3 border rounded-md space-y-2 bg-muted/30">
                            {integrationStatuses.mailgun && (
                                <>
                                    <p className="text-xs text-muted-foreground">Name: s1._domainkey.{subdomain}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-mono bg-muted p-1 rounded-sm truncate">v=DKIM1; k=rsa; p=MIIBIjANBgkqh...</p>
                                        <Button size="sm" variant="ghost" onClick={() => handleCopyToClipboard('v=DKIM1; k=rsa; p=MIIBIjANBgkqh...IDAQAB')}><Copy className="h-3 w-3" /></Button>
                                    </div>
                                </>
                            )}
                             {integrationStatuses.sendgrid && (
                                 <>
                                    <p className="text-xs text-muted-foreground mt-2">Name: s2._domainkey.{subdomain}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-mono bg-muted p-1 rounded-sm truncate">v=DKIM1; k=rsa; p=MIIBIjANBgkqh...</p>
                                        <Button size="sm" variant="ghost" onClick={() => handleCopyToClipboard('v=DKIM1; k=rsa; p=MIIBIjANBgkqh...IDAQAB')}><Copy className="h-3 w-3" /></Button>
                                    </div>
                                 </>
                            )}
                        </div>
                    </div>

                    {/* DMARC */}
                    <div className="space-y-2">
                       <div className="flex items-center justify-between">
                            <Label className="font-semibold">3. DMARC (TXT)</Label>
                            <div className="flex items-center gap-2">
                               {isVerifying ? getStatusIcon('pending') : getStatusIcon(verificationStatus.dmarc)}
                            </div>
                        </div>
                        <div className="p-3 border rounded-md space-y-2 bg-muted/30">
                             <p className="text-xs text-muted-foreground">Name: _dmarc.{subdomain}</p>
                             <RadioGroup value={dmarcPolicy} onValueChange={setDmarcPolicy} className="gap-3 pt-1">
                                {Object.entries({
                                    'Warm-up': 'warmup',
                                    'Enforce (partial)': 'partial',
                                    'Enforce (full)': 'full',
                                    'Mature': 'mature'
                                }).map(([label, value]) => (
                                    <div key={value} className="flex items-center justify-between">
                                        <Label htmlFor={`dmarc-${value}`} className="flex items-center gap-2 text-xs cursor-pointer">
                                            <RadioGroupItem value={value} id={`dmarc-${value}`} />
                                            {label}
                                        </Label>
                                        {dmarcPolicy === value && <Button size="sm" variant="ghost" onClick={() => handleCopyToClipboard(dmarcValues[value])}><Copy className="h-3 w-3" /></Button>}
                                    </div>
                                ))}
                             </RadioGroup>
                        </div>
                    </div>
                </div>

                <Button className="w-full" onClick={handleVerify} disabled={isVerifying}>
                    {isVerifying ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...</> : 'Verify DNS'}
                </Button>
                
                <Separator />

                <div className="space-y-1 text-xs text-muted-foreground">
                    <p>• Publish at your DNS (Cloudflare/Route53/etc.). App does not change DNS.</p>
                    <p>• DMARC policy can be tightened later—start with p=none during warm-up.</p>
                </div>
            </CardContent>
        </Card>
    );
}
