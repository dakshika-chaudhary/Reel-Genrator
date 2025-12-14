// "use client";

// import { CircleUserIcon, FileVideo, PanelsTopLeft, ShieldPlus } from "lucide-react";
// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// function SideNav() {
//   const MenuOption = [
//     {
//       id: 1,
//       name: "Dashboard",
//       path: "/dashboard",
//       icon: PanelsTopLeft,
//     },
//     {
//       id: 2,
//       name: "Create New",
//       path: "/dashboard/create-new",
//       icon: FileVideo,
//     },
//     {
//       id: 3,
//       name: "Upgrade",
//       path: "/upgrade",
//       icon: ShieldPlus,
//     },
//     {
//       id: 4,
//       name: "Account",
//       path: "/account",
//       icon: CircleUserIcon,
//     },
//   ];

//   const path = usePathname();
//   console.log(path);

//   return (
//     <div className="w-64 h-screen shadow-md p-5">
//       <div className="grid gap-3">
//         {MenuOption.map((item) => (
//           <Link href={item.path} key={item.id}>
//             <div
//               className={`flex items-center gap-3 p-3 hover:bg-primary hover:text-white rounded-md cursor-pointer
//               ${path === item.path ? "bg-primary text-white" : ""}`}
//             >
//               <item.icon />
//               <h2>{item.name}</h2>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SideNav;
"use client";

import {
  CircleUserIcon,
  FileVideo,
  PanelsTopLeft,
  ShieldPlus,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

function SideNav() {
  const MenuOption = [
    { id: 1, name: "Dashboard", path: "/dashboard", icon: PanelsTopLeft },
    { id: 2, name: "Create New", path: "/dashboard/create-new", icon: FileVideo },
    { id: 3, name: "Upgrade", path: "/upgrade", icon: ShieldPlus },
    { id: 4, name: "Account", path: "/account", icon: CircleUserIcon },
  ];

  const path = usePathname();

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="
        w-64 h-screen 
        bg-white/5 backdrop-blur-2xl 
        border-r border-white/20 
        shadow-xl shadow-black/40 
        flex flex-col p-6
        relative
      "
    >
      {/* Glowing gradient border effect */}
      <div className="
        absolute inset-0 rounded-r-xl 
        pointer-events-none
        bg-gradient-to-b from-purple-700/20 via-transparent to-blue-700/20
      " />

      {/* LOGO */}
      <h1
        className="
        text-3xl font-extrabold mb-12 text-center 
        bg-gradient-to-r from-purple-400 to-blue-400 
        bg-clip-text text-transparent tracking-wide
      "
      >
        ReelBloom
      </h1>

      {/* MENU ITEMS */}
      <div className="flex flex-col gap-4 relative z-10">
        {MenuOption.map((item) => {
          const isActive = path === item.path;

          return (
            <Link href={item.path} key={item.id}>
              <motion.div
                whileHover={{ scale: 1.05, x: 6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer 
                  transition-all border
                  ${
                    isActive
                      ? "border-white/30 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl shadow-purple-900/40"
                      : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                  }
                `}
              >
                <item.icon
                  className={`
                  w-5 h-5 
                  ${isActive ? "text-white" : "text-gray-300"}
                `}
                />
                <h2 className="font-medium tracking-wide">{item.name}</h2>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="mt-auto text-center text-gray-400 text-sm relative z-10">
        © {new Date().getFullYear()} ReelBloom  
        <br />
        <span className="text-gray-500">AI Video Studio</span>
      </div>
    </motion.div>
  );
}

export default SideNav;
