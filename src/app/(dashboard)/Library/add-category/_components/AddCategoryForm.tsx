/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Settings,
  Folder,
  CloudDownload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
  trackCount: number;
  thumbnail: {
    public_id: string | null;
    url: string | null;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function AddCategoryForm() {
  const [dragActive, setDragActive] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // Fetch categories
  const {
    data: categoryData,
    isLoading,
    isError,
    refetch,
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
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  // Add category mutation
  const addCategoryMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("name", categoryName);
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/category`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Failed to add category");
      return res.json();
    },
    onSuccess: () => {
      setCategoryName("");
      setThumbnailFile(null);
      refetch();
    },
    onError: (err: any) => {
      console.error("Error adding category:", err.message);
    },
  });

  // Drag & Drop
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
      setThumbnailFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  return (
    <div>
      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 border border-gray-700 rounded-xl p-6">
        {isLoading && <p className="text-gray-400">Loading categories...</p>}
        {isError && <p className="text-red-500">Failed to load categories</p>}
        {categoryData?.data.map((category) => {
          // const IconComponent = iconMap[category.name] || Leaf;
          return (
            <div
              key={category._id}
              className="border flex gap-4 border-gray-700 rounded-xl p-4 hover:bg-gray-750 hover:border-gray-600 transition-all duration-200 cursor-pointer group"
            >
              {/* <div className="p-3 text-gray-400">
                <IconComponent size={24} />
              </div> */}

              <div className="flex items-center gap-3">
                {/* Thumbnail Image */}
                {category.thumbnail?.url && (
                  <div className="w-10 h-10 rounded-md overflow-hidden border border-gray-600">
                    <Image
                      src={category.thumbnail.url}
                      alt={category.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Category Info */}
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {category.trackCount} track
                    {category.trackCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload + Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Drag & Drop */}
        <div
          className={`lg:col-span-2 border-2 border-dashed rounded-lg p-12 text-center transition-all ${
            dragActive
              ? "border-blue-400 bg-gray-800/40"
              : "border-gray-600 bg-gray-800/20"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CloudDownload className="mx-auto mb-4 text-blue-500 w-14 h-14" />
          <h3 className="text-xl font-semibold text-white mb-2">Drag & Drop</h3>
          <p className="text-gray-400 mb-6 text-sm">
            Supports PNG, JPG up to 5MB
          </p>

          <input
            type="file"
            accept="image/*"
            id="fileInput"
            className="hidden"
            onChange={handleFileSelect}
          />

          {/* Button as label */}
          <Button
            asChild
            variant="outline"
            className="flex items-center gap-2 bg-transparent text-white !h-[46px] rounded-full border border-gray-700 hover:border-blue-500 hover:text-blue-400 text-base cursor-pointer transition-all"
          >
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex items-center gap-2"
            >
              <Folder className="!w-5 !h-5" />
              Browse Files
            </label>
          </Button>

          {/* Preview */}
          {thumbnailFile && (
            <div className="mt-6 flex flex-col items-center">
              <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-600 shadow-md">
                <Image
                  width={400}
                  height={400}
                  src={URL.createObjectURL(thumbnailFile)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 text-gray-300 text-sm truncate max-w-[140px]">
                {thumbnailFile.name}
              </p>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="border border-gray-700 rounded-lg p-6 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="text-gray-400" size={20} />
            <h3 className="text-base font-semibold text-white">
              Global Settings
            </h3>
          </div>

          <label className="block text-white font-medium mb-3">
            Category Name
          </label>
          <input
            type="text"
            placeholder="Category name here"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full bg-transparent border border-gray-600 rounded-full px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
          />

          <Button
            onClick={() => addCategoryMutation.mutate()}
            variant="outline"
            className="w-full mt-4 flex items-center justify-center gap-2 bg-transparent text-white !h-[48px] rounded-full border border-gray-700 text-lg"
            disabled={!categoryName || !thumbnailFile}
          >
            Add Category
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryForm;
