"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { User } from "@/dataType/Type";

interface SnUserListProps {
  users: User[];
}

export const SnUserList: React.FC<SnUserListProps> = ({ users }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [memberStatus, setMemberStatus] = useState<string>("All Members");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 10;

  // Filtered users based on dropdown selection
  const filteredUsers = users?.filter((user) => {
    if (memberStatus === "All Members") return true;
    if (memberStatus === "Active") return user.role !== "user"; // Example mapping
    if (memberStatus === "Inactive") return user.role === "user"; // Example mapping
    return true;
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers?.length / usersPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(currentUsers.map((user) => user._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="rounded-2xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <h1 className="text-white text-xl font-semibold">Users</h1>
          <span className="text-gray-400 text-sm">({filteredUsers?.length})</span>
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
                      setCurrentPage(1);
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
                <input
                  type="checkbox"
                  className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                  checked={
                    selectedUsers?.length === currentUsers?.length &&
                    currentUsers?.length > 0
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="text-left p-4 font-medium text-gray-400 text-sm">Avatar</th>
              <th className="text-left p-4 font-medium text-gray-400 text-sm">Name</th>
              <th className="text-left p-4 font-medium text-gray-400 text-sm">Email</th>
              <th className="text-left p-4 font-medium text-gray-400 text-sm">Role</th>
              <th className="text-left p-4 font-medium text-gray-400 text-sm">Location</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers?.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                    checked={selectedUsers.includes(user._id)}
                    onChange={(e) => handleSelectUser(user._id, e.target.checked)}
                  />
                </td>
                <td className="p-4">
                  <Image
                    width={40}
                    height={40}
                    src={user.avatar?.url || "/default-avatar.png"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="p-4 text-white text-sm font-medium">{user.name}</td>
                <td className="p-4 text-gray-400 text-sm">{user.email}</td>
                <td className="p-4 text-gray-300 text-sm">{user.role}</td>
                <td className="p-4 text-gray-300 text-sm">
                  {typeof user.address === "string"
                    ? user.address
                    : `${user.address?.city || ""}, ${user.address?.state || ""}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-6 border-t border-gray-700">
        <div className="text-gray-400 text-sm">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors disabled:opacity-50"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <button
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors disabled:opacity-50"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
