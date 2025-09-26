import Image from "next/image";
import React from "react";

function MostPlayedMusicList() {
  const musicData = [
    {
      id: 1,
      title: "Drop It Like It's Hot",
      artist: "Snoop Dogg",
      duration: "(04:34)",
      plays: "1,234",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop&crop=faces",
    },
    {
      id: 2,
      title: "Drop It Like It's Hot",
      artist: "Snoop Dogg",
      duration: "(04:34)",
      plays: "1,234",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=60&h=60&fit=crop&crop=faces",
    },
    {
      id: 3,
      title: "Drop It Like It's Hot",
      artist: "Snoop Dogg",
      duration: "(04:34)",
      plays: "1,234",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=60&h=60&fit=crop&crop=faces",
    },
    {
      id: 4,
      title: "Drop It Like It's Hot",
      artist: "Snoop Dogg",
      duration: "(04:34)",
      plays: "1,234",
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=60&h=60&fit=crop&crop=faces",
    },
    {
      id: 5,
      title: "Drop It Like It's Hot",
      artist: "Snoop Dogg",
      duration: "(04:34)",
      plays: "1,234",
      image:
        "https://images.unsplash.com/photo-1571974599782-87624638275c?w=60&h=60&fit=crop&crop=faces",
    },
  ];

  return (
    <div className=" border border-gray-700 rounded-2xl p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-white text-lg font-semibold mb-1">
          Most Played Music
        </h2>
        <p className="text-gray-400 text-sm">Top tracks play count</p>
      </div>

      {/* Music List */}
      <div className="space-y-4">
        {musicData.map((track) => (
          <div
            key={track.id}
            className="flex items-center gap-3 group hover:bg-gray-800/50 p-2 rounded-lg transition-colors"
          >
            {/* Album Art */}
            <div className="relative flex-shrink-0">
              <Image
                width={200}
                height={200}
                src={track.image}
                alt={track.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-sm font-medium truncate">
                {track.title}
              </h3>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-gray-400 text-xs">{track.artist}</span>
                <span className="text-gray-500 text-xs">•</span>
                <span className="text-gray-400 text-xs">{track.duration}</span>
              </div>
            </div>

            {/* Play Count */}
            <div className="text-right flex-shrink-0">
              <div className="text-white text-sm font-medium">
                {track.plays}
              </div>
              <div className="text-gray-400 text-xs">Plays</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MostPlayedMusicList;
