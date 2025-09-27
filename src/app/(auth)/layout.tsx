import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/layoutiamge.png')",
      }}
    >
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}

export default Layout;
