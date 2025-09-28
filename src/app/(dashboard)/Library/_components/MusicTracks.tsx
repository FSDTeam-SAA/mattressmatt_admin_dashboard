"use client";
import { Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface MusicTrack {
  _id: string;
  title: string;
  artist: string;
  category: {
    _id: string;
    name: string;
  };
  url: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

function MusicTracks() {
  // Fetch tracks from API
  const {
    data: musicData,
    isLoading,
    isError,
  } = useQuery<{ success: boolean; data: MusicTrack[] }>({
    queryKey: ["music"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/music`
      );
      if (!res.ok) throw new Error("Failed to fetch music");
      return res.json();
    },
  });

  const tracks = musicData?.data || [];

  const handlePlay = (trackUrl: string) => {
    const audio = new Audio(trackUrl);
    audio.play();
    console.log("Playing track:", trackUrl);
  };

  if (isError) return <div className="text-red-500">Failed to load tracks</div>;
  if (!isLoading && tracks.length === 0)
    return <div className="text-gray-400">No tracks available</div>;

  return (
    <div className="">
      <div className="space-y-2">
        {isLoading
          ? Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="border border-gray-700 rounded-lg p-4 flex items-center gap-4 animate-pulse"
              >
                <Skeleton className="flex-1 h-12 rounded-md bg-gray-600/70" />
                <Skeleton className="w-10 h-10 rounded-full bg-gray-600/70" />
              </div>
            ))
          : tracks.map((track) => (
              <div
                key={track._id}
                className="border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-base truncate">
                      {track.title}
                    </h3>
                    <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                    <p className="text-gray-500 text-xs truncate mt-1">
                      Category: {track.category.name}
                    </p>
                  </div>

                  {/* Play Button */}
                  <button
                    onClick={() => handlePlay(track.url)}
                    className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors flex-shrink-0"
                  >
                    <Play className="text-white ml-0.5" size={16} fill="white" />
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default MusicTracks;
