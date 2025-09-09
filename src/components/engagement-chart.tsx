'use client';

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: "Jan", engagement: 4000 },
  { month: "Feb", engagement: 3000 },
  { month: "Mar", engagement: 2000 },
  { month: "Apr", engagement: 2780 },
  { month: "May", engagement: 1890 },
  { month: "Jun", engagement: 2390 },
  { month: "Jul", engagement: 3490 },
  { month: "Aug", engagement: 3600 },
  { month: "Sep", engagement: 3100 },
  { month: "Oct", engagement: 4200 },
  { month: "Nov", engagement: 4500 },
  { month: "Dec", engagement: 4300 },
];

const chartConfig = {
  engagement: {
    label: "Engagement",
    color: "hsl(var(--primary))",
  },
};

export default function EngagementChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="engagement"
          stroke="var(--color-engagement)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
