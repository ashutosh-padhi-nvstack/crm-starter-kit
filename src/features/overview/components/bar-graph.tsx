'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export const description = 'Applications by Status - Interactive Chart';

// CRM: Applications by Status data
const chartData = [
  { date: '2024-04-01', submitted: 22, completed: 15 },
  { date: '2024-04-02', submitted: 19, completed: 18 },
  { date: '2024-04-03', submitted: 16, completed: 12 },
  { date: '2024-04-04', submitted: 24, completed: 26 },
  { date: '2024-04-05', submitted: 37, completed: 29 },
  { date: '2024-04-06', submitted: 30, completed: 34 },
  { date: '2024-04-07', submitted: 24, completed: 18 },
  { date: '2024-04-08', submitted: 40, completed: 32 },
  { date: '2024-04-09', submitted: 15, completed: 11 },
  { date: '2024-04-10', submitted: 26, completed: 19 },
  { date: '2024-04-11', submitted: 32, completed: 35 },
  { date: '2024-04-12', submitted: 29, completed: 21 },
  { date: '2024-04-13', submitted: 34, completed: 38 },
  { date: '2024-04-14', submitted: 13, completed: 22 },
  { date: '2024-04-15', submitted: 12, completed: 17 },
  { date: '2024-04-16', submitted: 13, completed: 19 },
  { date: '2024-04-17', submitted: 44, completed: 36 },
  { date: '2024-04-18', submitted: 36, completed: 41 },
  { date: '2024-04-19', submitted: 24, completed: 18 },
  { date: '2024-04-20', submitted: 8, completed: 15 },
  { date: '2024-04-21', submitted: 13, completed: 20 },
  { date: '2024-04-22', submitted: 22, completed: 17 },
  { date: '2024-04-23', submitted: 13, completed: 23 },
  { date: '2024-04-24', submitted: 38, completed: 29 },
  { date: '2024-04-25', submitted: 21, completed: 25 },
  { date: '2024-04-26', submitted: 7, completed: 13 },
  { date: '2024-04-27', submitted: 38, completed: 42 },
  { date: '2024-04-28', submitted: 12, completed: 18 },
  { date: '2024-04-29', submitted: 31, completed: 24 },
  { date: '2024-04-30', submitted: 45, completed: 38 },
  { date: '2024-05-01', submitted: 16, completed: 22 },
  { date: '2024-05-02', submitted: 29, completed: 31 },
  { date: '2024-05-03', submitted: 24, completed: 19 },
  { date: '2024-05-04', submitted: 38, completed: 42 },
  { date: '2024-05-05', submitted: 48, completed: 39 },
  { date: '2024-05-06', submitted: 49, completed: 52 },
  { date: '2024-05-07', submitted: 38, completed: 30 },
  { date: '2024-05-08', submitted: 14, completed: 21 },
  { date: '2024-05-09', submitted: 22, completed: 18 },
  { date: '2024-05-10', submitted: 29, completed: 33 },
  { date: '2024-05-11', submitted: 33, completed: 27 },
  { date: '2024-05-12', submitted: 19, completed: 24 },
  { date: '2024-05-13', submitted: 19, completed: 16 },
  { date: '2024-05-14', submitted: 44, completed: 49 },
  { date: '2024-05-15', submitted: 47, completed: 38 },
  { date: '2024-05-16', submitted: 33, completed: 40 },
  { date: '2024-05-17', submitted: 49, completed: 42 },
  { date: '2024-05-18', submitted: 31, completed: 35 },
  { date: '2024-05-19', submitted: 23, completed: 18 },
  { date: '2024-05-20', submitted: 17, completed: 23 },
  { date: '2024-05-21', submitted: 8, completed: 14 },
  { date: '2024-05-22', submitted: 8, completed: 12 },
  { date: '2024-05-23', submitted: 25, completed: 29 },
  { date: '2024-05-24', submitted: 29, completed: 22 },
  { date: '2024-05-25', submitted: 20, completed: 25 },
  { date: '2024-05-26', submitted: 21, completed: 17 },
  { date: '2024-05-27', submitted: 42, completed: 46 },
  { date: '2024-05-28', submitted: 23, completed: 19 },
  { date: '2024-05-29', submitted: 7, completed: 13 },
  { date: '2024-05-30', submitted: 34, completed: 28 },
  { date: '2024-05-31', submitted: 17, completed: 23 },
  { date: '2024-06-01', submitted: 17, completed: 20 },
  { date: '2024-06-02', submitted: 47, completed: 41 },
  { date: '2024-06-03', submitted: 10, completed: 16 },
  { date: '2024-06-04', submitted: 43, completed: 38 },
  { date: '2024-06-05', submitted: 8, completed: 14 },
  { date: '2024-06-06', submitted: 29, completed: 25 },
  { date: '2024-06-07', submitted: 32, completed: 37 },
  { date: '2024-06-08', submitted: 38, completed: 32 },
  { date: '2024-06-09', submitted: 43, completed: 48 },
  { date: '2024-06-10', submitted: 15, completed: 20 },
  { date: '2024-06-11', submitted: 9, completed: 15 },
  { date: '2024-06-12', submitted: 49, completed: 42 },
  { date: '2024-06-13', submitted: 8, completed: 13 },
  { date: '2024-06-14', submitted: 42, completed: 38 },
  { date: '2024-06-15', submitted: 30, completed: 35 },
  { date: '2024-06-16', submitted: 37, completed: 31 },
  { date: '2024-06-17', submitted: 47, completed: 52 },
  { date: '2024-06-18', submitted: 10, completed: 17 },
  { date: '2024-06-19', submitted: 34, completed: 29 },
  { date: '2024-06-20', submitted: 40, completed: 45 },
  { date: '2024-06-21', submitted: 16, completed: 21 },
  { date: '2024-06-22', submitted: 31, completed: 27 },
  { date: '2024-06-23', submitted: 48, completed: 53 },
  { date: '2024-06-24', submitted: 13, completed: 18 },
  { date: '2024-06-25', submitted: 14, completed: 19 },
  { date: '2024-06-26', submitted: 43, completed: 38 },
  { date: '2024-06-27', submitted: 44, completed: 49 },
  { date: '2024-06-28', submitted: 14, completed: 20 },
  { date: '2024-06-29', submitted: 10, completed: 16 },
  { date: '2024-06-30', submitted: 44, completed: 40 }
];

const chartConfig = {
  applications: {
    label: 'Applications'
  },
  submitted: {
    label: 'Submitted',
    color: 'hsl(var(--chart-1))'
  },
  completed: {
    label: 'Completed',
    color: 'hsl(var(--chart-2))'
  },
  error: {
    label: 'Error',
    color: 'hsl(var(--destructive))'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('submitted');

  const total = React.useMemo(
    () => ({
      submitted: chartData.reduce((acc, curr) => acc + curr.submitted, 0),
      completed: chartData.reduce((acc, curr) => acc + curr.completed, 0)
    }),
    []
  );

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (activeChart === 'error') {
      throw new Error('Mocking Error');
    }
  }, [activeChart]);

  if (!isClient) {
    return null;
  }

  return (
    <Card className='@container/card !pt-3'>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b !p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 !py-0'>
          <CardTitle>Applications by Status</CardTitle>
          <CardDescription>
            <span className='hidden @[540px]/card:block'>
              Daily visa applications for the last 3 months
            </span>
            <span className='@[540px]/card:hidden'>Last 3 months</span>
          </CardDescription>
        </div>
        <div className='flex'>
          {['submitted', 'completed', 'error'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            if (!chart || total[key as keyof typeof total] === 0) return null;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='data-[active=true]:bg-primary/5 hover:bg-primary/5 relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left transition-colors duration-200 even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-muted-foreground text-xs'>
                  {chartConfig[chart].label}
                </span>
                <span className='text-lg leading-none font-bold sm:text-3xl'>
                  {total[key as keyof typeof total]?.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <BarChart
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <defs>
              <linearGradient id='fillBar' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='0%'
                  stopColor='var(--primary)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='100%'
                  stopColor='var(--primary)'
                  stopOpacity={0.2}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
            />
            <ChartTooltip
              cursor={{ fill: 'var(--primary)', opacity: 0.1 }}
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='applications'
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill='url(#fillBar)'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
