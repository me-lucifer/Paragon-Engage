
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Timer,
  GitBranch,
  AlertTriangle,
  PlayCircle,
  Eye,
  MessageCircle,
  CheckCircle,
  XCircle,
  Clock,
  PlusCircle,
  Trash2,
  Settings2,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const sequenceSteps = [
  {
    type: 'email',
    title: 'Step 1: Cold Intro Email',
    icon: <Mail className="h-5 w-5 text-primary" />,
    details: 'Template: "Cold Intro" v1',
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
    details: 'Template: "Follow-up" v2',
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
    details: 'Template: "Quick Bump"',
  },
  {
    type: 'branch',
    title: 'Branch on Reply',
    icon: <GitBranch className="h-5 w-5 text-purple-500" />,
    branches: [
      { status: 'Replied', icon: <MessageCircle className="h-4 w-4 text-blue-500" /> },
      { status: 'Positive', icon: <CheckCircle className="h-4 w-4 text-green-500" /> },
      { status: 'Negative', icon: <XCircle className="h-4 w-4 text-red-500" /> },
      { status: 'No Response', icon: <Clock className="h-4 w-4 text-gray-500" /> },
    ],
  },
];

export default function SequenceEditorPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Sequence Editor
          </h1>
          <p className="text-muted-foreground">
            Design and configure your multi-step outreach sequences.
          </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" /> Preview
            </Button>
            <Button className="bg-primary text-primary-foreground">
                Save Sequence
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Sequence Flow */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
                <CardTitle>Sequence: "High-Growth Tech Outreach"</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {sequenceSteps.map((step, index) => (
                <div key={index}>
                    <div className="flex items-center gap-4 group">
                        <div className="flex-none h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                            {step.icon}
                        </div>
                        <div className="flex-grow">
                            <h4 className="font-semibold">{step.title}</h4>
                            {step.details && <p className="text-sm text-muted-foreground">{step.details}</p>}
                            {step.branches && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {step.branches.map(branch => (
                                        <Badge key={branch.status} variant="outline" className="flex items-center gap-1.5">
                                            {branch.icon}
                                            {branch.status}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                         <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <Button size="icon" variant="ghost"><Settings2 className="h-4 w-4" /></Button>
                            <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                    </div>
                     {index < sequenceSteps.length -1 && <div className="ml-5 h-8 w-px bg-border my-1" />}
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
                <Select>
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
                <Label htmlFor="max-per-domain">Max Contacts per Domain/Day</Label>
                <Input id="max-per-domain" type="number" placeholder="e.g., 5" />
              </div>
               <div className="flex items-center justify-between rounded-lg border p-3">
                    <Label htmlFor="pause-alert" className="font-medium">Pause on Domain Alert</Label>
                    <Switch id="pause-alert" defaultChecked />
                </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle>Preview & Linter</CardTitle>
            </CardHeader>
             <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="test-contact">Test Contact</Label>
                    <Input id="test-contact" placeholder="Enter test email address..." />
                </div>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <PlayCircle className="mr-2 h-4 w-4" /> Run Preview
                </Button>
                 <Separator />
                <div className="space-y-2">
                     <div className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        <span className="font-medium">Spam Word Linter</span>
                    </div>
                    <p className="text-xs text-muted-foreground">"free", "guarantee", "risk-free"</p>
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
