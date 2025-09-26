"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart with dots";

const chartData = [
  { day: "Mon", users: 250 },
  { day: "Tue", users: 300 },
  { day: "Wed", users: 180 },
  { day: "Thu", users: 420 },
  { day: "Fri", users: 320 },
  { day: "Sat", users: 450 },
  { day: "Sun", users: 360 },
];

const chartConfig = {
  users: {
    label: "Users",
    color: "#f97316", // Orange color matching the image
  },
} satisfies ChartConfig;

export function UserActivityChar() {
  return (
    <Card className="rounded-[20px] border-gray-700 backdrop-blur-sm shadow-2xl h-[400px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl font-semibold">User Activity</CardTitle>
        <CardDescription className="text-gray-400 text-sm">
          Daily active users over the last 7 days
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-6">
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <LineChart
            data={chartData}
            margin={{
              left: 20,
              right: 30,
              top: 20,
              bottom: 20,
            }}
            className="h-full w-full"
          >
            <CartesianGrid 
              vertical={false} 
              stroke="rgba(255,255,255,0.1)" 
              strokeDasharray="0" 
              className=""
            />

            {/* X Axis */}
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />

            {/* Y Axis */}
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDecimals={false}
              domain={[0, 600]}
              ticks={[0, 150, 300, 450, 600]}
              width={40}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              className=""
            />

            <ChartTooltip 
              cursor={false} 
              content={<ChartTooltipContent hideLabel />} 
            />

            {/* Line Chart */}
            <Line
              dataKey="users"
              type="monotone"
              stroke={chartConfig.users.color}
              strokeWidth={3}
              dot={{ 
                fill: chartConfig.users.color, 
                stroke: chartConfig.users.color,
                strokeWidth: 2,
                r: 4 
              }}
              activeDot={{ 
                r: 6, 
                fill: chartConfig.users.color,
                stroke: '#fff',
                strokeWidth: 2 
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}