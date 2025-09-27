import React from 'react';
import { Users, Music, Play, Star, TrendingUp } from 'lucide-react';

function OverViewCard() {
  const cardData = [
    {
      icon: Users,
      title: "Total Users",
      value: "05",
      change: "+1,234 this month",
      trend: "up"
    },
    {
      icon: Music,
      title: "Music Tracks",
      value: "02",
      change: "+32 this week",
      trend: "up"
    },
    {
      icon: Play,
      title: "Total Plays",
      value: "01",
      change: "+1,234 this month",
      trend: "up"
    },
    {
      icon: Star,
      title: "Avg. rating",
      value: "04",
      change: "1,234 Reviews",
      trend: "up"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="border rounded-[20px] p-6 relative overflow-hidden backdrop-blur-0 border-gray-700 shadow-2xl"
        >
          {/* Top section with icon and trend */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 border border-gray-700 rounded-[12px]">
              <div className='w-[60px] h-[60px] flex items-center justify-center'>
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
          <div className="text-gray-400 text-xs">
            {card.change}
          </div>
          
          {/* Background decoration */}
          {/* <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
            <div className="w-full h-full bg-gradient-to-br from-orange-500 to-transparent rounded-full transform translate-x-6 -translate-y-6"></div>
          </div> */}
        </div>
      ))}
    </div>
  );
}

export default OverViewCard;