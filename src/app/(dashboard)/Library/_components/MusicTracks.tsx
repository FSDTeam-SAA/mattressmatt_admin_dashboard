/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Search, Play, Calendar, Clock, Users, Mountain } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function MusicTracks() {
  const [selectedTracks, setSelectedTracks] = useState<number[]>([]);

  const tracks = [
    {
      id: 1,
      title: "Gentle Rain",
      studio: "Nature Sounds Studio",
      size: "42.3 MB",
      category: "Nature Sounds",
      duration: "45h 20m",
      plays: "1250 plays",
      status: "Active",
      uploadDate: "15/01/2025",
      tags: ["rain", "relaxing"],
    },
    {
      id: 2,
      title: "Gentle Rain",
      studio: "Nature Sounds Studio",
      size: "42.3 MB",
      category: "Nature Sounds",
      duration: "45h 20m",
      plays: "1250 plays",
      status: "Active",
      uploadDate: "15/01/2025",
      tags: ["rain", "relaxing"],
    },
    {
      id: 3,
      title: "Gentle Rain",
      studio: "Nature Sounds Studio",
      size: "42.3 MB",
      category: "Nature Sounds",
      duration: "45h 20m",
      plays: "1250 plays",
      status: "Inactive",
      uploadDate: "15/01/2025",
      tags: ["rain", "relaxing"],
    },
  ];

  const handleTrackSelect = (trackId: any) => {
    setSelectedTracks((prev) =>
      prev.includes(trackId)
        ? prev.filter((id) => id !== trackId)
        : [...prev, trackId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTracks.length === tracks.length) {
      setSelectedTracks([]);
    } else {
      setSelectedTracks(tracks.map((track) => track.id));
    }
  };

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Header with Search and Filters */}
        <div className="flex items-center mb-6 flex-wrap gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search track, artist"
              className="w-full border bg-transparent rounded-full border-gray-700 pl-10 pr-4 !h-[48px] text-white placeholder-gray-400 focus:outline-none focus:border-gray-600"
            />
          </div>

          <div className="flex items-center gap-3">
            <Select>
              <SelectTrigger className="w-[180px] !h-[48px] rounded-full border border-gray-700 bg-transparent text-white">
                <SelectValue placeholder="Select a fruit" className=" " />
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

            <Select>
              <SelectTrigger className="w-[180px] !h-[48px] rounded-full border border-gray-700 bg-transparent text-white">
                <SelectValue placeholder="All Status" className=" " />
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
          </div>
        </div>

        {/* Music Tracks Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            Music Tracks ({tracks.length})
          </h2>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-gray-700 overflow-hidden">
          {/* Table Header */}
          <div className="border-b border-gray-700">
            <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-400">
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedTracks.length === tracks.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
              </div>
              <div className="col-span-3">Track</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Duration</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Performance</div>
              <div className="col-span-1">Upload Date</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-700">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-700 transition-colors"
              >
                {/* Checkbox */}
                <div className="col-span-1 flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedTracks.includes(track.id)}
                    onChange={() => handleTrackSelect(track.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                </div>

                {/* Track Info */}
                <div className="col-span-3 flex items-center gap-3">
                  <button className="flex items-center justify-center w-10 h-10 transition-colors">
                    <Play
                      className="ml-0.5 text-blue-600 w-6 h-6"
                      size={16}
                    />
                  </button>
                  <div>
                    <div className="text-white font-medium">{track.title}</div>
                    <div className="text-gray-400 text-sm">
                      {track.studio} • {track.size}
                    </div>
                    <div className="flex gap-2 mt-1">
                      {track.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="col-span-2 flex items-center">
                  <div className="flex items-center gap-2">
                    <Mountain className="text-blue-400" size={16} />
                    <span className="text-gray-300">{track.category}</span>
                  </div>
                </div>

                {/* Duration */}
                <div className="col-span-2 flex items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="text-gray-400" size={16} />
                    <span className="text-gray-300">{track.duration}</span>
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-2 flex items-center">
                  <div className="flex items-center gap-2">
                    <Users className="text-gray-400" size={16} />
                    <span className="text-gray-300 mr-2">{track.plays}</span>
                  </div>
                </div>

                {/* Performance */}
                <div className="col-span-1 flex items-center">
                  <div className="">
                    <span
                      className={`text-xs font-medium ${
                        track.status === "Active"
                          ? " text-green-400"
                          : " text-orange-400"
                      }`}
                    >
                      {track.status}
                    </span>
                  </div>
                </div>

                {/* Upload Date */}
                <div className="col-span-1 flex items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-gray-400" size={16} />
                    <span className="text-gray-300 text-sm">
                      {track.uploadDate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-gray-400 text-sm">Page 1 of 10</div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-transparent border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-transparent border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicTracks;
