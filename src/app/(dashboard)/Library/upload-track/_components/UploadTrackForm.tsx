"use client";
import React, { useState } from "react";
import {
  Upload,
  Trash2,
  Clock,
  RefreshCw,
  CheckCircle,
  Settings,
  Folder,
  ChevronDown,
  Music,
  CloudDownload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function UploadTrackForm() {
  const [dragActive, setDragActive] = useState(false);
  const [musicName, setMusicName] = useState("");
  const [defaultArtist, setDefaultArtist] = useState("");

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
      // Handle file upload logic here
      console.log("Files dropped:", e.dataTransfer.files);
    }
  };

  const statusCards = [
    {
      icon: Music,
      iconColor: "text-red-400",
      count: 0,
      label: "Total Files",
    },
    {
      icon: Clock,
      iconColor: "text-blue-400",
      count: 0,
      label: "Total Files",
    },
    {
      icon: RefreshCw,
      iconColor: "text-orange-400",
      count: 0,
      label: "Total Files",
    },
    {
      icon: CheckCircle,
      iconColor: "text-green-400",
      count: 0,
      label: "Total Files",
    },
  ];

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

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statusCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className="border rounded-[20px] p-6 relative overflow-hidden backdrop-blur-0 border-gray-700 shadow-2xl flex items-center gap-10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <IconComponent className={card.iconColor} size={20} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {card.count}
                  </div>
                  <div className="text-gray-400 text-sm">{card.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2 flex border rounded-[20px] p-6 relative overflow-hidden backdrop-blur-0 border-gray-700 shadow-2xl">
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors flex-1 ${
                dragActive
                  ? "border-blue-400 bg-transparent"
                  : "border-gray-600 bg-transparent hover:border-gray-500"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-20 h-20 border border-blue-600 rounded-full flex items-center justify-center mb-6">
                  <CloudDownload className="text-blue-700 !h-8 !w-8" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  Drag & drop audio files
                </h3>
                <p className="text-gray-400 mb-6">
                  Supports MP3, WAV, FLAC, AAC files up to 100MB each
                </p>
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
          <div className="border border-gray-700 rounded-lg p-6 flex flex-col h-full">
            <div className="flex items-center gap-2">
              <Settings className="text-gray-400" size={20} />
              <h3 className="text-lg font-semibold text-white">
                Global Settings
              </h3>
            </div>

            <p className="text-gray-400 text-sm mb-6">
              Apply metadata to all files
            </p>

            <div className="space-y-6 flex-1">
              {/* Music Name */}
              <div>
                <label className="block text-white font-medium mb-3">
                  Music Name
                </label>
                <input
                  type="text"
                  placeholder="Artists name here"
                  value={musicName}
                  onChange={(e) => setMusicName(e.target.value)}
                  className="w-full border bg-transparent rounded-full border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
                />
              </div>

              {/* Default Artist */}
              <div>
                <label className="block text-white font-medium mb-3">
                  Default Artist
                </label>
                <input
                  type="text"
                  placeholder="Artists name here"
                  value={defaultArtist}
                  onChange={(e) => setDefaultArtist(e.target.value)}
                  className="w-full bg-transparent border border-gray-600 rounded-full px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
                />
              </div>

              {/* Default Category */}
              <div>
                <label className="block text-white font-medium mb-3">
                  Default Category
                </label>
                <div className="relative">
                  <Select>
                    <SelectTrigger className="w-full !h-[48px] rounded-full border border-gray-700 bg-transparent text-white">
                      <SelectValue placeholder="Select Category" className=" " />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadTrackForm;
