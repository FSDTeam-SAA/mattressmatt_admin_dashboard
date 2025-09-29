"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

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
  ChartTooltipContent,
} from "@/components/ui/chart";

interface OverviewCounts {
  totalUsers: number;
  totalTracks: number;
  totalPlays: number;
}

interface OverviewData {
  counts: OverviewCounts;
  graph: { day: string; count: number }[];
}

interface MusicOverviewResponse {
  success: boolean;
  message: string;
  data: OverviewData;
}

export const description = "A line chart with dots";

const chartConfig = {
  users: {
    label: "Plays",
    color: "#f97316", // Orange color
  },
} satisfies ChartConfig;

export function PerformanceAnalyticsChart() {
  const { data, isLoading, isError } = useQuery<MusicOverviewResponse>({
    queryKey: ["musicOverview"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/music/overview`
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch music data");
      }
      return res.json();
    },
  });

  // Skeleton loader while fetching
  if (isLoading)
    return (
      <Card className="rounded-[20px] border-gray-700 backdrop-blur-sm shadow-2xl h-[400px] flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-xl font-semibold">
            <Skeleton className="h-6 w-48 bg-gray-600/70 animate-pulse" />
          </CardTitle>
          <CardDescription className="text-gray-400 text-sm">
            <Skeleton className="h-4 w-32 bg-gray-600/70 animate-pulse mt-1" />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-6">
          <Skeleton className="h-[280px] w-full rounded-[12px] bg-gray-600/70 animate-pulse" />
        </CardContent>
      </Card>
    );

  if (isError || !data?.data)
    return <div className="text-red-500">Failed to load dashboard data.</div>;

  // Use API graph data
  const chartData = data.data.graph.map((item) => ({
    day: item.day,
    users: item.count,
  }));

  return (
    <Card className="rounded-[20px] border-gray-700 backdrop-blur-sm shadow-2xl h-[400px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl font-semibold">
          Performance Analytics
        </CardTitle>
        <CardDescription className="text-gray-400 text-sm">Weekly plays</CardDescription>
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
            />

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
              domain={[0, Math.max(...chartData.map((d) => d.users)) + 1]}
              width={40}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />

            <Tooltip content={<ChartTooltipContent hideLabel />} cursor={false} />

            <Line
              dataKey="users"
              type="monotone"
              stroke={chartConfig.users.color}
              strokeWidth={3}
              dot={{
                fill: chartConfig.users.color,
                stroke: chartConfig.users.color,
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                r: 6,
                fill: chartConfig.users.color,
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
