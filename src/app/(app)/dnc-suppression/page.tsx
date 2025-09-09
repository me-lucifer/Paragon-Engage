

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
import { UploadCloud, PlusCircle } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const suppressionList = [
    { email: "do-not-contact@example.com", reason: "Manual Add", date: "2024-07-01" },
    { email: "unsubscribe@sample.org", reason: "Unsubscribed", date: "2024-06-15" },
    { domain: "competitor.com", reason: "Domain Blacklist", date: "2024-05-20" },
];

export default function DNCSuppressionPage() {
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
