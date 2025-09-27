import React from "react";
import { Users, UserCheck } from "lucide-react";
import { User } from "@/dataType/Type";

interface SnCardProps {
  users: User[];
}

function SnCard({ users }: SnCardProps) {
  const totalUsers = users?.length;
  const verifiedUsers = users?.filter((user) => user.verificationInfo.verified).length;
  
  const cardData = [
    {
      icon: Users,
      title: "Total Users",
      value: totalUsers?.toLocaleString(),
      change: `${Math.floor(totalUsers * 0.05)} new this month`, // example change
    },
    {
      icon: UserCheck,
      title: "Verified Users",
      value: verifiedUsers?.toLocaleString(),
      change: `${Math.floor(verifiedUsers * 0.02)} new this month`, // example change
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="border rounded-[20px] p-6 relative overflow-hidden backdrop-blur-0 border-gray-700 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 border border-gray-700 rounded-[12px] flex items-center justify-center w-[60px] h-[60px]">
              <card.icon className="!w-10 !h-10 text-white" />
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
    </div>
  );
}

export default SnCard;
