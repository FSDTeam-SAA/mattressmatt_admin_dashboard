"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, LogOut, Grip } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import LogoutModal from "./LogoutModal";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  {
    name: "SnUSERS",
    href: "/SnUSERS",
    icon: LayoutDashboard,
  },
  {
    name: "Library",
    href: "/Library",
    icon: LayoutDashboard,
  },
  { name: "Settings", href: "/settings", icon: Grip },
  // { name: "Sub Category", href: "/sub-category", icon: ShoppingBasket },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  

  return (
    <div className="w-[312px] h-screen flex flex-col border-r border-gray-700 sticky top-0 backdrop-blur-md shadow-lg">
      {/* Logo */}
      <div className="h-[80px] flex items-center justify-center mt-4 pb-3">
        <div className="h-[80px] w-[94px]">
          <Image
            src="/images/MTSLOGO.png"
            alt="Logo"
            height={200}
            width={200}
            className="object-cover"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center justify-start space-y-4 overflow-y-auto mt-10 w-full px-2">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                isActive
                  ? "bg-[#283280] text-white"
                  : "text-white hover:bg-slate-600/50 hover:text-white"
              )}
            >
              <item.icon
                className={cn(
                  "h-6 w-6",
                  isActive ? "text-white" : "text-white"
                )}
              />
              <span
                className={cn(
                  "font-normal text-base leading-[120%]",
                  isActive ? "font-medium" : ""
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
      {/* Logout */}
      <div className="p-3">
        <div
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex items-center justify-start gap-2 px-3 py-2 text-sm font-medium rounded-lg text-slate-300 hover:bg-slate-600/50 hover:text-white cursor-pointer"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-base font-normal leading-[120%]">Log Out</span>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        // onConfirm={handleLogout}
      />
    </div>
  );
}
