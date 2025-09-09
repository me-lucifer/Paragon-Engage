
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Users, Target, PenSquare, Filter, Share2, ArrowRight, X } from 'lucide-react';
import { Separator } from './ui/separator';

const walkthroughSteps = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Step 1: Define Your Audience in Segments',
    description: 'Start by creating target audience segments based on firmographics, roles, and other signals.',
    href: '/segments',
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: 'Step 2: Score Your Ideal Customers',
    description: 'Use Fit Scoring to create models that rank companies against your ideal customer profile.',
    href: '/fit-scoring',
  },
  {
    icon: <PenSquare className="h-8 w-8 text-primary" />,
    title: 'Step 3: Launch Your Outreach Campaigns',
    description: 'Design and launch multi-touchpoint campaigns in the Campaign Studio to engage your segments.',
    href: '/campaign-studio',
  },
  {
    icon: <Filter className="h-8 w-8 text-primary" />,
    title: 'Step 4: Triage Incoming Leads',
    description: 'Review, qualify, and take action on incoming leads from your campaigns in the Lead Triage queue.',
    href: '/leads',
  },
  {
    icon: <Share2 className="h-8 w-8 text-primary" />,
    title: 'Step 5: Grow with Referrals',
    description: 'Leverage the Referral Hub to track and manage your customer referral program.',
    href: '/referral-hub',
  },
];

interface DemoWalkthroughProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DemoWalkthrough({ open, onOpenChange }: DemoWalkthroughProps) {
  const router = useRouter();

  const handleGoThere = (href: string) => {
    router.push(href);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Welcome to Paragon Engage!</DialogTitle>
          <DialogDescription>
            Here's a quick tour of the key features to get you started.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {walkthroughSteps.map((step, index) => (
            <div key={step.title} className="flex items-center gap-4">
              <div className="flex-shrink-0">{step.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              <Button size="sm" onClick={() => handleGoThere(step.href)}>
                Go there <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Explore on My Own
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
