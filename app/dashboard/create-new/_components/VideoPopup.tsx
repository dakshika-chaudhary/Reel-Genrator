"use client";
import React from "react";
import { motion } from "framer-motion";

export default function VideoPopup({ videoUrl, onClose }: any) {
  if (!videoUrl) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        fixed inset-0 z-[9999] 
        bg-black/70 backdrop-blur-2xl 
        flex justify-center items-center 
        p-4
      "
    >
      {/* POPUP CARD */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="
          relative
          w-[60%] md:w-[50%] 
          max-h-[90vh] overflow-y-auto
          rounded-2xl 
          bg-white/10 backdrop-blur-xl 
          border border-white/20 
          shadow-2xl shadow-purple-900/40
          p-6
        "
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 
            text-white text-lg 
            bg-white/20 hover:bg-white/30 
            px-3 py-1 rounded-full 
            backdrop-blur-md
            transition
          "
        >
          ✖
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          🎬 Your Generated Video
        </h2>

        {/* VIDEO PLAYER */}
        <video
          controls
          src={videoUrl}
          className="
            w-full rounded-xl shadow-xl h-70
            border border-white/20 
          "
        />

        {/* BUTTONS */}
        <div className="flex justify-between mt-6">
          {/* DOWNLOAD BUTTON */}
          <a
            href={videoUrl}
            download
            className="
              px-6 py-2 rounded-xl
              bg-gradient-to-r from-blue-600 to-purple-600
              text-white font-semibold
              hover:opacity-90 hover:scale-105 
              transition-all shadow-md
            "
          >
            ⬇ Download
          </a>

          {/* SAVE BUTTON */}
          <button
            onClick={() => alert('Save logic goes here')}
            className="
              px-6 py-2 rounded-xl
              bg-gradient-to-r from-green-600 to-green-500
              text-white font-semibold
              hover:opacity-90 hover:scale-105 
              transition-all shadow-md
            "
          >
            💾 Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
