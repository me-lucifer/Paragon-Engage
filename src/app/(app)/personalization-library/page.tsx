
'use client';

import React, { useState } from 'react';
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
  ClipboardList,
  BookCopy,
  CalendarPlus,
  Share2,
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Separator } from '@/components/ui/separator';

const personalizationData = {
  tokens: [
    { token: '{{first_name}}', description: 'Contact\'s first name' },
    { token: '{{company}}', description: 'Contact\'s company name' },
    { token: '{{role}}', description: 'Contact\'s job title' },
    { token: '{{industry}}', description: 'Company\'s industry' },
    { token: '{{fit_reason}}', description: 'Why they are a good fit' },
    { token: '{{recent_news}}', description: 'Recent news about the company' },
    { token: '{{education_affinity}}', description: 'Shared educational background' },
    { token: '{{mutual_topic}}', description: 'A topic of mutual interest' },
    { token: '{{aum_band}}', description: 'Assets Under Management band' },
    { token: '{{strategy}}', description: 'Company\'s investment strategy' },
    { token: '{{ticker}}', description: 'Company\'s stock ticker' },
    { token: '{{calendar_link}}', description: 'Your scheduling link' },
    { token: '{{referral_link}}', description: 'Your unique referral link' },
    { token: '{{org_name}}', description: 'Your organization\'s name' },
    { token: '{{primary_domain}}', description: 'Your primary domain' },
    { token: '{{sender_name}}', description: 'Default sender name' },
    { token: '{{support_email}}', description: 'Your support email' },
    { token: '{{legal_name}}', description: 'Your legal business name' },
    { token: '{{legal_address}}', description: 'Your legal address' },
    { token: '{{footer_identity}}', description: 'Your email footer text' },
  ],
  segments: [
    {
      id: 'hf-am',
      name: 'HF & Asset Managers',
      icon: <Library className="h-5 w-5" />,
      templates: [
        {
          id: 'hf-am-intro',
          name: 'HF-AM Intro (A/B Test)',
          variants: [
            { id: 'v1', subject: 'Quick idea for {{company}}\'s {{strategy}} pipeline', content: `Hi {{first_name}},\n\nWe mapped your peer set in {{industry}} and identified pockets where managers with {{aum_band}} AUM are seeing faster intros. Based on {{fit_reason}}, we can surface curated targets and run compliant, personalized outreach that hands your team only warm replies.\n\nIf helpful, I can show the workflow using {{recent_news}} as the trigger.\n\nOpen to a 12-minute walk-through next week?` },
            { id: 'v2', subject: 'Warm replies without more headcount', content: `Hi {{first_name}},\n\nWe score and contact prospects on your behalf, then route only positive replies to {{company}}. No spray and pray. Tunable scoring, rotating inboxes, and audit trails.\n\nWorth a quick look?` },
          ],
        },
        {
          id: 'hf-am-follow-up',
          name: 'HF-AM Follow-up v1',
          variants: [
            { id: 'v1', subject: 'Re: warm replies for {{company}}', content: `Hi {{first_name}}, checking if a focused demo would help. We can preload {{company}}’s targets and show reply quality by scoring band. Would {{first_name}} prefer Mon or Tue morning?` },
          ],
        },
        {
          id: 'hf-am-bump',
          name: 'HF-AM Bump v1',
          variants: [
            { id: 'v1', subject: 'Nudge on {{company}} outreach', content: `Looping back. Happy to send a 1-page summary and sample replies before a call. Should I?` },
          ],
        },
        {
          id: 'hf-am-breakup',
          name: 'HF-AM Breakup v1',
          variants: [
            { id: 'v1', subject: 'Close the loop?', content: `If now isn’t a priority, I’ll pause on my end. If things change, reply “Reopen” and I’ll share a short demo tailored to {{company}}.` },
          ],
        },
        {
          id: 'hf-am-objection',
          name: 'HF-AM Objection: already using a tool',
          variants: [
            { id: 'v1', subject: 'Keep existing stack, add warm-reply layer', content: `Understood. We typically sit on top of Apollo/Instantly, using your rules to filter and only pass warm replies into your CRM. Low lift, measurable trial. Explore a 2-week pilot?` },
          ],
        },
        {
          id: 'hf-am-positive-reply',
          name: 'HF-AM Positive-reply handoff',
          variants: [
            { id: 'v1', subject: 'Thanks — next step', content: `Great. I’ll send a calendar link for a focused 15-minute session and a redacted sample campaign. Any teammates I should include?` },
          ],
        },
      ]
    },
    {
      id: 'boards-ir',
      name: 'Corporate Boards & IR',
      icon: <Library className="h-5 w-5" />,
      templates: [
        {
          id: 'boards-ir-intro',
          name: 'Boards/IR Intro (A/B Test)',
          variants: [
            { id: 'v1', subject: 'Cleaner inbound for the next earnings cycle', content: `Hi {{first_name}},\n\nWe map your investor universe, suppress in-conversation contacts, and run compliant, personalized outreach for roadshows and investor days. Outcome: fewer cold touches, more warm replies routed to IR.\n\nShow you a 10-minute demo with {{ticker}} examples?` },
            { id: 'v2', subject: 'Post-{{recent_news}} interest capture', content: `Hi {{first_name}}, after {{recent_news}}, we can segment and contact likely interested funds with contextual snippets, then hand only engaged replies to IR. Want to see the workflow?` },
          ],
        },
        {
          id: 'boards-ir-follow-up',
          name: 'Boards/IR Follow-up v1',
          variants: [
            { id: 'v1', subject: 'Re: IR warm replies for {{company}}', content: `Quick check. We can start with a small, pre-earnings segment and report on opens, replies, and positive intent. Short call?` },
          ],
        },
        {
          id: 'boards-ir-bump',
          name: 'Boards/IR Bump v1',
          variants: [
            { id: 'v1', subject: 'Keeping this brief', content: `Sharing a one-pager on compliance guardrails and unsubscribe handling. If useful, reply “send”.` },
          ],
        },
        {
          id: 'boards-ir-breakup',
          name: 'Boards/IR Breakup v1',
          variants: [
            { id: 'v1', subject: 'Park for now?', content: `No problem. I’ll archive this thread. To revisit before the next roadshow, reply “restart”.` },
          ],
        },
        {
          id: 'boards-ir-objection',
          name: 'Boards/IR Objection: compliance concerns',
          variants: [
            { id: 'v1', subject: 'IR compliance guardrails', content: `We enforce DNC lists, unsubscribe propagation, and audit logs. Senders use authenticated domains with throttles and time-window controls. Happy to walk through the checklist.` },
          ],
        },
        {
          id: 'boards-ir-positive-reply',
          name: 'Boards/IR Positive-reply handoff',
          variants: [
            { id: 'v1', subject: 'Thanks — IR demo', content: `Appreciate the interest. I’ll share a read-only dashboard link and proposed pilot scope. Anyone from the IR team to include?` },
          ],
        },
      ],
    },
    {
      id: 'pe-firms',
      name: 'Private Equity Firms',
      icon: <Library className="h-5 w-5" />,
      templates: [
        {
          id: 'pe-intro',
          name: 'PE Intro (A/B Test)',
          variants: [
            { id: 'v1', subject: 'More qualified founder replies for add-ons', content: `Hi {{first_name}},\n\nFor {{company}}’s platform in {{industry}}, we map operators below a set FTE, score for fit, and run outreach that surfaces owners willing to discuss a sale. You get reply-ready leads, not lists.\n\nOpen to a 12-minute look?` },
            { id: 'v2', subject: 'Fast path to founder conversations', content: `Hi {{first_name}}, noticed the {{education_affinity}} overlap. We’ve been helping funds queue add-on dialogs by filtering for founder age proxies, ownership concentration, and niche match. See a sample?` },
          ],
        },
        {
          id: 'pe-follow-up-v1',
          name: 'PE Follow-up v1',
          variants: [
            { id: 'v1', subject: 'Re: add-on pipeline for {{company}}', content: `We can start with one sub-vertical and a conservative scoring profile. Two-week pilot, clear success criteria. Interest?` },
          ],
        },
        {
          id: 'pe-bump-v1',
          name: 'PE Bump v1',
          variants: [
            { id: 'v1', subject: 'Quick nudge', content: `Happy to send 5 anonymized founder replies from a recent pilot so you can judge tone/quality. Share?` },
          ],
        },
        {
          id: 'pe-breakup-v1',
          name: 'PE Breakup v1',
          variants: [
            { id: 'v1', subject: 'Close out?', content: `I’ll pause outreach on my side. If priorities shift, reply “go” and I’ll send a scoped pilot plan.` },
          ],
        },
        {
          id: 'pe-objection-sourcing',
          name: 'PE Objection: already have sourcing team',
          variants: [
            { id: 'v1', subject: 'Augment, not replace', content: `Agreed. We act as an always-on layer that filters and warms up owners, then hands to your team. Your rubric drives the scoring. Explore a low-lift pilot?` },
          ],
        },
        {
          id: 'pe-positive-reply',
          name: 'PE Positive-reply handoff',
          variants: [
            { id: 'v1', subject: 'Next step on pilot', content: `Thanks. I’ll propose a 2-week pilot brief with volume caps, scoring thresholds, and reporting. Any portfolio ops contact to include?` },
          ],
        },
      ],
    },
    {
      id: 'referral-hub',
      name: 'Referral Hub Email Snippets',
      icon: <Share2 className="h-5 w-5" />,
      templates: [
        {
          id: 'referral-ask-v1',
          name: 'Referral ask v1',
          variants: [
            { id: 'v1', subject: 'Quick ask — introduce us?', content: `We just launched a small referral workflow. If you know one team that would benefit, this link credits you for any meeting: {{referral_link}}. We report back on outcomes.` },
          ],
        },
        {
          id: 'referral-nudge-v1',
          name: 'Referral nudge v1',
          variants: [
            { id: 'v1', subject: 'Gentle reminder on referral link', content: `Sharing the same link in case it helps: {{referral_link}}. We can also draft a short forwardable note if useful.` },
          ],
        },
        {
          id: 'forwardable-note',
          name: 'Forwardable note',
          variants: [
            { id: 'v1', subject: 'Intro suggestion', content: `I thought of you for this. We use a light AI layer to map and contact targets, then route only warm replies. If helpful, they can share a 10-minute demo. Link: {{referral_link}}.` },
          ],
        },
      ]
    },
    {
      id: 'scheduling-handoff',
      name: 'Scheduling Hand-off',
      icon: <CalendarPlus className="h-5 w-5" />,
      templates: [
        {
          id: 'calendar-link',
          name: 'Calendar link',
          variants: [
            { id: 'v1', subject: '', content: 'Here is a short calendar link for a focused 15-minute session: {{calendar_link}}. If easier, reply with two times that work and we will confirm.' },
          ],
        },
      ],
    },
    {
      id: 'snippets-library',
      name: 'Snippets Library',
      icon: <BookCopy className="h-5 w-5" />,
      templates: [
        {
          id: 'education-hook',
          name: 'Education hook',
          variants: [
            { id: 'v1', subject: '', content: `Noticed your {{education_affinity}} background. We can weave that into the opener where relevant to increase reply probability.` },
          ],
        },
        {
          id: 'recent-news-hook',
          name: 'Recent news hook',
          variants: [
            { id: 'v1', subject: '', content: `Saw {{recent_news}}. We can reference this contextually in the first line and keep the CTA to a single yes/no.` },
          ],
        },
        {
          id: 'fit-reason-explainer',
          name: 'Fit reason explainer',
          variants: [
            { id: 'v1', subject: '', content: `We flagged {{company}} due to {{fit_reason}} (FTE band, ownership concentration, niche). That typically correlates with higher reply quality.` },
          ],
        },
        {
          id: 'compliance-footer',
          name: 'Compliance footer',
          variants: [
            { id: 'v1', subject: '', content: `{{footer_identity}}\n\nYou received this because your address is publicly listed for business outreach. Unsubscribe via the link below and we will not contact you again.` },
          ],
        },
      ],
    },
  ],
};

const footer_identity = "You’re receiving this business outreach from {{org_name}} ({{legal_name}}). To stop further emails, use the unsubscribe link below.";


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
              <CardTitle>Content Folders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {personalizationData.segments.map(segment => (
                <Button
                  key={segment.id}
                  variant={activeSegment === segment.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSegment(segment.id)}
                >
                  {segment.icon? React.cloneElement(segment.icon, {className: 'mr-2 h-4 w-4'}) : <Folder className="mr-2 h-4 w-4" /> }
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
                    {selectedSegment?.name}
                </h2>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> New Template
                </Button>
            </div>
            {selectedSegment?.templates.map(template => (
                <Card key={template.id}>
                    <Tabs defaultValue={template.variants[0].id}>
                        <CardHeader className="flex-row items-center justify-between">
                             <div>
                                <CardTitle>{template.name}</CardTitle>
                                {template.variants.length > 1 && <CardDescription className="pt-1">A/B test active. 50% split.</CardDescription>}
                             </div>
                             {template.variants.length > 1 &&
                                <TabsList>
                                    {template.variants.map(variant => (
                                        <TabsTrigger key={variant.id} value={variant.id}>
                                            Variant {variant.id.toUpperCase()}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                             }
                        </CardHeader>
                        {template.variants.map(variant => (
                            <TabsContent key={variant.id} value={variant.id}>
                                {variant.subject && <CardDescription className="px-6 pb-4 font-semibold">Subject: {variant.subject}</CardDescription> }
                                <CardContent className="space-y-4">
                                    <div className="prose prose-sm max-w-none rounded-md border bg-muted p-4 text-sm whitespace-pre-wrap font-mono">
                                        {variant.content}
                                    </div>
                                    <Separator />
                                     <div className="text-xs text-muted-foreground p-4 border rounded-md">
                                        <p>{footer_identity.replace('{{org_name}}', 'Paragon Engage Demo').replace('{{legal_name}}', 'Paragon Intelligence, Inc.')}</p>
                                        <p className="mt-2">To stop further emails, <a href="#" className="underline">unsubscribe here</a>.</p>
                                    </div>
                                </CardContent>
                            </TabsContent>
                        ))}
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

    
