import Header from "@/components/share/Header";
import { Sidebar } from "@/components/share/Sidebar";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex"
      style={{
        backgroundImage: "url('/images/layoutbgiamge.png')", // Dummy image
      }}
    >
      {/* Sidebar full height */}
      <Sidebar />

      {/* Main content with header */}
      <div className="flex-1 relative">
        <Header />
        <div className="mt-[100px] p-6">{children}</div>
      </div>
    </div>
  );
}

export default layout;
