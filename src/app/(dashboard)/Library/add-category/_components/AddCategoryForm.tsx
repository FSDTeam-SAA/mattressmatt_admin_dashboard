"use client";
import React, { useState } from "react";
import {
  Trash2,
  Upload,
  Leaf,
  Moon,
  Music,
  Volume2,
  Waves,
  Headphones,
  Settings,
  Folder,
  CloudDownload,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function AddCategoryForm() {
  const [dragActive, setDragActive] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const categories = [
    {
      id: 1,
      name: "Nature Sound",
      tracks: 324,
      icon: Leaf,
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
      name: "Snooze Sounds",
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

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log("Files dropped:", e.dataTransfer.files);
    }
  };

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-white space-y-1">
            <h2>Upload Track</h2>
            <p>Add new audio content to your Snooze library</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-transparent text-white !h-[48px] rounded-full border border-gray-700 text-lg"
            >
              <Trash2 size={16} className="!w-6 !h-6 text-red-700" />
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-transparent text-white !h-[48px] rounded-full border border-gray-700 text-lg"
            >
              <Upload size={16} className="!w-6 !h-6" />
              Upload All (0)
            </Button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 border border-gray-700 rounded-xl p-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="border flex gap-[25px] border-gray-700 rounded-xl p-4 hover:bg-gray-750 hover:border-gray-600 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3  ${category.iconColor}`}>
                    <IconComponent size={24} />
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {category.tracks} track{category.tracks !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Drag & Drop Area */}
          <div className="lg:col-span-2 border rounded-[20px] p-6 relative overflow-hidden backdrop-blur-0 border-gray-700 shadow-2xl">
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive ? "border-blue-400" : "border-gray-600"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 border border-blue-600 rounded-full flex items-center justify-center mb-6">
                  <CloudDownload className="text-blue-700 !h-8 !w-8" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  Drag & drop
                </h3>
                <p className="text-gray-400 mb-6">Supports SVG, PNG, JPG</p>

                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent text-white !h-[48px] rounded-full border border-gray-700 text-lg"
                >
                  <Folder className="!w-6 !h-6" />
                  Browse Files
                </Button>
              </div>
            </div>
          </div>

          {/* Global Settings */}
          <div className=" border border-gray-700 rounded-lg p-6 h-fit">
            <div className="flex items-center gap-2">
              <Settings className="text-gray-400" size={20} />
              <h3 className="text-base font-semibold text-white">
                Global Settings
              </h3>
            </div>

            <div className="space-y-6">
              {/* Category Name */}
              <div className="mt-6">
                <label className="block text-white font-medium mb-3">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="Artists name here"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full bg-transparent border border-gray-600 rounded-full px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryForm;
