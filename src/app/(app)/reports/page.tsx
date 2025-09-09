import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ReportsChart from '@/components/reports-chart';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
        Reporting
      </h1>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lead Source Performance</CardTitle>
            <CardDescription>
              Performance of different lead sources over the last quarter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReportsChart chartType="bar" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>
              User progression through the sales funnel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReportsChart chartType="funnel" />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Engagement by User Segment</CardTitle>
            <CardDescription>
              Comparing engagement levels across different user segments.
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
