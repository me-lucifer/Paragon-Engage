
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const unboundControls = [
  { path: '/audit-log', control: 'Export Logs' },
  { path: '/campaign-studio', control: 'New Campaign' },
  { path: '/data-sources', control: 'Add Custom Source -> Save Source' },
  { path: '/dnc-suppression', control: 'Add to List' },
  { path: '/dnc-suppression', control: 'Upload Cloud' },
  { path: '/enrichment', control: 'Save as Enrichment Profile v1' },
  { path: '/enrichment', control: 'Run Enrichment' },
  { path: '/fit-scoring', control: 'Test on Sample' },
  { path: '/fit-scoring', control: 'Clone Profile' },
  { path: '/fit-scoring', control: 'Save Profile' },
  { path: '/inbox-manager', control: 'Add Inbox' },
  { path: '/inbox-manager', control: 'Refresh' },
  { path: '/inbox-manager', control: 'Settings' },
  { path: '/leads', control: 'Add Lead Manually' },
  { path: '/market-mapping', control: 'Map New Industry -> Start Mapping' },
  { path: '/market-mapping', control: 'Refresh Map' },
  { path: '/personalization-library', control: 'New Template' },
  { path: '/personalization-library', control: 'Edit' },
  { path: '/personalization-library', control: 'Clone' },
  { path: '/personalization-library', control: 'Delete' },
  { path: '/referral-hub', control: 'Copy Link' },
  { path: '/reports', control: 'Date Range' },
  { path: '/reports', control: 'Export' },
  { path: '/sequence-editor', control: 'Preview' },
  { path: '/sequence-editor', control: 'Save Sequence' },
  { path: '/sequence-editor', control: 'Add Step' },
  { path: '/sequence-editor', control: 'Run Preview' },
  { path: '/settings', control: 'Invite Members' },
  { path: '/settings', control: 'Test' },
];

const devTools = [
    { path: '/_dev/intent', name: 'Classifier Test Tool', description: 'Test intent classification on sample text.' },
];

export default function DevPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Developer Panel
        </h1>
        <p className="text-muted-foreground">
          This page lists developer tools and UI controls that are placeholders.
        </p>
      </div>
      
       <Card>
        <CardHeader>
          <CardTitle>Developer Tools</CardTitle>
          <CardDescription>
            Tools for testing and debugging application features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {devTools.map((tool) => (
                <Card key={tool.path}>
                    <CardHeader>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Link href={tool.path}>
                            <Button>
                                Go to Tool <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Unbound Controls</CardTitle>
          <CardDescription>
            The following controls will trigger a toast notification when clicked.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page Path</TableHead>
                <TableHead>Control Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unboundControls.map((control, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono">{control.path}</TableCell>
                  <TableCell>{control.control}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
