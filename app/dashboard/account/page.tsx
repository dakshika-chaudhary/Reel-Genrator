"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "../_components/Header";

type Video = {
  _id: string;
  videoId: string;
  videoUrl: string;
  style: string;
  createdAt: string;
};

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const [videos, setVideos] = useState<Video[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get("/api/my-video"); // ✅ FIXED
      setVideos(res.data);
    };
    fetchVideos();
  }, []);

  if (!isLoaded) {
    return <div className="p-10 text-white">Loading account...</div>;
  }

  const filteredVideos =
    filter === "all"
      ? videos
      : videos.filter(
          (v) => v.style?.toLowerCase() === filter.toLowerCase()
        );

  return (
    <div className="min-h-screen  text-white bg-black">
      
      {/* ================= PROFILE ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          flex items-center gap-6 mb-12
          bg-white/5 backdrop-blur-2xl
          border border-white/20
          rounded-2xl p-6 shadow-xl
        "
      >
        <img
          src={user?.imageUrl}
          alt="profile"
          className="w-24 h-24 rounded-full border border-white/20"
        />

        <div>
          <h1 className="text-3xl font-bold">
            {user?.fullName || "User"}
          </h1>
          <p className="text-gray-400">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Member since{" "}
            {new Date(user?.createdAt || "").toLocaleDateString()}
          </p>
        </div>
      </motion.div>

      {/* ================= FILTERS ================= */}
      <div className="flex gap-4 mb-10">
        {["all", "Realistic", "Anime","Cartoon","Sketch","3D","Watercolor"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-6 py-2 rounded-xl border transition-all
              ${
                filter === type
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 border-transparent"
                  : "border-white/20 hover:bg-white/10"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* ================= VIDEOS ================= */}
      {filteredVideos.length === 0 ? (
        <p className="text-gray-400">No videos created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <motion.div
              key={video._id}
              whileHover={{ scale: 1.04 }}
              className="
                bg-white/5 backdrop-blur-xl
                border border-white/10
                rounded-2xl p-4 shadow-xl
              "
            >
              <video
                src={video.videoUrl}
                controls
                className="rounded-xl w-full"
              />

              <div className="flex justify-between items-center mt-4">
                <span className="text-xs px-4 py-1 rounded-full bg-purple-600/20">
                  {video.style}
                </span>

                <a
                  href={video.videoUrl}
                  download
                  className="text-sm text-blue-400 hover:underline"
                >
                  Download
                </a>
              

              <button
  onClick={async () => {
    if (!confirm("Delete this video?")) return;

    await axios.delete("/api/delete-video", {
      data: { videoId: video.videoId },
    });

    setVideos((prev) =>
      prev.filter((v) => v.videoId !== video.videoId)
    );
  }}
  className="text-red-400 text-sm hover:underline"
>
  🗑️ Delete
</button>
</div>


              <p className="text-xs text-gray-400 mt-2">
                {new Date(video.createdAt).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
