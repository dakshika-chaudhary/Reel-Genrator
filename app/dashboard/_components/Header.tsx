// "use client"
// import React from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { User } from "lucide-react";
// import { UserButton } from "@clerk/nextjs";

// function Header() {
//   return (
//     <div className="p-3 px-5 flex items-center justify-between shadow-md">
//        <div className="flex gap-3 items-center">
//         <Image src="/appImages/logo.png" alt="logo" width={30} height={30} />
//         <h1 className="text-2xl font-bold">ReelBloom</h1>
//        </div>
//        <div className="flex gap-3 items-center">
//         <Button>Dashboard</Button>
//         <UserButton />
//     </div>
//     </div>
//   );
// }

// export default Header;

"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        w-full z-[999]
        px-6 py-4 
        flex items-center justify-between 
        bg-white/5 
        backdrop-blur-2xl 
        border-b border-white/10 
        shadow-lg shadow-black/40
        relative
      "
    >
      {/* Subtle gradient glow overlay */}
      <div className="
        absolute inset-0 bg-gradient-to-r 
        from-purple-600/10 via-transparent to-blue-600/10 
        pointer-events-none 
      " />

      {/* LEFT LOGO SECTION */}
      <div className="relative z-10 flex gap-3 items-center">
        <Image
          src="/appImages/logo.png"
          alt="logo"
          width={36}
          height={36}
          className="rounded-lg shadow-md"
        />

        <h1
          className="
            text-3xl font-extrabold 
            bg-gradient-to-r from-purple-400 to-blue-400 
            bg-clip-text text-transparent 
            tracking-wide drop-shadow-[0_0_6px_rgba(109,40,217,0.4)]
          "
        >
          ReelBloom
        </h1>
      </div>

      {/* RIGHT SECTION */}
      <div className="relative z-10 flex gap-5 items-center">

        {/* Dashboard Button */}
        <Link href="/dashboard">
          <Button
            className="
              px-6 py-2 rounded-xl
              bg-gradient-to-r from-purple-600 to-blue-600 
              text-white font-semibold
              hover:opacity-90 hover:scale-[1.05]
              active:scale-[0.98]
              transition-all 
              shadow-md shadow-purple-800/30
            "
          >
            Dashboard
          </Button>
        </Link>

        {/* USER PROFILE BUTTON */}
        <div
          className="
            rounded-full p-[3px] 
            bg-white/10 
            border border-white/20 
            backdrop-blur-xl 
            hover:bg-white/20 transition
            shadow-md shadow-black/30
          "
        >
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Header;
