
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
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Loader2, Mail, Shield, Server } from 'lucide-react';
import { Separator } from './ui/separator';

interface SeedInboxTestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTestComplete: () => void;
}

type TestResult = {
  authResults: {
    spf: 'pass' | 'fail';
    dkim: 'pass' | 'fail';
    dmarc: 'pass' | 'fail';
  };
  receivedFrom: string;
  placement: 'Inbox' | 'Spam';
};

export function SeedInboxTestDialog({
  open,
  onOpenChange,
  onTestComplete,
}: SeedInboxTestDialogProps) {
  const [step, setStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  const reset = () => {
    setStep(1);
    setIsSending(false);
    setResult(null);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
    }
    onOpenChange(isOpen);
  };

  const handleSendTest = () => {
    setIsSending(true);
    setTimeout(() => {
      const newResult: TestResult = {
        authResults: {
          spf: Math.random() > 0.2 ? 'pass' : 'fail',
          dkim: Math.random() > 0.1 ? 'pass' : 'fail',
          dmarc: Math.random() > 0.1 ? 'pass' : 'fail',
        },
        receivedFrom: 'mailgun.org',
        placement: Math.random() > 0.15 ? 'Inbox' : 'Spam',
      };
      setResult(newResult);
      setIsSending(false);
      setStep(2);
      onTestComplete();
    }, 2000);
  };

  const getStatusIcon = (status: 'pass' | 'fail') => {
    if (status === 'pass') return <CheckCircle className="h-4 w-4 text-green-500" />;
    return <AlertCircle className="h-4 w-4 text-red-500" />;
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? 'Send Test to Seed Inbox' : 'Test Results'}
          </DialogTitle>
          <DialogDescription>
            {step === 1
              ? 'This will send a test email to our seed inbox to check deliverability.'
              : 'Here are the results from the seed inbox test.'}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="test-address">Test Address</Label>
              <Input
                id="test-address"
                readOnly
                value="placement-test@paragon-demo.io"
              />
            </div>
          </div>
        )}

        {step === 2 && result && (
          <div className="space-y-6 py-4">
            <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Placement
                </h4>
                <div className="flex items-center gap-2 pl-7">
                    <span className="font-medium">Placement Guess:</span>
                    <Badge variant={result.placement === 'Inbox' ? 'default' : 'destructive'} className={result.placement === 'Inbox' ? 'bg-green-100 text-green-800' : ''}>
                        {result.placement}
                    </Badge>
                </div>
            </div>

            <Separator />
            
            <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Authentication-Results
                </h4>
                <div className="space-y-2 pl-7">
                    <div className="flex items-center gap-2">
                        {getStatusIcon(result.authResults.spf)}
                        <span>SPF: {result.authResults.spf}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        {getStatusIcon(result.authResults.dkim)}
                        <span>DKIM: {result.authResults.dkim}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        {getStatusIcon(result.authResults.dmarc)}
                        <span>DMARC: {result.authResults.dmarc}</span>
                    </div>
                </div>
            </div>

             <Separator />

             <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    Provider
                </h4>
                <div className="flex items-center gap-2 pl-7">
                    <span className="font-medium">Received-From:</span>
                    <span className="text-muted-foreground">{result.receivedFrom}</span>
                </div>
             </div>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={step === 1 ? 'outline' : 'default'} onClick={reset}>
              {step === 1 ? 'Cancel' : 'Close'}
            </Button>
          </DialogClose>
          {step === 1 && (
            <Button onClick={handleSendTest} disabled={isSending}>
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send'
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
