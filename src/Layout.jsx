// Layout.js
import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
      style={{
        backgroundImage: "url('../public/background.jpg')", // keep in public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Black semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content on top of overlay */}
      <div className="relative z-10 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
