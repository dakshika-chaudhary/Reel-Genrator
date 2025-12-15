

"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { motion } from "framer-motion";

function CustomLoading({ loading }: { loading: boolean }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent
        className="
          bg-white/10 backdrop-blur-2xl 
          border border-white/20 
          shadow-2xl shadow-purple-900/40 
          text-white 
          rounded-2xl
          w-[90%] md:w-[450px]
        "
      >
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle
            className="
              text-2xl font-bold 
              bg-gradient-to-r from-purple-400 to-blue-400 
              bg-clip-text text-transparent
            "
          >
            Generating Video…
          </AlertDialogTitle>

          <AlertDialogDescription className="text-gray-300 mt-2">
            Please wait while we create your AI-powered video.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Loader animation */}
        <div className="flex flex-col items-center my-8 space-y-5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            <Image
              src="/process.png"
              alt="Loading"
              width={70}
              height={70}
              className="opacity-90"
            />
          </motion.div>

          <p className="text-gray-200 text-lg animate-pulse">
            Processing…
          </p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;
