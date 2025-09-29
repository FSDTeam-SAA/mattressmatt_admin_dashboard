/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

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

function CategoryOverview() {
  const { data: categoryData, isLoading, isError } = useQuery<{
    success: boolean;
    message: string;
    data: Category[];
  }>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/category`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch categories");
      }
      return res.json();
    },
  });

  if (isError) return <div className="text-red-500">Failed to load categories</div>;

  return (
    <div>
      <div>
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
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="border flex gap-[15px] border-gray-700 rounded-xl p-6 animate-pulse"
                >
                  {/* Skeleton Thumbnail */}
                  <Skeleton className="w-10 h-10 rounded-md bg-gray-600/70" />

                  {/* Skeleton Info */}
                  <div className="flex-1">
                    <Skeleton className="h-6 w-32 mb-2 rounded-md bg-gray-600/70" />
                    <Skeleton className="h-4 w-24 rounded-md bg-gray-600/70" />
                  </div>
                </div>
              ))
            : categoryData?.data.map((category) => {
                return (
                  <div
                    key={category._id}
                    className="border flex gap-[15px] border-gray-700 rounded-xl p-6 hover:bg-gray-750 hover:border-gray-600 transition-all duration-200 cursor-pointer group"
                  >
                    {/* Thumbnail Image */}
                    {category.thumbnail?.url ? (
                      <div className="w-10 h-10 rounded-md overflow-hidden border border-gray-600">
                        <Image
                          src={category.thumbnail.url}
                          alt={category.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-md bg-gray-700 flex items-center justify-center text-gray-400">
                        {category.name[0]}
                      </div>
                    )}

                    {/* Category Info */}
                    <div>
                      <h3 className="text-white font-semibold text-[24px] mb-1 group-hover:text-gray-100">
                        {category.name}
                      </h3>
                      <p className="text-[#F0F8FF] text-sm">
                        {category.trackCount} track{category.trackCount !== 1 ? "s" : ""}
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
