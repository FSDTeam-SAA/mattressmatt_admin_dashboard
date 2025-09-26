"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface User {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  sleepScore: string;
  listeningTime: string;
  lastActivity: string;
  location: string;
  avatar: string;
}

const users: User[] = [
  {
    id: 1,
    name: "Sarah Jonson",
    email: "sarahjonson143@gmail.com",
    status: "Active",
    sleepScore: "8.5",
    listeningTime: "12h 12m",
    lastActivity: "2 hour ago",
    location: "Ney York, USA",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Sarah Jonson",
    email: "sarahjonson143@gmail.com",
    status: "Active",
    sleepScore: "8.5",
    listeningTime: "12h 12m",
    lastActivity: "2 hour ago",
    location: "Ney York, USA",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Sarah Jonson",
    email: "sarahjonson143@gmail.com",
    status: "Active",
    sleepScore: "8.5",
    listeningTime: "12h 12m",
    lastActivity: "2 hour ago",
    location: "Ney York, USA",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Sarah Jonson",
    email: "sarahjonson143@gmail.com",
    status: "Inactive",
    sleepScore: "8.5",
    listeningTime: "12h 12m",
    lastActivity: "2 hour ago",
    location: "Ney York, USA",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Sarah Jonson",
    email: "sarahjonson143@gmail.com",
    status: "Active",
    sleepScore: "8.5",
    listeningTime: "12h 12m",
    lastActivity: "2 hour ago",
    location: "Ney York, USA",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Sarah Jonson",
    email: "sarahjonson143@gmail.com",
    status: "Active",
    sleepScore: "8.5",
    listeningTime: "12h 12m",
    lastActivity: "2 hour ago",
    location: "Ney York, USA",
    avatar:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face",
  },
];

const SnUserList: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [memberStatus, setMemberStatus] = useState<string>("Member Status");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: number, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const getStatusColor = (status: "Active" | "Inactive") =>
    status === "Active" ? "text-green-400" : "text-red-400";

  return (
    <div className="rounded-2xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <h1 className="text-white text-xl font-semibold">Users</h1>
          <span className="text-gray-400 text-sm">({users.length})</span>
        </div>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg border border-gray-600 transition-colors"
          >
            <span className="text-sm">{memberStatus}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10 min-w-[150px]">
              <div className="py-1">
                {["All Members", "Active", "Inactive"].map((status) => (
                  <button
                    key={status}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    onClick={() => {
                      setMemberStatus(status);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-4 font-medium text-gray-400 text-sm">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                    checked={selectedUsers.length === users.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                  User
                </div>
              </th>
              <th className="text-left p-4 font-medium text-gray-400 text-sm">
                Status
              </th>
              <th className="text-left p-4 font-medium text-gray-400 text-sm">
                Sleep Score
              </th>
              <th className="text-left p-4 font-medium text-gray-400 text-sm">
                Listening Time
              </th>
              <th className="text-left p-4 font-medium text-gray-400 text-sm">
                Last Activity
              </th>
              <th className="text-left p-4 font-medium text-gray-400 text-sm">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) =>
                        handleSelectUser(user.id, e.target.checked)
                      }
                    />
                    <Image
                      width={40}
                      height={40}
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-white font-medium text-sm">
                        {user.name}
                      </div>
                      <div className="text-gray-400 text-xs">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`text-sm font-medium ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-gray-300 text-sm">{user.sleepScore}</span>
                </td>
                <td className="p-4">
                  <span className="text-gray-300 text-sm">{user.listeningTime}</span>
                </td>
                <td className="p-4">
                  <span className="text-gray-300 text-sm">{user.lastActivity}</span>
                </td>
                <td className="p-4">
                  <span className="text-gray-300 text-sm">{user.location}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-6 border-t border-gray-700">
        <div className="text-gray-400 text-sm">Page 1 of 10</div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors">
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnUserList;
