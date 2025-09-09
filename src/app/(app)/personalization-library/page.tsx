
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
      id: 'hf-am',
      name: 'Hedge Funds & Asset Managers',
      icon: <Library className="h-5 w-5" />,
      templates: [
        {
          id: 'intro',
          name: 'Cold Intro',
          variants: [
            { id: 'v1', content: `Hi {{first_name}},\n\nNoticed your work at {{company}}. Given your focus on {{mutual_topic}}, thought you might find our approach to {{fit_reason}} interesting.\n\nLet's connect.` },
            { id: 'v2', content: `{{first_name}} - saw your post on {{mutual_topic}}. Your insights on {{industry}} are spot on.\n\nWe're helping firms like {{company}} with {{fit_reason}}. Worth a chat?` },
          ],
        },
        {
          id: 'news',
          name: 'Recent News Trigger',
          variants: [
            { id: 'v1', content: `Hi {{first_name}},\n\nCongrats on the recent {{recent_news}} at {{company}}. It's impressive.\n\nWhen companies are in growth mode like yours, our solutions for {{fit_reason}} often become a priority. Open to a brief chat next week?` },
            { id: 'v2', content: `{{first_name}}, that's a huge milestone ({{recent_news}}). Based on what we've seen in the {{industry}} space, this is a perfect time to consider {{fit_reason}}.\n\nQuick call to discuss?` },
          ],
        },
        {
          id: 'affinity',
          name: 'Affinity/Alumni Angle',
          variants: [
            { id: 'v1', content: `Hi {{first_name}} - hope you're well. Saw we both went to {{education_affinity}}. Go team!\n\nReaching out because my work at Paragon often intersects with {{role}}s like yours, specifically around {{fit_reason}}. Would love to compare notes.` },
            { id: 'v2', content: `{{first_name}}, small world - saw {{education_affinity}} on your profile. Reaching out as a fellow alum.\n\nMy team helps firms in the {{industry}} space tackle {{fit_reason}}. Any interest in a quick chat?` },
          ],
        },
      ],
    },
    {
      id: 'corp-ir',
      name: 'Corporate Boards & IR',
      icon: <Library className="h-5 w-5" />,
      templates: [
        {
          id: 'governance',
          name: 'Governance Angle',
          variants: [
            { id: 'v1', content: `Hi {{first_name}},\n\nGiven your role on the board at {{company}}, thought you might be interested in our insights on {{mutual_topic}}.\n\nWe help boards like yours with {{fit_reason}}. Let me know if you're open to learning more.` },
            { id: 'v2', content: `{{first_name}}, respecting your time. The latest discourse on {{mutual_topic}} prompted my outreach.\n\nAt Paragon, we specialize in {{fit_reason}} for boards. Is this a priority for {{company}}?` },
          ],
        },
        {
          id: 'shareholder',
          name: 'Shareholder Value',
          variants: [
            { id: 'v1', content: `Hi {{first_name}},\n\nYour focus on shareholder value at {{company}} is clear. We're working with {{industry}} leaders to enhance this through {{fit_reason}}.\n\nCould this be relevant for you?` },
            { id: 'v2', content: `{{first_name}}, driving shareholder value is key. We've seen firms like {{company}} benefit from focusing on {{fit_reason}}.\n\nWorth exploring?` },
          ],
        },
        {
          id: 'risk',
          name: 'Risk & Compliance',
          variants: [
            { id: 'v1', content: `Hi {{first_name}},\n\nThe current landscape for {{industry}} makes risk management crucial. Our work in {{fit_reason}} is directly addressing this.\n\nI'd be happy to share some high-level thoughts.` },
            { id: 'v2', content: `{{first_name}}, {{recent_news}} highlights the importance of proactive risk management. We help with {{fit_reason}} to stay ahead.\n\nOpen to a brief discussion?` },
          ],
        },
      ],
    },
    {
      id: 'pe',
      name: 'Private Equity Firms',
      icon: <Library className="h-5 w-5" />,
      templates: [
        {
          id: 'deal-sourcing',
          name: 'Deal Sourcing',
          variants: [
            { id: 'v1', content: `Hi {{first_name}},\n\nFinding proprietary deals in {{industry}} is tough. Our platform helps firms like {{company}} uncover opportunities based on {{fit_reason}}.\n\nInterested in seeing how?` },
            { id: 'v2', content: `{{first_name}}, I know how critical deal flow is. We provide unique data signals for {{fit_reason}} that surface off-market opportunities.\n\nWorth a look?` },
          ],
        },
        {
          id: 'portfolio-ops',
          name: 'Portfolio Operations',
          variants: [
            { id: 'v1', content: `Hi {{first_name}},\n\nDriving value across the portfolio is paramount. We support PE firms by implementing {{fit_reason}} to accelerate growth.\n\nWould be great to connect.` },
            { id: 'v2', content: `{{first_name}}, the pressure to perform at the port-co level is immense. We help with {{fit_reason}} to deliver operational alpha.\n\nLet's chat.` },
          ],
        },
        {
          id: 'due-diligence',
          name: 'Due Diligence',
          variants: [
            { id: 'v1', content: `Hi {{first_name}},\n\nBetter data, better diligence. We arm investment teams like yours at {{company}} with proprietary insights for {{fit_reason}}.\n\nCan I show you how it works?` },
            { id: 'v2', content: `{{first_name}}, running a fast, effective diligence process is a competitive advantage. We provide the data for {{fit_reason}} to make that happen.\n\nOpen to a quick demo?` },
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
