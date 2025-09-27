"use client";
import React, { useState } from "react";
import { Play } from "lucide-react";
import Image from "next/image";

function UploadTrackList() {
  const [selectedTracks, setSelectedTracks] = useState<number[]>([]);

  const tracks = [
    {
      id: 1,
      title: "Drop It Like It's Hot",
      artist: "Snoop Dogg",
      thumbnail:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop&crop=center",
    },
    {
      id: 2,
      title: "Drop It Like It's Hot",
      artist: "Snoop Dogg",
      thumbnail:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop&crop=center",
    },
    {
      id: 3,
      title: "Drop It Like It's Hot",
      artist: "Snoop Dogg",
      thumbnail:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop&crop=center",
    },
    {
      id: 4,
      title: "Drop It Like It's Hot",
      artist: "Snoop Dogg",
      thumbnail:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop&crop=center",
    },
    {
      id: 5,
      title: "Drop It Like It's Hot",
      artist: "Snoop Dogg",
      thumbnail:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop&crop=center",
    },
  ];

  const handleTrackSelect = (trackId: number) => {
    setSelectedTracks((prev) =>
      prev.includes(trackId)
        ? prev.filter((id) => id !== trackId)
        : [...prev, trackId]
    );
  };

  const handlePlay = (trackId: number) => {
    // Handle play functionality
    console.log("Playing track:", trackId);
  };

  return (
    <div className="">
      <div className="">
        <div className="space-y-2">
          {tracks.map((track) => (
            <div
              key={track.id}
              className=" border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedTracks.includes(track.id)}
                  onChange={() => handleTrackSelect(track.id)}
                  className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                />

                {/* Thumbnail */}
                <div className="relative w-14 h-14 flex-shrink-0">
                  <Image
                    width={300}
                    height={300}
                    src={track.thumbnail}
                    alt={track.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-green-500/20 rounded-lg"></div>
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-base truncate">
                    {track.title}
                  </h3>
                  <p className="text-gray-400 text-sm truncate">
                    {track.artist}
                  </p>
                </div>

                {/* Play Button */}
                <button
                  onClick={() => handlePlay(track.id)}
                  className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors flex-shrink-0"
                >
                  <Play className="text-white ml-0.5" size={16} fill="white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UploadTrackList;
