import React from "react";
import { Users, Music, Play, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // ShadCN Skeleton import

interface Counts {
  totalUsers: number;
  totalTracks: number;
  totalPlays: number;
}

interface OverviewData {
  counts: Counts;
  graph?: { day: string; count: number }[];
}

interface OverViewCardProps {
  overview?: OverviewData;
  isLoading?: boolean; // optional loading prop
}

interface CardItem {
  icon: React.ElementType;
  title: string;
  value: number;
  change: string;
  trend: "up" | "down";
}

const OverViewCard: React.FC<OverViewCardProps> = ({ overview, isLoading }) => {
  const counts = overview?.counts ?? {
    totalUsers: 0,
    totalTracks: 0,
    totalPlays: 0,
  };

  const cardData: CardItem[] = [
    {
      icon: Users,
      title: "Total Users",
      value: counts.totalUsers,
      change: "+1,234 this month",
      trend: "up",
    },
    {
      icon: Music,
      title: "Music Tracks",
      value: counts.totalTracks,
      change: "+32 this week",
      trend: "up",
    },
    {
      icon: Play,
      title: "Total Plays",
      value: counts.totalPlays,
      change: "+1,234 this month",
      trend: "up",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="border rounded-[20px] p-6 relative overflow-hidden backdrop-blur-0 border-gray-700 shadow-2xl"
        >
          {/* Top section with icon and trend */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 border border-gray-700 rounded-[12px]">
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                {isLoading ? (
                  <Skeleton className="w-10 h-10 rounded-full bg-gray-600/70" />
                ) : (
                  <card.icon className="!w-10 !h-10 text-white" />
                )}
              </div>
            </div>
            <div className="text-orange-500">
              {isLoading ? (
                <Skeleton className="w-7 h-7 rounded-full bg-gray-600/70" />
              ) : (
                <TrendingUp className="!w-7 !h-7" />
              )}
            </div>
          </div>

          {/* Main value */}
          <div className="mb-1">
            {isLoading ? (
              <Skeleton className="h-8 w-24 rounded-md bg-gray-600/70" />
            ) : (
              <h3 className="text-2xl font-bold text-white">{card.value}</h3>
            )}
          </div>

          {/* Title */}
          <div className="mb-2">
            {isLoading ? (
              <Skeleton className="h-4 w-20 rounded-md bg-gray-600/70" />
            ) : (
              <p className="text-gray-400 text-sm font-medium">{card.title}</p>
            )}
          </div>

          {/* Change indicator */}
          <div className="text-gray-400 text-xs">
            {isLoading ? (
              <Skeleton className="h-3 w-28 rounded-md bg-gray-600/70" />
            ) : (
              card.change
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverViewCard;
