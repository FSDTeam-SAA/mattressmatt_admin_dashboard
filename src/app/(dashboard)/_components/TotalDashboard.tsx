"use client";
import React from "react";
import OverViewCard from "./OverViewCard";
import { UserActivityChar } from "./UserActivityChar";
import MostPlayedMusicList from "./MostPlayedMusicList";
import RecentlyaddedMusicList from "./RecentlyaddedMusicList";
import { useQuery } from "@tanstack/react-query";

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

function TotalDashboard() {
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

  if (isError) {
    return <div>Failed to load dashboard data.</div>;
  }

  return (
    <div>
      <div>
        {/* Pass isLoading to OverViewCard to show skeletons */}
        <OverViewCard overview={data?.data} isLoading={isLoading} />
      </div>

      <div className="mt-10">
        <UserActivityChar graphData={data?.data?.graph || []} />
      </div>

      <div className="mt-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
        <MostPlayedMusicList />
        <RecentlyaddedMusicList />
      </div>
    </div>
  );
}

export default TotalDashboard;
