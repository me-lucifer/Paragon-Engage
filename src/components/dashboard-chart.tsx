'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', email: 186, social: 80, ads: 120 },
  { month: 'February', email: 305, social: 200, ads: 150 },
  { month: 'March', email: 237, social: 120, ads: 180 },
  { month: 'April', email: 73, social: 190, ads: 200 },
  { month: 'May', email: 209, social: 130, ads: 220 },
  { month: 'June', email: 214, social: 140, ads: 250 },
];

const chartConfig = {
  email: {
    label: "Email",
    color: "hsl(var(--chart-1))",
  },
  social: {
    label: "Social Media",
    color: "hsl(var(--chart-2))",
  },
  ads: {
    label: "Paid Ads",
    color: "hsl(var(--chart-3))",
  },
};

export default function DashboardChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis />
        <Tooltip cursor={false} content={<ChartTooltipContent />} />
        <Legend />
        <Bar dataKey="email" fill="var(--color-email)" radius={4} />
        <Bar dataKey="social" fill="var(--color-social)" radius={4} />
        <Bar dataKey="ads" fill="var(--color-ads)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
