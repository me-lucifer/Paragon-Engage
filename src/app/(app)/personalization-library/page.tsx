
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Folder,
  Copy,
  PenSquare,
  Trash2,
  PlusCircle,
  Library,
  ChevronRight,
  ClipboardList
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const personalizationData = {
  tokens: [
    { token: '{{first_name}}', description: 'Contact\'s first name' },
    { token: '{{company}}', description: 'Contact\'s company name' },
    { token: '{{role}}', description: 'Contact\'s job title' },
    { token: '{{industry}}', description: 'Company\'s industry' },
    { token: '{{recent_news}}', description: 'Recent news about the company' },
    { token: '{{education_affinity}}', description: 'Shared educational background' },
    { token: '{{mutual_topic}}', description: 'A topic of mutual interest' },
    { token: '{{fit_reason}}', description: 'Why they are a good fit' },
  ],
  segments: [
    {
      id: 'accounting',
      name: 'Accounting (CPAs)',
      icon: <Library className="h-5 w-5" />,
      templates: [
        {
          id: 'intro',
          name: 'Cold Intro',
          variants: [
            { id: 'v1', content: `Hi {{first_name}},\n\nReaching out because we help accounting firms like {{company}} streamline their client onboarding. Thought you might be interested.\n\nOpen to a brief chat next week?` },
            { id: 'v2', content: `{{first_name}} - Your firm {{company}} stands out. We have a unique approach to {{fit_reason}} for CPAs.\n\nWorth a look?` },
          ],
        },
        {
          id: 'tax-season',
          name: 'Tax Season Angle',
          variants: [
            { id: 'v1', content: `Hi {{first_name}},\n\nAs tax season approaches, I imagine efficiency is top of mind at {{company}}. Our platform helps with {{fit_reason}}.\n\nCould this be relevant for you?` },
            { id: 'v2', content: `{{first_name}}, hope you're surviving the pre-tax season rush. We're helping CPAs like you with {{fit_reason}} to make things easier.\n\nQuick call to discuss?` },
          ],
        },
      ],
    },
    {
      id: 'it-msp',
      name: 'IT MSPs',
      icon: <Library className="h-5 w-5" />,
      templates: [
        {
          id: 'security',
          name: 'Security Angle',
          variants: [
            { id: 'v1', content: `Hi {{first_name}},\n\nWith cyber threats on the rise, I thought our work in {{fit_reason}} for MSPs might be relevant to {{company}}.\n\nLet me know if you're open to learning more.` },
            { id: 'v2', content: `{{first_name}}, respecting your time. The latest on {{mutual_topic}} prompted my outreach.\n\nWe specialize in {{fit_reason}} for MSPs like {{company}}. Is this a priority?` },
          ],
        },
        {
          id: 'efficiency',
          name: 'Operational Efficiency',
          variants: [
            { id: 'v1', content: `Hi {{first_name}},\n\nI know how critical operational efficiency is for MSPs. We help firms like {{company}} improve margins with {{fit_reason}}.\n\nInterested in seeing how?` },
            { id: 'v2', content: `{{first_name}}, boosting tech productivity and reducing ticket volume is key. We help with {{fit_reason}}.\n\nWorth exploring?` },
          ],
        },
      ],
    },
    {
      id: 'dental',
      name: 'Dental Clinics',
      icon: <Library className="h-5 w-5" />,
      templates: [
        {
          id: 'patient-booking',
          name: 'Patient Booking',
          variants: [
            { id: 'v1', content: `Hi Dr. {{first_name}},\n\nKeeping the schedule full at {{company}} is crucial. Our platform helps dental clinics with {{fit_reason}} to attract more patients.\n\nWould be great to connect.` },
            { id: 'v2', content: `Dr. {{first_name}}, we're helping practices like yours in the {{industry}} space improve their patient acquisition via {{fit_reason}}.\n\nLet's chat.` },
          ],
        },
        {
          id: 'clinic-management',
          name: 'Clinic Management',
          variants: [
            { id: 'v1', content: `Hi Dr. {{first_name}},\n\nBetter data, better clinic management. We arm practices like yours at {{company}} with insights for {{fit_reason}}.\n\nCan I show you how it works?` },
            { id: 'v2', content: `Dr. {{first_name}}, running an effective practice is a competitive advantage. We provide the tools for {{fit_reason}} to make that happen.\n\nOpen to a quick demo?` },
          ],
        },
      ],
    },
  ],
};


export default function PersonalizationLibraryPage() {
  const [activeSegment, setActiveSegment] = useState(personalizationData.segments[0].id);

  const selectedSegment = personalizationData.segments.find(s => s.id === activeSegment);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Personalization Library
        </h1>
        <p className="text-muted-foreground">
          Manage your content templates and dynamic tokens for tailored outreach.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Folders & Tokens */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Segment Folders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {personalizationData.segments.map(segment => (
                <Button
                  key={segment.id}
                  variant={activeSegment === segment.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSegment(segment.id)}
                >
                  <Folder className="mr-2 h-4 w-4" />
                  {segment.name}
                   <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </Button>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ClipboardList /> Available Tokens
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {personalizationData.tokens.map(token => (
                <div key={token.token} className="flex items-center justify-between text-xs">
                    <Badge variant="outline" className="font-mono">{token.token}</Badge>
                    <span className="text-muted-foreground">{token.description}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Templates */}
        <div className="lg:col-span-9 space-y-6">
             <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight">
                    {selectedSegment?.name} Templates
                </h2>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> New Template
                </Button>
            </div>
            {selectedSegment?.templates.map(template => (
                <Card key={template.id}>
                    <Tabs defaultValue={template.variants[0].id}>
                        <CardHeader className="flex-row items-center justify-between">
                             <CardTitle>{template.name}</CardTitle>
                             <TabsList>
                                {template.variants.map(variant => (
                                    <TabsTrigger key={variant.id} value={variant.id}>
                                        {variant.id.toUpperCase()}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </CardHeader>
                        <CardContent>
                            {template.variants.map(variant => (
                                <TabsContent key={variant.id} value={variant.id}>
                                    <div className="prose prose-sm max-w-none rounded-md border bg-muted p-4 text-sm whitespace-pre-wrap font-mono">
                                        {variant.content}
                                    </div>
                                </TabsContent>
                            ))}
                        </CardContent>
                        <CardFooter className="justify-end gap-2">
                            <Button variant="ghost" size="sm"><PenSquare className="mr-2 h-4 w-4" /> Edit</Button>
                            <Button variant="ghost" size="sm"><Copy className="mr-2 h-4 w-4" /> Clone</Button>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
                        </CardFooter>
                    </Tabs>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
