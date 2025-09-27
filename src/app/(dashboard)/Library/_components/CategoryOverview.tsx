import React from "react";
import {
  Plus,
  Moon,
  Volume2,
  Waves,
  Music,
  Headphones,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function CategoryOverview() {
  const categories = [
    {
      id: 1,
      name: "Nature Sound",
      tracks: 321,
      icon: Bell,
      iconColor: "text-blue-400",
    },
    {
      id: 2,
      name: "Meditation",
      tracks: 198,
      icon: Moon,
      iconColor: "text-purple-400",
    },
    {
      id: 3,
      name: "Instrumental",
      tracks: 198,
      icon: Music,
      iconColor: "text-cyan-400",
    },
    {
      id: 4,
      name: "Sleep Sounds",
      tracks: 324,
      icon: Volume2,
      iconColor: "text-red-400",
    },
    {
      id: 5,
      name: "Binaural Beats",
      tracks: 198,
      icon: Waves,
      iconColor: "text-orange-400",
    },
    {
      id: 6,
      name: "Sleep Stories",
      tracks: 198,
      icon: Headphones,
      iconColor: "text-green-400",
    },
  ];

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-base font-bold text-white mb-2 leading-[120%]">
              Categories Overview
            </h1>
            <p className="text-white text-sm">
              Track distribution across content categories
            </p>
          </div>
          <div>
            <Link href="/Library/add-category">
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-transparent text-white !h-[48px] rounded-full border border-gray-700 text-lg"
              >
                <Plus className="!w-6 !h-6" />
                Add Category
              </Button>
            </Link>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="border flex gap-[25px] border-gray-700 rounded-xl p-6 hover:bg-gray-750 hover:border-gray-600 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg group-hover:bg-gray-600 transition-colors ${category.iconColor}`}
                  >
                    <IconComponent size={24} />
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-[24px] mb-1 group-hover:text-gray-100">
                    {category.name}
                  </h3>
                  <p className="text-[#F0F8FF] text-sm">
                    {category.tracks} track{category.tracks !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoryOverview;
