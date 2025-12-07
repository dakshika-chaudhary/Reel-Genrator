"use client"
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <div className="p-3 px-5 flex items-center justify-between shadow-md">
       <div className="flex gap-3 items-center">
        <Image src="/appImages/logo.png" alt="logo" width={30} height={30} />
        <h1 className="text-2xl font-bold">ReelBloom</h1>
       </div>
       <div className="flex gap-3 items-center">
        <Button>Dashboard</Button>
        <UserButton />
    </div>
    </div>
  );
}

export default Header;