"use client";
import React, { ReactNode } from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div
      className="
        min-h-screen 
        bg-gradient-to-br from-black via-[#0b0018] to-[#020205]
        text-white
        flex
      "
    >
      {/* SIDEBAR */}
      <div className="hidden md:block fixed w-64 h-screen">
        <SideNav />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-64">
        <Header />

        <div className="p-4 mt-[70px]">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
