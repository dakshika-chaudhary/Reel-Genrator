"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { generateVideoPipeline } from "@/lib/generateVideoPipeline";
import SelectTopic from "../../create-new/_components/SelectTopic";
import SelectStyle from "../../create-new/_components/SelectStyle";
import SelectDuration from "../../create-new/_components/SelectDuration";
import CustomLoading from "../../create-new/_components/CustomLoading";
import VideoPopup from "../../create-new/_components/VideoPopup";

export default function EditVideoPage() {
  const params = useParams();
  const videoId = params.videoId as string; // ✅ CORRECT

  const [formData, setFormData] = useState({
    topic: "",
    duration: "",
    imageStyle: "",
  });

  const [loading, setLoading] = useState(false);
  const [finalVideoUrl, setFinalVideoUrl] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  console.log("VIDEO ID:", videoId);

  // 1️⃣ Load existing video data
  useEffect(() => {
    if (!videoId) return;

    const fetchVideo = async () => {
      const res = await axios.get(`/api/video/${videoId}`);
      setFormData({
        topic: res.data.topic,
        duration: res.data.duration,
        imageStyle: res.data.style,
      });
    };

    fetchVideo();
  }, [videoId]);

  // 2️⃣ Handle form updates
  const onHandleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // 3️⃣ RE-GENERATE VIDEO
  const onRegenerateClick = async () => {
    try {
      setLoading(true);

      const scriptRes = await axios.post("/api/generate-script", {
        topic: formData.topic,
        style: formData.imageStyle,
        duration: formData.duration,
      });

      const updatedScript = scriptRes.data.script;

      const videoPath = await generateVideoPipeline({
        script: updatedScript,
        videoId, // ✅ now valid
        meta: {
          topic: formData.topic,
          style: formData.imageStyle,
          duration: formData.duration,
        },
      });

      setFinalVideoUrl(videoPath);
      setShowPopup(true);
    } catch (err) {
      console.error(err);
      alert("Failed to regenerate video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">✏ Edit Video</h1>

      <SelectTopic value={formData.topic} onUserSelect={onHandleInputChange} />
      <SelectStyle value={formData.imageStyle} onUserSelect={onHandleInputChange} />
      <SelectDuration value={formData.duration} onUserSelect={onHandleInputChange} />

      <button
        onClick={onRegenerateClick}
        className="bg-purple-600 px-6 py-2 rounded mt-6"
      >
        Re-Generate Video
      </button>

      {showPopup && (
        <VideoPopup
          videoUrl={finalVideoUrl}
          onClose={() => setShowPopup(false)}
        />
      )}

      {loading && <CustomLoading loading={loading} />}
    </div>
  );
}
