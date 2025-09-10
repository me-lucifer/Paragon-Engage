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

const barData = [
  { source: 'Gmail', placement: 92 },
  { source: 'Outlook 365', placement: 88 },
  { source: 'Yahoo', placement: 86 },
  { source: 'Other', placement: 90 },
];

const lineData = [
    { month: 'Jan', segmentA: 400, segmentB: 240 },
    { month: 'Feb', segmentA: 300, segmentB: 139 },
    { month: 'Mar', segmentA: 200, segmentB: 980 },
    { month: 'Apr', segmentA: 278, segmentB: 390 },
    { month: 'May', segmentA: 189, segmentB: 480 },
    { month: 'Jun', segmentA: 239, segmentB: 380 },
];

const funnelData = [
  { value: 100, name: 'Visitors', fill: 'hsl(var(--chart-1))' },
  { value: 80, name: 'Signups', fill: 'hsl(var(--chart-2))' },
  { value: 50, name: 'Engaged', fill: 'hsl(var(--chart-3))' },
  { value: 20, name: 'Converted', fill: 'hsl(var(--chart-4))' },
];


const barConfig = { placement: { label: 'Inbox Placement', color: 'hsl(var(--primary))' } };
const lineConfig = { 
    segmentA: { label: 'Segment A', color: 'hsl(var(--primary))' },
    segmentB: { label: 'Segment B', color: 'hsl(var(--accent))' }
};

interface ReportsChartProps {
  chartType: 'bar' | 'line' | 'funnel';
}

export default function ReportsChart({ chartType }: ReportsChartProps) {
  if (chartType === 'bar') {
    return (
      <ChartContainer config={barConfig} className="min-h-[250px] w-full">
        <BarChart accessibilityLayer data={barData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="source" tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis unit="%" />
          <Tooltip cursor={false} content={<ChartTooltipContent unit="%" />} />
          <Bar dataKey="placement" fill="var(--color-placement)" radius={4} />
        </BarChart>
      </ChartContainer>
    );
  }
  if (chartType === 'line') {
    return (
        <ChartContainer config={lineConfig} className="min-h-[250px] w-full">
            <LineChart accessibilityLayer data={lineData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="segmentA" stroke="var(--color-segmentA)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="segmentB" stroke="var(--color-segmentB)" strokeWidth={2} dot={false} />
            </LineChart>
      </ChartContainer>
    )
  }
   if (chartType === 'funnel') {
    return (
      <ChartContainer config={{}} className="min-h-[250px] w-full">
        <FunnelChart width={730} height={250}>
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
