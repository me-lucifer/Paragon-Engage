
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
import {
  Mail,
  Timer,
  GitBranch,
  AlertTriangle,
  PlayCircle,
  Eye,
  XCircle,
  Clock,
  PlusCircle,
  Trash2,
  Settings2,
  ThumbsUp,
  ThumbsDown,
  MoveRight,
  CalendarCheck,
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const sequenceSteps = [
  {
    type: 'email',
    title: 'Step 1: Cold Intro Email',
    icon: <Mail className="h-5 w-5 text-primary" />,
    details: 'Template: "PE Intro v1"',
  },
  {
    type: 'wait',
    title: 'Wait 2 Business Days',
    icon: <Timer className="h-5 w-5 text-gray-500" />,
    details: 'Excludes weekends',
  },
  {
    type: 'email',
    title: 'Step 2: Follow-up Email',
    icon: <Mail className="h-5 w-5 text-primary" />,
    details: 'Template: "PE Follow-up v1"',
  },
  {
    type: 'branch',
    title: 'Branch: On Positive Reply',
    icon: <GitBranch className="h-5 w-5 text-purple-500" />,
    branches: [
      {
        status: 'Positive Intent Detected',
        icon: <ThumbsUp className="h-4 w-4 text-green-500" />,
        nested: [
          {
            type: 'email',
            title: 'Auto-reply with scheduling link',
            icon: <CalendarCheck className="h-5 w-5 text-primary" />,
            details: 'Snippet: "Calendar link"',
          },
          {
            type: 'action',
            title: 'Move to Triage: Convert to Meeting',
            icon: <MoveRight className="h-5 w-5 text-gray-500" />,
            details: 'Tag: "PE positive"',
          },
        ],
      },
      {
        status: 'Objection Detected ("have team", "covered")',
        icon: <ThumbsDown className="h-4 w-4 text-yellow-500" />,
        nested: [
          {
            type: 'email',
            title: 'Reply to Objection',
            icon: <Mail className="h-5 w-5 text-primary" />,
            details: 'Template: "PE Objection: already have sourcing team"',
          },
        ],
      },
    ],
  },
   {
    type: 'wait',
    title: 'Wait 3 Business Days',
    icon: <Timer className="h-5 w-5 text-gray-500" />,
    details: 'Excludes weekends',
  },
  {
    type: 'email',
    title: 'Step 3: Quick Bump',
    icon: <Mail className="h-5 w-5 text-primary" />,
    details: 'Template: "PE Bump v1"',
  },
  {
    type: 'branch',
    title: 'Fail-safe: No Response',
    icon: <GitBranch className="h-5 w-5 text-purple-500" />,
    branches: [
      {
        status: 'No Engagement',
        icon: <XCircle className="h-4 w-4 text-gray-500" />,
        nested: [
          {
            type: 'email',
            title: 'Step 4: Breakup Email',
            icon: <Mail className="h-5 w-5 text-primary" />,
            details: 'Template: "PE Breakup v1"',
          },
          {
            type: 'action',
            title: 'Apply Cooling Period',
            icon: <Clock className="h-5 w-5 text-gray-500" />,
            details: '60 days',
          },
        ],
      },
    ],
  },
];


interface SequenceEditorSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: {
    name: string;
    sequenceName: string;
  };
}

export default function SequenceEditorSheet({
  open,
  onOpenChange,
  campaign,
}: SequenceEditorSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-4xl w-full p-0">
        <div className="h-full flex flex-col">
          <SheetHeader className="p-6">
            <SheetTitle>Edit Sequence</SheetTitle>
            <SheetDescription>
              Editing sequence for campaign: "{campaign.name}"
            </SheetDescription>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-muted/30">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Main Sequence Flow */}
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sequence: "{campaign.sequenceName}"</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {sequenceSteps.map((step, index) => (
                      <div key={index}>
                        <div className="flex items-start gap-4 group p-2 rounded-md hover:bg-background">
                          <div className="flex-none h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                            {step.icon}
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-semibold">{step.title}</h4>
                            {step.details && <p className="text-sm text-muted-foreground">{step.details}</p>}
                            {step.branches && (
                              <div className="space-y-2 mt-2">
                                {step.branches.map((branch, bIndex) => (
                                  <div key={bIndex} className="pl-4 border-l-2 border-dashed border-gray-300 dark:border-gray-700">
                                    <Badge variant="outline" className="flex items-center gap-1.5 w-fit">
                                      {branch.icon}
                                      {branch.status}
                                    </Badge>
                                    {branch.nested && (
                                      <div className="mt-2 space-y-2">
                                        {branch.nested.map((nestedStep, nIndex) => (
                                          <div key={nIndex} className="flex items-start gap-4 group p-2 rounded-md hover:bg-background/80">
                                            <div className="flex-none h-10 w-10 bg-muted/50 rounded-full flex items-center justify-center">
                                              {nestedStep.icon}
                                            </div>
                                            <div className="flex-grow">
                                              <h4 className="font-semibold">{nestedStep.title}</h4>
                                              {nestedStep.details && <p className="text-sm text-muted-foreground">{nestedStep.details}</p>}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <Button size="icon" variant="ghost"><Settings2 className="h-4 w-4" /></Button>
                            <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </div>
                        {index < sequenceSteps.length - 1 && <div className="ml-5 h-8 w-px bg-border my-1" />}
                      </div>
                    ))}
                    <Button variant="secondary" className="w-full mt-4">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Step
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Settings and Preview */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sequence Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="send-window">Send Window</Label>
                      <Select defaultValue="biz-hours">
                        <SelectTrigger id="send-window">
                          <SelectValue placeholder="Business hours (recipient timezone)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="biz-hours">Business hours (recipient timezone)</SelectItem>
                          <SelectItem value="any-time">Any time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-per-domain">Daily Send Cap</Label>
                      <Input id="max-per-domain" type="number" placeholder="e.g., 300" defaultValue="1800" />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <Label htmlFor="pause-alert" className="font-medium">Pause on Domain Alert</Label>
                      <Switch id="pause-alert" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <SheetFooter className="p-6 border-t bg-background">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button>Save Sequence</Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
