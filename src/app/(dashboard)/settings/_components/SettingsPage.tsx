/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Eye, EyeOff, CloudDownload, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

function SettingsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "jhondoesmith@gmail.com",
    phoneNumber: "+2445681950",
    emailName: "",
    emailAddress: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { data: session } = useSession();
  const user = session?.user as any;
  const token = user?.accessToken;
  console.log(token)
  console.log(session)


  const { data: profileData } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch profile data");
      }

      return res.json();
    },
  });

  console.log(profileData?.data);


  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

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

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  // Separate update handlers
  const handleUpdatePersonalInfo = () => {
    console.log("Updating Personal Info:", {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      emailName: formData.emailName,
      emailAddress: formData.emailAddress,
    });
  };

  const handleUpdatePassword = () => {
    console.log("Updating Password:", {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    });
  };

  const handleUpdateAppInfo = () => {
    console.log("Updating App Info / Privacy");
  };

  return (
    <div className="space-y-10">
      {/* Personal Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        <div className="space-y-4 h-full flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-6">
              Personal Info
            </h2>

            <div>
              <label className="block text-gray-300 text-sm">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                placeholder="Mattress Matt"
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm">Email Name</label>
              <input
                type="text"
                placeholder="Write your new name or email"
                value={formData.emailName}
                onChange={(e) => handleInputChange("emailName", e.target.value)}
                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Write your new email"
                value={formData.emailAddress}
                onChange={(e) =>
                  handleInputChange("emailAddress", e.target.value)
                }
                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>
          </div>

          {/* Update Personal Info Button */}
          <div>
            <button
              onClick={handleUpdatePersonalInfo}
              className="w-full px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full mt-4"
            >
              Update Personal Info
            </button>
          </div>
        </div>

        {/* Right Column: Upload */}
        <div className="h-full flex flex-col border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            Upload Profile Photo
          </h2>
          <div
            className={`flex-1 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-blue-400" : "border-gray-600"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 flex items-center justify-center mb-4">
                <CloudDownload className="text-gray-400 !w-9 !h-9" />
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Browse and choose the files you want to upload from your
                computer
              </p>
              <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                <span className="text-white text-xs">
                  <Plus className="!w-7 !h-7" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Passwords */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Password</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: "Old Password",
              field: "oldPassword",
              showKey: "old",
              placeholder: "Enter your old password",
            },
            {
              label: "Create New Password",
              field: "newPassword",
              showKey: "new",
              placeholder: "Create new password",
            },
            {
              label: "Confirm New Password",
              field: "confirmPassword",
              showKey: "confirm",
              placeholder: "Confirm new password",
            },
          ].map((item) => (
            <div key={item.field}>
              <label className="block text-gray-300 text-sm mb-2">
                {item.label}
              </label>
              <div className="relative">
                <input
                  type={
                    showPasswords[item.showKey as keyof typeof showPasswords]
                      ? "text"
                      : "password"
                  }
                  placeholder={item.placeholder}
                  value={formData[item.field as keyof typeof formData]}
                  onChange={(e) =>
                    handleInputChange(
                      item.field as keyof typeof formData,
                      e.target.value
                    )
                  }
                  className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-3 pr-12 text-white"
                />
                <button
                  type="button"
                  onClick={() =>
                    togglePasswordVisibility(
                      item.showKey as keyof typeof showPasswords
                    )
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPasswords[item.showKey as keyof typeof showPasswords] ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Update Password Button */}
        <div className="mt-4">
          <button
            onClick={handleUpdatePassword}
            className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* App Info */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">App Info</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Privacy Policy
            </label>
            <textarea
              rows={6}
              defaultValue="Lorem ipsum dolor sit amet..."
              className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-3 text-white resize-none"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Terms & Conditions
            </label>
            <textarea
              rows={6}
              defaultValue="Lorem ipsum dolor sit amet..."
              className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-3 text-white resize-none"
            />
          </div>
        </div>

        {/* Update App Info Button */}
        <div className="mt-4">
          <button
            onClick={handleUpdateAppInfo}
            className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full"
          >
            Update App Info
          </button>
        </div>
      </div>

      {/* Bottom Cancel + Version */}
      <div className="flex justify-between items-center mt-6">
        <div>
          <label className="block text-gray-300 text-sm mb-2">
            App Version
          </label>
          <input
            type="text"
            defaultValue="v5.0.1"
            className="w-[400px] bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white"
          />
        </div>

        <div className="flex gap-5 w-full max-w-md">
          <div className="flex-1">
            <button
              onClick={handleCancel}
              className="w-full px-8 py-3 border border-gray-700 text-white rounded-full hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
