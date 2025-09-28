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
import { Skeleton } from "@/components/ui/skeleton";

interface GraphDataItem {
  day: string;
  count: number;
}

interface UserActivityCharProps {
  graphData?: GraphDataItem[];
  isLoading?: boolean; // optional loading prop
}

const chartConfig = {
  users: {
    label: "Users",
    color: "#f97316", // Orange
  },
} satisfies ChartConfig;

export function UserActivityChar({ graphData = [], isLoading }: UserActivityCharProps) {
  // Transform API data to match chart key
  const chartData = graphData.map((item) => ({
    day: item.day,
    users: item.count,
  }));

  return (
    <Card className="rounded-[20px] border-gray-700 backdrop-blur-sm shadow-2xl h-[400px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl font-semibold">
          {isLoading ? <Skeleton className="h-6 w-40 rounded-md bg-gray-600/70" /> : "User Activity"}
        </CardTitle>
        <CardDescription className="text-gray-400 text-sm">
          {isLoading ? <Skeleton className="h-4 w-60 rounded-md bg-gray-600/50" /> : "Daily active users over the last 7 days"}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-6">
        {isLoading ? (
          <Skeleton className="h-[280px] w-full rounded-md bg-gray-600/70" />
        ) : (
          <ChartContainer config={chartConfig} className="h-[280px] w-full">
            <LineChart
              data={chartData}
              margin={{ left: 20, right: 30, top: 20, bottom: 20 }}
              className="h-full w-full"
            >
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" strokeDasharray="0" />

              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                allowDecimals={false}
                domain={[0, Math.max(...chartData.map(d => d.users)) + 2]}
                width={40}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />

              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

              <Line
                dataKey="users"
                type="monotone"
                stroke={chartConfig.users.color}
                strokeWidth={3}
                dot={{ fill: chartConfig.users.color, stroke: chartConfig.users.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: chartConfig.users.color, stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
