"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Category {
  _id: string;
  name: string;
}

interface Track {
  _id: string;
  title: string;
  artist: string;
  category: Category;
  url: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function MostPlayedMusicList() {
  const { data: mostPlayedMusic, isLoading } = useQuery<{
    success: boolean;
    message: string;
    data: Track[];
  }>({
    queryKey: ["mostPlayedMusic"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/music/mostPlayed`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch most played music");
      }
      return res.json();
    },
  });

  return (
    <div className="border border-gray-700 rounded-2xl p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-white text-lg font-semibold mb-1">
          {isLoading ? <Skeleton className="h-6 w-44 rounded-md bg-gray-600/70" /> : "Most Played Music"}
        </h2>
        <div className="text-gray-400 text-sm">
          {isLoading ? <Skeleton className="h-4 w-36 rounded-md bg-gray-600/50" /> : "Top tracks play count"}
        </div>
      </div>

      {/* Music List */}
      <div className="space-y-4">
        {isLoading
          ? Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 rounded-lg">
                <Skeleton className="w-12 h-12 rounded-lg bg-gray-600/70 flex-shrink-0" />
                <div className="flex-1 min-w-0 space-y-1">
                  <Skeleton className="h-4 w-32 rounded-md bg-gray-600/70" />
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-3 w-20 rounded-md bg-gray-600/50" />
                    <Skeleton className="h-3 w-3 rounded-full bg-gray-600/50" />
                    <Skeleton className="h-3 w-16 rounded-md bg-gray-600/50" />
                  </div>
                </div>
                <div className="flex-shrink-0 space-y-1 text-right">
                  <Skeleton className="h-4 w-12 rounded-md bg-gray-600/70" />
                  <Skeleton className="h-3 w-8 rounded-md bg-gray-600/50" />
                </div>
              </div>
            ))
          : mostPlayedMusic?.data.map((track) => (
              <div
                key={track._id}
                className="flex items-center gap-3 group hover:bg-gray-800/50 p-2 rounded-lg transition-colors"
              >
                <div className="relative flex-shrink-0">
                  <Image
                    width={200}
                    height={200}
                    src={
                      track.isDefault
                        ? "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop&crop=faces"
                        : track.url
                    }
                    alt={track.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-sm font-medium truncate">{track.title}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-gray-400 text-xs">{track.artist}</span>
                    <span className="text-gray-500 text-xs">•</span>
                    <span className="text-gray-400 text-xs">{track.category.name}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-white text-sm font-medium">{track.isDefault ? "1,234" : "0"}</div>
                  <div className="text-gray-400 text-xs">Plays</div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default MostPlayedMusicList;
