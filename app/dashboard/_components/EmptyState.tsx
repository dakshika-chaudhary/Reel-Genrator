"use client"
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

export default function EmptyState() {
    return (
        <div className="w-full h-[300px] flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-lg">

            <h3 className="text-lg font-medium text-gray-700">No Videos Found</h3>
            
            <p className="text-sm text-gray-500 mt-2">You haven't created any videos yet. Start by creating a new video!</p>
            <Link href={'/dashboard/create-new'}><Button className="mt-4">+ Create New Video</Button></Link>
        </div>
    );
}