/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { CloudDownload, Plus, Eye, EyeOff } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { toast } from "sonner";

function SettingsPage() {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    dob: string;
    gender: string;
    image: string | File;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    privacyPolicy: string;
    terms: string;
  }>({
    name: "",
    email: "",
    dob: "",
    gender: "",
    image: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    privacyPolicy: "",
    terms: "",
  });

  const { data: session } = useSession();
  const user = session?.user as any;
  const token = user?.accessToken;

  // Fetch profile data
  const { data: profileData } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch profile data");
      return res.json();
    },
  });

  // Mutation for updating personal info
  const personalInfoMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const formPayload = new FormData();
      formPayload.append("name", data.name);
      formPayload.append("email", data.email);
      formPayload.append("dob", data.dob);
      formPayload.append("gender", data.gender);
      formPayload.append("privacyPolicy", data.privacyPolicy);
      formPayload.append("terms", data.terms);
      if (data.image instanceof File) formPayload.append("avatar", data.image);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/update-profile`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formPayload,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update profile");
      }
      return res.json();
    },
    onSuccess: (data) => {
      toast.success(data.message || "Profile updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Error updating profile");
    },
  });

 const passwordMutation = useMutation({
  mutationFn: async () => {
    const currentPassword = formData.oldPassword || "";
    const newPass = formData.newPassword || "";
    const confirmPass = formData.confirmPassword || "";

    if (!currentPassword || !newPass || !confirmPass) {
      throw new Error("Please fill all password fields");
    }

    if (newPass !== confirmPass) {
      throw new Error("New password and confirm password do not match");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPass,
          confirmPassword: confirmPass,
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update password");
    }

    return res.json();
  },
  onSuccess: (data) => {
    toast.success(data.message || "Password updated successfully");
    setFormData((prev) => ({
      ...prev,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  },
  onError: (error: any) => {
    toast.error(error.message || "Error updating password");
  },
});


  useEffect(() => {
    if (profileData?.data) {
      const dob = profileData.data.dob?.split("T")[0] || "";
      const avatarUrl = profileData.data.avatar?.url
        ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${profileData.data.avatar.url}`
        : "";
      setFormData((prev) => ({
        ...prev,
        name: profileData.data.name || "",
        email: profileData.data.email || "",
        dob,
        gender: profileData.data.gender || "",
        image: avatarUrl,
        privacyPolicy: profileData.data.privacyPolicy || "",
        terms: profileData.data.terms || "",
      }));
    }
  }, [profileData]);

  const [dragActive, setDragActive] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.dataTransfer.files[0] }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    }
  };

  const handleUpdatePersonalInfo = () => personalInfoMutation.mutate(formData);
  const handleUpdatePassword = () => passwordMutation.mutate();

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
              <label className="block text-gray-300 text-sm">Name</label>
              <input
                type="text"
                value={formData.name}
                placeholder="Your Name"
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm">Email</label>
              <input
                readOnly
                type="email"
                value={formData.email}
                className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm">Date of Birth</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => handleInputChange("dob", e.target.value)}
                className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm">Gender</label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
              >
                <SelectTrigger className="w-full !h-[50px] bg-transparent border border-gray-700 rounded-md px-4 py-3 text-white">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <button
              onClick={handleUpdatePersonalInfo}
              className="w-full px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full mt-4"
            >
              Update Personal Info
            </button>
          </div>
        </div>

        {/* Upload Section */}
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
            {formData.image ? (
              <div className="flex flex-col items-center gap-4">
                <Image
                  width={200}
                  height={200}
                  src={
                    typeof formData.image === "string"
                      ? formData.image
                      : URL.createObjectURL(formData.image)
                  }
                  alt="Profile Preview"
                  className="w-[200px] h-[200px] rounded-full object-cover border border-gray-600"
                />
                <p className="text-gray-400 text-sm">
                  {typeof formData.image === "string"
                    ? "Current Profile Photo"
                    : `Selected File: ${(formData.image as File).name}`}
                </p>
                <label className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <CloudDownload className="text-gray-400 !w-9 !h-9 mb-4" />
                <p className="text-gray-400 text-sm mb-4">
                  Drag & drop or click below to upload
                </p>
                <label className="cursor-pointer w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                  <Plus className="!w-7 !h-7 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Passwords */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white mb-6">Password</h2>

        <div className="relative">
          <label className="block text-gray-300 text-sm">Old Password</label>
          <input
            type={showOldPassword ? "text" : "password"}
            value={formData.oldPassword}
            onChange={(e) => handleInputChange("oldPassword", e.target.value)}
            className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-3 text-white pr-12"
            placeholder="Old Password"
          />
          <span
            onClick={() => setShowOldPassword(!showOldPassword)}
            className="absolute right-4 top-[66%] -translate-y-1/2 cursor-pointer text-gray-400"
          >
            {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <div className="relative">
          <label className="block text-gray-300 text-sm">New Password</label>
          <input
            type={showNewPassword ? "text" : "password"}
            value={formData.newPassword}
            onChange={(e) => handleInputChange("newPassword", e.target.value)}
            className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-3 text-white pr-12"
            placeholder="New Password"
          />
          <span
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-4 top-[66%] -translate-y-1/2 cursor-pointer text-gray-400"
          >
            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <div className="relative">
          <label className="block text-gray-300 text-sm">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-3 text-white pr-12"
            placeholder="Confirm Password"
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-[66%] -translate-y-1/2 cursor-pointer text-gray-400"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <button
          onClick={handleUpdatePassword}
          className="w-full px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full mt-4"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
