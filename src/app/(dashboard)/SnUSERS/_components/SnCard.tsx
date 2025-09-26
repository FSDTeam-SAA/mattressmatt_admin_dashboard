import React from 'react';
import { Users, TrendingUp, UserCheck, Star } from 'lucide-react';

function SnCard() {
  const cardData = [
    {
      icon: Users,
      title: "Total Users",
      value: "24,645",
      change: "+1,234 this month",
      trend: "up",
    },
    {
      icon: UserCheck,
      title: "Music Tracks",
      value: "4,645",
      change: "+32 this week",
      trend: "up",
    },
  ];

  const thirdCardData = {
    icon: Star,
    title: "Total Plays",
    value: "12,345",
    change: "+543 this week",
    trend: "up",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {/* First two cards */}
      {cardData.map((card, index) => (
        <div
          key={index}
          className="border rounded-[20px] p-6 relative overflow-hidden backdrop-blur-0 border-gray-700 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 border border-gray-700 rounded-[12px] flex items-center justify-center w-[60px] h-[60px]">
              <card.icon className="!w-10 !h-10 text-white" />
            </div>
            <div className="text-orange-500">
              <TrendingUp className="!w-7 !h-7" />
            </div>
          </div>

          <div className="mb-1">
            <h3 className="text-2xl font-bold text-white">{card.value}</h3>
          </div>

          <div className="mb-2">
            <p className="text-gray-400 text-sm font-medium">{card.title}</p>
          </div>

          <div className="text-gray-400 text-xs">{card.change}</div>
        </div>
      ))}

      {/* Third card */}
      <div className="border rounded-[20px] p-6 relative overflow-hidden backdrop-blur-lg border-gray-700 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 border border-gray-700 rounded-[12px] flex items-center justify-center w-[60px] h-[60px]">
            <thirdCardData.icon className="!w-10 !h-10 text-white" />
          </div>
          {/* <div className="text-orange-500">
            <TrendingUp className="!w-7 !h-7" />
          </div> */}
          <div className='border py-1 px-3 rounded-xl relative overflow-hidden backdrop-blur-0 border-gray-700 shadow-2xl text-white'>
            Avg
          </div>
        </div>

        <div className="mb-1">
          <h3 className="text-2xl font-bold text-white">{thirdCardData.value}</h3>
        </div>

        <div className="mb-2">
          <p className="text-gray-400 text-sm font-medium">{thirdCardData.title}</p>
        </div>

        <div className="text-gray-400 text-xs">{thirdCardData.change}</div>
      </div>
    </div>
  );
}

export default SnCard;
