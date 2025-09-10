
'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Globe, Rss, Briefcase, Check, X, Flag, HelpCircle, BarChart } from 'lucide-react';
import type { Company } from '@/app/(app)/market-mapping/page';

interface CompanyDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  company: Company | null;
}

const mockEvidence = [
    { source: 'Company Website', type: 'Firmographics', icon: <Globe className="h-4 w-4" />, details: 'Confirmed industry and location.'},
    { source: 'News Article', type: 'Trigger Event', icon: <Rss className="h-4 w-4" />, details: 'Mentioned in recent industry publication.'},
    { source: 'Directory', type: 'Contact', icon: <Briefcase className="h-4 w-4" />, details: 'Owner contact info found.'},
];

export function CompanyDetailsDrawer({
  open,
  onOpenChange,
  company,
}: CompanyDetailsDrawerProps) {
  if (!company) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-full">
        <SheetHeader>
          <SheetTitle>{company.name}</SheetTitle>
          <SheetDescription>
            {company.industry} • {company.hqRegion} • {company.fteBand} FTE
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Evidence</h4>
            <ul className="space-y-3">
                {mockEvidence.slice(0, company.signals).map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            {item.icon}
                        </div>
                        <div>
                            <p className="font-medium text-sm">{item.source}</p>
                            <p className="text-xs text-muted-foreground">{item.details}</p>
                        </div>
                    </li>
                ))}
            </ul>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Why {company.confidence}% confidence?
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>High-quality firmographic data source.</li>
                <li>Owner information verified via 2+ sources.</li>
                <li>Website content strongly matches industry keywords.</li>
                {company.confidence < 80 && <li>Ownership structure is inferred, not confirmed.</li>}
            </ul>
          </div>
        </div>
        <SheetFooter className="gap-2">
          <Button variant="outline"><Flag className="mr-2 h-4 w-4" /> Flag for Review</Button>
          <Button variant="destructive"><X className="mr-2 h-4 w-4" /> Exclude</Button>
          <Button variant="default"><Check className="mr-2 h-4 w-4" /> Approve to Universe</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

