
'use client';

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Funnel,
  FunnelChart,
  LabelList,
  TooltipProps,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const weeklyOutreachData = [
  { day: 'Mon', sent: 4800 },
  { day: 'Tue', sent: 5100 },
  { day: 'Wed', sent: 4500 },
  { day: 'Thu', sent: 5200 },
  { day: 'Fri', sent: 3300 },
  { day: 'Sat', sent: 1100 },
  { day: 'Sun', sent: 900 },
];

const rateData = [
    { date: 'Jan', openRate: 65, replyRate: 15 },
    { date: 'Feb', openRate: 70, replyRate: 18 },
    { date: 'Mar', openRate: 68, replyRate: 20 },
    { date: 'Apr', openRate: 72, replyRate: 22 },
    { date: 'May', openRate: 75, replyRate: 25 },
    { date: 'Jun', openRate: 78, replyRate: 28 },
];

const funnelData = [
  { value: 10000, name: 'Contacts', fill: 'hsl(var(--chart-1))' },
  { value: 9200, name: 'Delivered', fill: 'hsl(var(--chart-2))' },
  { value: 6500, name: 'Opens', fill: 'hsl(var(--chart-3))' },
  { value: 1289, name: 'Replies', fill: 'hsl(var(--chart-4))' },
  { value: 342, name: 'Positive', fill: 'hsl(var(--chart-5))' },
  { value: 58, name: 'Meetings', fill: 'hsl(var(--primary))' },
];


const barConfig = { sent: { label: 'Sent', color: 'hsl(var(--primary))' } };
const lineConfig = { 
    openRate: { label: 'Open Rate', color: 'hsl(var(--chart-1))' },
    replyRate: { label: 'Reply Rate', color: 'hsl(var(--chart-2))' }
};

interface DashboardChartProps {
  chartType: 'bar' | 'line' | 'funnel';
}

const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {payload[0].name}
            </span>
            <span className="font-bold text-muted-foreground">
              {payload[0].value}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};


export default function DashboardChart({ chartType }: DashboardChartProps) {
  if (chartType === 'bar') {
    return (
      <ChartContainer config={barConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={weeklyOutreachData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis />
          <Tooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="sent" fill="var(--color-sent)" radius={4} />
        </BarChart>
      </ChartContainer>
    );
  }
  if (chartType === 'line') {
    return (
        <ChartContainer config={lineConfig} className="min-h-[200px] w-full">
            <LineChart accessibilityLayer data={rateData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="openRate" stroke="var(--color-openRate)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="replyRate" stroke="var(--color-replyRate)" strokeWidth={2} dot={false} />
            </LineChart>
      </ChartContainer>
    )
  }
   if (chartType === 'funnel') {
    return (
      <ChartContainer config={{}} className="min-h-[250px] w-full max-w-lg mx-auto">
        <FunnelChart width={500} height={250}>
            <Tooltip content={CustomTooltip} />
            <Funnel dataKey="value" data={funnelData} isAnimationActive>
                 <LabelList position="right" fill="hsl(var(--foreground))" stroke="none" dataKey="name" />
            </Funnel>
        </FunnelChart>
      </ChartContainer>
    )
  }

  return null;
}
