

"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "../_components/Header";
import { useRouter } from "next/navigation";

type Video = {
  _id: string;
  videoId: string;
  videoUrl: string;
  style: string;
  createdAt: string;
};

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [videos, setVideos] = useState<Video[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("/api/my-video");
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch videos", err);
      }
    };
    fetchVideos();
  }, []);

  if (!isLoaded) {
    return <div className="p-6 text-white">Loading account...</div>;
  }

  const filteredVideos =
    filter === "all"
      ? videos
      : videos.filter(
          (v) => v.style?.toLowerCase() === filter.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-8 lg:px-12">
      
      {/* ================= PROFILE ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          flex flex-col sm:flex-row
          items-center sm:items-start
          gap-4 sm:gap-6
          mb-8 sm:mb-12
          text-center sm:text-left
          bg-white/5 backdrop-blur-2xl
          border border-white/20
          rounded-2xl p-5 sm:p-6 shadow-xl
        "
      >
        <img
          src={user?.imageUrl}
          alt="profile"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/20"
        />

        <div>
          <h1 className="text-xl sm:text-3xl font-bold">
            {user?.fullName || "User"}
          </h1>

          <p className="text-sm sm:text-base text-gray-400">
            {user?.primaryEmailAddress?.emailAddress}
          </p>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Member since{" "}
            {new Date(user?.createdAt || "").toLocaleDateString()}
          </p>
        </div>
      </motion.div>

      {/* ================= FILTERS ================= */}
      <div className="flex gap-3 mb-8 overflow-x-auto scrollbar-hide">
        {["all", "Realistic", "Anime", "Cartoon", "Sketch", "3D", "Watercolor"].map(
          (type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 sm:px-6 py-2 text-sm sm:text-base rounded-xl border transition-all whitespace-nowrap
                ${
                  filter === type
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 border-transparent"
                    : "border-white/20 hover:bg-white/10"
                }`}
            >
              {type}
            </button>
          )
        )}
      </div>

      {/* ================= VIDEOS ================= */}
      {filteredVideos.length === 0 ? (
        <div className="text-center text-gray-400 py-16 sm:py-24">
          <p className="text-lg">No videos yet 🎬</p>
          <p className="text-sm mt-2">
            Create your first AI video to see it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVideos.map((video) => (
            <motion.div
              key={video._id}
              whileHover={{ scale: 1.04 }}
              className="
                bg-white/5 backdrop-blur-xl
                border border-white/10
                rounded-2xl p-3 sm:p-4 shadow-xl
              "
            >
              {/* 🔥 REDUCED VIDEO SIZE FOR MOBILE */}
              <video
                src={video.videoUrl}
                controls
                preload="metadata"
                className="
                  w-full
                  rounded-xl
                  aspect-video
                  max-h-[200px] sm:max-h-none
                  object-cover
                "
              />

              <div className="flex justify-between items-center mt-4 gap-3">
                <span className="text-[10px] sm:text-xs px-3 sm:px-4 py-1 rounded-full bg-purple-600/20">
                  {video.style}
                </span>

                <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
                  <a
                    href={video.videoUrl}
                    download
                    className="text-blue-400 hover:underline"
                  >
                    ⬇ Download
                  </a>

                  <button
                    onClick={() =>
                      router.push(`/dashboard/edit/${video.videoId}`)
                    }
                    className="text-yellow-400 hover:underline"
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={async () => {
                      if (!confirm("Delete this video?")) return;

                      try {
                        await axios.delete("/api/delete-video", {
                          data: { videoId: video.videoId },
                        });

                        setVideos((prev) =>
                          prev.filter((v) => v.videoId !== video.videoId)
                        );
                      } catch {
                        alert("Failed to delete video");
                      }
                    }}
                    className="text-red-400 hover:underline"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>

              {video.createdAt && (
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(video.createdAt).toLocaleDateString()}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
