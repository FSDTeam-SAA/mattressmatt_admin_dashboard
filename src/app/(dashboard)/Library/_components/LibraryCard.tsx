"use client";

import React from "react";
import { Music, Play, TrendingUp, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

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

function LibraryCard() {
  const { data, isLoading } = useQuery<MusicOverviewResponse>({
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

  const counts = data?.data?.counts;

  const cardData = [
    {
      icon: Music,
      title: "Total Users",
      value: counts?.totalUsers,
      change: "+1,234 this month",
    },
    {
      icon: Play,
      title: "Music Tracks",
      value: counts?.totalTracks,
      change: "+32 this week",
    },
    {
      icon: Play,
      title: "Total Plays",
      value: counts?.totalPlays,
      change: "+1,234 this month",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="text-white space-y-1">
          <h2 className="text-2xl font-bold">Music Library</h2>
          <p className="text-gray-400 text-sm">
            Manage your audio content and Snooze track
          </p>
        </div>
        <div>
          <Link href="/Library/upload-track">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-transparent text-white !h-[48px] rounded-full border border-gray-700 text-lg"
            >
              <Upload className="!w-6 !h-6" />
              Upload Track
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="border rounded-[20px] p-6 relative overflow-hidden backdrop-blur-0 border-gray-700 shadow-2xl"
              >
                {/* Top section */}
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="w-[60px] h-[60px] rounded-[12px] bg-gray-600/70 animate-pulse" />
                  <Skeleton className="w-7 h-7 bg-gray-600/70 animate-pulse" />
                </div>

                {/* Main value */}
                <div className="mb-1">
                  <Skeleton className="h-6 w-16 rounded-md bg-gray-600/70 animate-pulse" />
                </div>

                {/* Title */}
                <div className="mb-2">
                  <Skeleton className="h-4 w-24 rounded-md bg-gray-600/70 animate-pulse" />
                </div>

                {/* Change indicator */}
                <Skeleton className="h-3 w-32 rounded-md bg-gray-600/70 animate-pulse" />
              </div>
            ))
          : cardData.map((card, index) => (
              <div
                key={index}
                className="border rounded-[20px] p-6 relative overflow-hidden backdrop-blur-0 border-gray-700 shadow-2xl"
              >
                {/* Top section with icon and trend */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 border border-gray-700 rounded-[12px]">
                    <div className="w-[60px] h-[60px] flex items-center justify-center">
                      <card.icon className="!w-10 !h-10 text-white" />
                    </div>
                  </div>
                  <div className="text-orange-500">
                    <TrendingUp className="!w-7 !h-7" />
                  </div>
                </div>

                {/* Main value */}
                <div className="mb-1">
                  <h3 className="text-2xl font-bold text-white">{card.value}</h3>
                </div>

                {/* Title */}
                <div className="mb-2">
                  <p className="text-gray-400 text-sm font-medium">{card.title}</p>
                </div>

                {/* Change indicator */}
                <div className="text-gray-400 text-xs">{card.change}</div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default LibraryCard;
