import React from "react";
import { Headphones, Music, Play, TrendingUp, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function LibraryCard() {
  const cardData = [
    {
      icon: Music,
      title: "Total Users",
      value: "24,645",
      change: "+1,234 this month",
      trend: "up",
    },
    {
      icon: Play,
      title: "Music Tracks",
      value: "4,645",
      change: "+32 this week",
      trend: "up",
    },
    {
      icon: Play,
      title: "Total Plays",
      value: "24,645",
      change: "+1,234 this month",
      trend: "up",
    },
    {
      icon: Headphones,
      title: "Avg. rating",
      value: "24,645",
      change: "1,234 Reviews",
      trend: "up",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="text-white space-y-1">
          <h2>Music Library</h2>
          <p>Manage your audio content and Snooze track</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((card, index) => (
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
