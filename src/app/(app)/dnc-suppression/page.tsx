

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
import { UploadCloud, PlusCircle, Search, ShieldCheck, ShieldAlert, CheckCircle, ListFilter, Calendar as CalendarIcon, ChevronsUpDown } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SuppressionImportDialog } from '@/components/suppression-import-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const suppressionList = [
    { entry: "do-not-contact@example.com", type: 'email', reason: "Manual Add", source: "Manual", date: "2024-07-01" },
    { entry: "unsubscribe@sample.org", type: 'email', reason: "Unsubscribed", source: "System", date: "2024-06-15" },
    { entry: "competitor.com", type: 'domain', reason: "Domain Blacklist", source: "List Upload", date: "2024-05-20" },
    { entry: "emily.white@summittax.ca", type: 'email', reason: "User Unsubscribed", source: "System", date: "2024-07-29" },
    // more data for pagination
    ...Array.from({ length: 46 }).map((_, i) => ({
      entry: `test${i + 1}@example.com`,
      type: 'email' as 'email' | 'domain',
      reason: i % 3 === 0 ? "Hard Bounce" : "Manual Add",
      source: i % 2 === 0 ? "System" : "List Upload",
      date: `2024-07-${(i % 30) + 1}`,
    })),
];

type SuppressionResult = {
    status: 'allowed' | 'suppressed';
    reason?: string;
    email: string;
} | null;

type ImportResult = {
    total: number;
    added: number;
    skipped: number;
    invalid: number;
} | null;

export default function DNCSuppressionPage() {
    const [testEmail, setTestEmail] = useState('');
    const [testResult, setTestResult] = useState<SuppressionResult>(null);
    const [isImportOpen, setIsImportOpen] = useState(false);
    const [importResult, setImportResult] = useState<ImportResult>(null);
    const [date, setDate] = React.useState<DateRange | undefined>()

    const handleTestSuppression = () => {
        if (!testEmail) {
            setTestResult(null);
            return;
        }

        const domain = testEmail.split('@')[1];
        const suppressedEntry = suppressionList.find(
            item => (item.entry && item.entry === testEmail) || (item.type === 'domain' && item.entry === domain)
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
    
    const handleImportComplete = (result: ImportResult) => {
        setImportResult(result);
        setIsImportOpen(false);
         setTimeout(() => {
            setImportResult(null);
        }, 8000);
    }


  return (
    <>
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          DNC & Suppression
        </h1>
        <p className="text-muted-foreground">
          Manage your do-not-contact lists and suppression rules.
        </p>
      </div>
      
       {importResult && (
            <Alert variant="default" className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800 dark:text-green-300">Import Successful</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-400">
                    Imported {importResult.total} records. Added: {importResult.added}, Skipped: {importResult.skipped}, Invalid: {importResult.invalid}.
                </AlertDescription>
            </Alert>
        )}

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
                               <div 
                                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted"
                                    onClick={() => setIsImportOpen(true)}
                                >
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
                        Showing 50 of 12,384 suppressed contacts.
                    </CardDescription>
                     <div className="flex items-center gap-2 pt-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search by email or domain..." className="pl-10" />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex gap-2">
                                <ListFilter className="h-4 w-4" /> Filters
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuCheckboxItem>Reason: Manual Add</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Reason: Unsubscribed</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Source: System</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Source: List Upload</DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                         <Popover>
                            <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                "w-[260px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                date.to ? (
                                    <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(date.from, "LLL dd, y")
                                )
                                ) : (
                                <span>Pick a date</span>
                                )}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                            </PopoverContent>
                        </Popover>

                        <Button variant="ghost">Clear filters</Button>
                        <Button>Export All</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Entry</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Date Added</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {suppressionList.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{item.entry}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{item.source}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary">{item.reason}</Badge>
                            </TableCell>
                            <TableCell>{item.date}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
                 <CardFooter className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Page 1 of 248</p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">Previous</Button>
                        <Button variant="outline" size="sm">Next</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    </div>
    <SuppressionImportDialog 
        open={isImportOpen}
        onOpenChange={setIsImportOpen}
        onImportComplete={handleImportComplete}
    />
    </>
  );
}
