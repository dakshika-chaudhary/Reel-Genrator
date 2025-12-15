import axios from "axios";

export async function generateVideoPipeline({
  script,
  videoId,
  meta,
}: {
  script: string;
  videoId: string;
  meta: {
    topic: string;
    style: string;
    duration: string;
  };
}) {
  // 1️⃣ Generate audio
  const audioRes = await axios.post("/api/generate-audio", {
    text: script,
    id: videoId,
  });
  const audioUrl = audioRes.data.url;

  // 2️⃣ Generate captions
  const captionRes = await axios.post("/api/generate-caption", {
    audioUrl,
    id: videoId,
  });
  const captionsText = captionRes.data.text;

  const sentences = captionsText
    .split(".")
    .map((s: string) => s.trim())
    .filter(Boolean);

  // 3️⃣ Generate images
  const imageRes = await axios.post("/api/generate-image", {
    caption: captionsText,
    id: videoId,
  });
  const images = imageRes.data.images;

  // 4️⃣ Generate video
  await axios.post("/api/generate-video", {
    images,
    captions: sentences,
    audioUrl,
    id: videoId,
  });

  const videoPath = `/videos/${videoId}.mp4`;

  // 5️⃣ Save metadata
  await axios.post("/api/save-video", {
    videoId,
    videoUrl: videoPath,
    audioUrl,
    images,
    captions: sentences,
    topic: meta.topic,
    style: meta.style,
    duration: meta.duration,
  });

  return videoPath;
}
