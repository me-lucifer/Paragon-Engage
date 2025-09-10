

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UploadCloud, PlusCircle, Search, ShieldCheck, ShieldAlert } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const suppressionList = [
    { email: "do-not-contact@example.com", reason: "Manual Add", date: "2024-07-01" },
    { email: "unsubscribe@sample.org", reason: "Unsubscribed", date: "2024-06-15" },
    { domain: "competitor.com", reason: "Domain Blacklist", date: "2024-05-20" },
    { email: "emily.white@summittax.ca", reason: "User Unsubscribed", date: "2024-07-29" },
];

type SuppressionResult = {
    status: 'allowed' | 'suppressed';
    reason?: string;
    email: string;
} | null;

export default function DNCSuppressionPage() {
    const [testEmail, setTestEmail] = useState('');
    const [testResult, setTestResult] = useState<SuppressionResult>(null);

    const handleTestSuppression = () => {
        if (!testEmail) {
            setTestResult(null);
            return;
        }

        const domain = testEmail.split('@')[1];
        const suppressedEntry = suppressionList.find(
            item => (item.email && item.email === testEmail) || (item.domain && item.domain === domain)
        );

        if (suppressedEntry) {
            setTestResult({
                status: 'suppressed',
                reason: suppressedEntry.reason,
                email: testEmail,
            });
        } else {
            setTestResult({
                status: 'allowed',
                email: testEmail,
            });
        }
    };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          DNC & Suppression
        </h1>
        <p className="text-muted-foreground">
          Manage your do-not-contact lists and suppression rules.
        </p>
      </div>

        <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Add to Suppression List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="manual">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                                <TabsTrigger value="upload">Upload CSV</TabsTrigger>
                            </TabsList>
                            <TabsContent value="manual" className="pt-4">
                                <Textarea
                                    placeholder="Enter emails or domains, one per line...&#10;example.com&#10;john.doe@another.com"
                                    rows={8}
                                />
                                <Button className="mt-4 w-full">
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add to List
                                </Button>
                            </TabsContent>
                            <TabsContent value="upload" className="pt-4">
                               <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                                    <UploadCloud className="h-10 w-10 text-muted-foreground" />
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-muted-foreground">CSV up to 10MB</p>
                               </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Test Suppression</CardTitle>
                        <CardDescription>Check if an email or domain is on the suppression list.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2">
                            <Input 
                                placeholder="Enter email to check..." 
                                value={testEmail}
                                onChange={(e) => setTestEmail(e.target.value)}
                            />
                            <Button onClick={handleTestSuppression}>
                                <Search className="mr-2 h-4 w-4" /> Test
                            </Button>
                        </div>
                        {testResult && (
                             <Alert variant={testResult.status === 'suppressed' ? 'destructive' : 'default'} className="bg-muted/50">
                                {testResult.status === 'suppressed' ? 
                                    <ShieldAlert className="h-4 w-4" /> : 
                                    <ShieldCheck className="h-4 w-4 text-green-600" />
                                }
                                <AlertTitle className="capitalize">{testResult.status}</AlertTitle>
                                <AlertDescription>
                                    {testResult.status === 'suppressed' 
                                        ? `${testResult.email} is suppressed. Reason: ${testResult.reason}.`
                                        : `${testResult.email} is deliverable and allowed.`
                                    }
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Global Suppression List</CardTitle>
                     <CardDescription>
                        Showing last 100 entries.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Entry</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Date Added</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {suppressionList.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{item.email || item.domain}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{item.reason}</Badge>
                            </TableCell>
                            <TableCell>{item.date}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
