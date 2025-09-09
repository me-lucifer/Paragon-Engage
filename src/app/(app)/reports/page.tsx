import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar, Download, ChevronDown } from 'lucide-react';
import ReportsChart from '@/components/reports-chart';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Reports
          </h1>
          <p className="text-muted-foreground">
            Analyze your campaign performance and results.
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Date Range</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance by Segment</CardTitle>
            <CardDescription>
              Open, reply, and positive intent rates across your target segments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReportsChart chartType="bar" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conversion by Scoring Band</CardTitle>
            <CardDescription>
              How well leads convert based on their fit score.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ReportsChart chartType="funnel" />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Inbox Pool Health</CardTitle>
            <CardDescription>
              Deliverability and reputation trends for your sending inboxes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReportsChart chartType="line" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
