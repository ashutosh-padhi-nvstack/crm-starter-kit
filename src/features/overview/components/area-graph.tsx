'use client';

import { IconTrendingUp } from '@tabler/icons-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

// CRM: DIY vs Assisted Applications
const chartData = [
  { month: 'January', diy: 186, assisted: 80 },
  { month: 'February', diy: 305, assisted: 200 },
  { month: 'March', diy: 237, assisted: 120 },
  { month: 'April', diy: 273, assisted: 190 },
  { month: 'May', diy: 209, assisted: 130 },
  { month: 'June', diy: 214, assisted: 140 }
];

const chartConfig = {
  applications: {
    label: 'Applications'
  },
  diy: {
    label: 'DIY Journey',
    color: 'hsl(var(--chart-1))'
  },
  assisted: {
    label: 'Assisted Journey',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

export function AreaGraph() {
  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>DIY vs Assisted Applications</CardTitle>
        <CardDescription>
          Showing total applications by journey type for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <defs>
              <linearGradient id='fillDIY' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-diy)'
                  stopOpacity={1.0}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-diy)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillAssisted' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-assisted)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-assisted)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dot' />}
            />
            <Area
              dataKey='assisted'
              type='natural'
              fill='url(#fillAssisted)'
              stroke='var(--color-assisted)'
              stackId='a'
            />
            <Area
              dataKey='diy'
              type='natural'
              fill='url(#fillDIY)'
              stroke='var(--color-diy)'
              stackId='a'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 leading-none font-medium'>
              DIY applications trending up by 12.3% this month{' '}
              <IconTrendingUp className='h-4 w-4' />
            </div>
            <div className='text-muted-foreground flex items-center gap-2 leading-none'>
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
