/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef } from "react";
import {
  Upload,
  Trash2,
  Settings,
  Folder,
  ChevronDown,
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface Thumbnail {
  public_id: string | null;
  url: string | null;
}

interface Category {
  _id: string;
  name: string;
  trackCount: number;
  thumbnail: Thumbnail;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function UploadTrackForm() {
  const [dragActive, setDragActive] = useState(false);
  const [musicName, setMusicName] = useState("");
  const [defaultArtist, setDefaultArtist] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch categories
  const {
    data: categoryData,
    isLoading,
    isError,
  } = useQuery<{
    success: boolean;
    message: string;
    data: Category[];
  }>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/category`
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch categories");
      }
      return res.json();
    },
  });

  // Mutation for uploading music
  const uploadMusicMutation = useMutation({
    mutationFn: async () => {
      if (!selectedFile) throw new Error("No file selected");

      const formData = new FormData();
      formData.append("title", musicName);
      formData.append("artist", defaultArtist);
      if (selectedCategory) formData.append("category", selectedCategory);
      formData.append("audioFile", selectedFile);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/music`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to upload music");
      }
      return res.json();
    },
    onSuccess: (data) => {
      toast.success(data.message || "Music uploaded successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to upload music");
    },
  });

  // Drag & drop handlers
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  // Upload All button handler
  const handleUploadAll = () => {
    console.log("=== Upload All Data ===");
    console.log("Selected File:", selectedFile);
    console.log("Music Name:", musicName);
    console.log("Default Artist:", defaultArtist);
    console.log("Selected Category ID:", selectedCategory);
    console.log("=======================");

    // Trigger mutation
    uploadMusicMutation.mutate();
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
              onClick={handleUploadAll}
            >
              <Upload size={16} className="!w-6 !h-6" />
              Upload All (0)
            </Button>
          </div>
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

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="audio/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileSelect}
                />

                {/* Browse button */}
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent text-white !h-[48px] rounded-full border border-gray-700 text-lg"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Folder className="!w-6 !h-6" />
                  Browse Files
                </Button>

                {selectedFile && (
                  <p className="text-gray-300 mt-3 truncate max-w-[200px]">
                    Selected: {selectedFile.name}
                  </p>
                )}
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
                  placeholder="Music name here"
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
                  placeholder="Artist name here"
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
                  <Select onValueChange={(value) => setSelectedCategory(value)}>
                    <SelectTrigger className="w-full !h-[48px] rounded-full border border-gray-700 bg-transparent text-white">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {isLoading && (
                          <SelectItem value="loading" disabled>
                            Loading...
                          </SelectItem>
                        )}
                        {isError && (
                          <SelectItem value="error" disabled>
                            Failed to load
                          </SelectItem>
                        )}
                        {categoryData?.data?.map((cat) => (
                          <SelectItem key={cat._id} value={cat._id}>
                            {cat.name}
                          </SelectItem>
                        ))}
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
