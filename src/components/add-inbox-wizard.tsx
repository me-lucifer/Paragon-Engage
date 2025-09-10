
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { GoogleIcon, MicrosoftIcon } from '@/components/ui/icons';
import { Switch } from './ui/switch';
import type { Inbox } from '@/app/(app)/inbox-manager/page';
import { Separator } from './ui/separator';

interface AddInboxWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddInbox: (newInbox: Omit<Inbox, 'dailyCapUsed' | 'status' | 'health'>) => void;
  inboxes: Omit<Inbox, 'dailyCapUsed' | 'status' | 'health' | 'healthFactors'>[]
}

type Provider = 'google' | 'microsoft' | 'smtp';

export default function AddInboxWizard({ open, onOpenChange, onAddInbox, inboxes }: AddInboxWizardProps) {
  const [step, setStep] = useState(1);
  const [provider, setProvider] = useState<Provider | null>(null);

  const reset = () => {
    setStep(1);
    setProvider(null);
  };
  
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
    }
    onOpenChange(isOpen);
  };
  
  const handleNextStep = () => {
      setStep(s => s + 1);
  }
  
  const handleFinish = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const fromName = formData.get('fromName') as string || 'New User';
      const email = formData.get('email') as string || `new-user@${provider}.com`;
      const domain = email.split('@')[1];
      const providerName = provider === 'google' ? 'Google Workspace' : provider === 'microsoft' ? 'Microsoft 365' : 'IMAP/SMTP';
      
      const newInbox: Omit<Inbox, 'dailyCapUsed' | 'status' | 'health'> = {
          email,
          domain,
          provider: providerName,
          fromName,
          signature: `Best,\n${fromName}`,
          warmup: {
              enabled: true,
              schedule: 'conservative',
          },
          dailySendCap: 20,
          healthFactors: { auth: 30, bounce: 20, spam: 15, warmup: 0, errors: 5 }, // 70
      };

      onAddInbox(newInbox);
      reset();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add New Inbox</DialogTitle>
          <DialogDescription>
            Step {step} of 3: {
                step === 1 ? 'Choose your provider' :
                step === 2 ? 'Connect your account' :
                'Configure warm-up settings'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleFinish}>
            <div className="py-4 space-y-6">
            {step === 1 && (
                <RadioGroup onValueChange={(value: Provider) => setProvider(value)}>
                    <Label htmlFor="google" className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted">
                        <div className="flex items-center gap-3">
                            <GoogleIcon className="h-6 w-6" />
                            <span>Google Workspace (OAuth)</span>
                        </div>
                        <RadioGroupItem value="google" id="google" />
                    </Label>
                     <Label htmlFor="microsoft" className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted">
                        <div className="flex items-center gap-3">
                            <MicrosoftIcon className="h-6 w-6" />
                            <span>Microsoft 365 (OAuth)</span>
                        </div>
                        <RadioGroupItem value="microsoft" id="microsoft" />
                    </Label>
                     <Label htmlFor="smtp" className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted">
                        <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-muted-foreground"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>
                            <span>IMAP/SMTP (manual)</span>
                        </div>
                        <RadioGroupItem value="smtp" id="smtp" />
                    </Label>
                </RadioGroup>
            )}

            {step === 2 && provider === 'smtp' && (
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                        <Label htmlFor="fromName">From Name</Label>
                        <Input id="fromName" name="fromName" placeholder="John Doe" />
                    </div>
                     <div className="space-y-2 col-span-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" placeholder="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="smtp-host">SMTP Host</Label>
                        <Input id="smtp-host" placeholder="smtp.example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="smtp-port">Port</Label>
                        <Input id="smtp-port" placeholder="587" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="smtp-user">Username</Label>
                        <Input id="smtp-user" placeholder="your-username" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="smtp-pass">Password</Label>
                        <Input id="smtp-pass" type="password" />
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                        <Switch id="smtp-tls" defaultChecked />
                        <Label htmlFor="smtp-tls">Use TLS</Label>
                    </div>
                </div>
            )}
            
            {step === 2 && (provider === 'google' || provider === 'microsoft') && (
                 <div className="text-center py-8">
                    <p className="mb-4">Click below to connect your account securely.</p>
                    <Button type="button" onClick={handleNextStep}>
                        {provider === 'google' ? <GoogleIcon className="mr-2" /> : <MicrosoftIcon className="mr-2" />}
                        Connect {provider === 'google' ? 'Google Workspace' : 'Microsoft 365'}
                    </Button>
                 </div>
            )}

            {step === 3 && (
                 <div className="space-y-6">
                    <input type="hidden" name="email" value={provider === 'google' ? 'sales.ops@paragon.com' : 'sales.ops@paragon.onmicrosoft.com'} />
                    <input type="hidden" name="fromName" value="Sales Ops" />

                    <div className="space-y-2">
                        <Label htmlFor="warmup-schedule">Warm-up Schedule</Label>
                        <Select defaultValue="conservative">
                            <SelectTrigger id="warmup-schedule">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="conservative">Conservative</SelectItem>
                                <SelectItem value="balanced">Balanced</SelectItem>
                                <SelectItem value="aggressive">Aggressive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="daily-cap">Initial Daily Send Cap</Label>
                        <Input id="daily-cap" defaultValue="20" readOnly />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                        <Label htmlFor="send-window">Business hours by recipient timezone</Label>
                        <Switch id="send-window" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                        <Label htmlFor="delay-jitter">Random Delay Jitter (±20%)</Label>
                        <Switch id="delay-jitter" defaultChecked />
                    </div>
                 </div>
            )}
            </div>

            <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            {step < 3 ? (
                <Button type="button" onClick={handleNextStep} disabled={!provider || step === 2}>
                    Next
                </Button>
            ) : (
                <Button type="submit">
                    Finish
                </Button>
            )}
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
