"use client";
import { Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

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

function UploadTrackList() {
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
    // Example play functionality
    const audio = new Audio(trackUrl);
    audio.play();
    console.log("Playing track:", trackUrl);
  };

  if (isLoading) return <div className="text-white">Loading tracks...</div>;
  if (isError) return <div className="text-red-500">Failed to load tracks</div>;
  if (tracks.length === 0)
    return <div className="text-gray-400">No tracks available</div>;

  return (
    <div className="">
      <div className="space-y-2">
        {tracks.map((track) => (
          <div
            key={track._id}
            className="border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Checkbox
              <input
                type="checkbox"
                checked={selectedTracks.includes(track._id)}
                onChange={() => handleTrackSelect(track._id)}
                className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
              /> */}

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

export default UploadTrackList;
