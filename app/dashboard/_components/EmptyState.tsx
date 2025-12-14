// "use client"
// import { Button } from "@/components/ui/button";
// import React from "react";
// import Link from "next/link";

// export default function EmptyState() {
//     return (
//         <div className="w-full h-[300px] flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-lg">

//             <h3 className="text-lg font-medium text-gray-700">No Videos Found</h3>
            
//             <p className="text-sm text-gray-500 mt-2">You haven't created any videos yet. Start by creating a new video!</p>
//             <Link href={'/dashboard/create-new'}><Button className="mt-4">+ Create New Video</Button></Link>
//         </div>
//     );
// }
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="
        w-full h-[320px] 
        flex flex-col justify-center items-center 
        rounded-2xl
        bg-white/5 
        backdrop-blur-xl 
        border border-white/20 
        shadow-lg shadow-black/30
        relative
      "
    >
      {/* Floating gradient glow (subtle) */}
      <div className="
        absolute inset-0 
        bg-gradient-to-br from-purple-700/20 via-transparent to-blue-700/20 
        rounded-2xl 
        pointer-events-none
      " />

      {/* Content */}
      <div className="text-center z-10">
        <h3 className="text-xl font-semibold text-white/90">No Videos Found</h3>

        <p className="text-sm text-gray-300 mt-2 max-w-sm mx-auto">
          You haven’t generated any videos yet. Start creating your first AI video now.
        </p>

        <Link href="/dashboard/create-new">
          <Button
            className="
              mt-5 px-6 py-2 
              bg-gradient-to-r from-purple-600 to-blue-600 
              text-white font-semibold 
              rounded-xl shadow-md
              hover:scale-105 hover:opacity-90 transition-all
            "
          >
            + Create New Video
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
