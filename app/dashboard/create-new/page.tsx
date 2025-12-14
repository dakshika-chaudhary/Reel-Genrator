
"use client";
import React, { useState } from "react";
import axios from "axios";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import CustomLoading from "./_components/CustomLoading";
import {v4 as uuidv4} from 'uuid';
import { useContext } from "react";
import VideoPopup from "./_components/VideoPopup";


export default function CreateNewPage() {
  const [formData, setFormData] = useState({
    topic: "",
    customPrompt: "",
    duration: "",
    imageStyle: "",
  });

  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState<any>(null);
const [audioUrl, setAudioUrl] = useState<string | null>(null);
const [captions,setCaptions] = useState();
const [generatedImages, setGeneratedImages] = useState<string[]>([]);
const MAX_IMAGES = 1;
const [sentences, setSentences] = useState<string[]>([]);
const [finalVideoUrl, setFinalVideoUrl] = useState<string | null>(null);
const [videoStarted, setVideoStarted] = useState(false);
const [showPopup, setShowPopup] = useState(false);
const [videoId, setVideoId] = useState("");
 
const GenerateVideo = async (id:string) => {
  try {
    setLoading(true);

    const resp = await axios.post("/api/generate-video", {
      images: generatedImages,
      captions: sentences,
      audioUrl,
      id
    });

    console.log("🎞 Final Video URL:", resp.data.videoUrl);
    // setFinalVideoUrl(resp.data.videoUrl);
setFinalVideoUrl(`/videos/${id}.mp4`);
console.log("🎉 Video created at:", `/videos/${id}.mp4`);
setShowPopup(true);


  } catch (error) {
    console.error("❌ Video generation failed", error);
    alert("Video generation failed.");
  }

  setLoading(false);
};



React.useEffect(() => {
  console.log("👀 Watching:", { audioUrl, generatedImages, sentences });

  if (!videoId) return; 
  
  if (!videoStarted && audioUrl && generatedImages.length > 0 && sentences.length > 0) {
    console.log("🎬 All assets ready → Start video generation!");
    setVideoStarted(true);  // prevent duplicate runs
    GenerateVideo(videoId);
  }
}, [audioUrl, generatedImages, sentences, videoStarted,videoId]);


  const onHandleInputChange = (fieldName: string, fieldValue: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };
  const scriptData = "An old, abandoned house stood on a hill, silhouetted against the stormy sky. A lone figure cautiously approaches the front door, the wind howling around them. Inside, dust motes dance in the single ray of moonlight filtering through a cracked window. A faint whisper echoes through the empty halls, 'Leave...'  The figure turns, startled, but sees nothing. The whispering grows louder. The walls seem to close in as the whispers intensify, 'Get out!'"


  const onCreateClickHandler = () => {
    const newId=uuidv4();
    setVideoId(newId);
    setVideoStarted(false); 
    setLoading(true);
    //  GenerateAudioFile(scriptData);
    // GetVideoScript();
       GenerateAudioFile(scriptData,newId);
    //  GenerateImages(scriptData);
  };

  
 const GenerateAudioFile = async (scriptData: any,id:string) => {
  console.log("🟦 RAW INPUT:", scriptData);

  //  let jsonText = scriptData;

  // // 1️⃣ Extract the JSON inside ```json ... ```
  // const match = scriptData.match(/```json([\s\S]*?)```/);

  // if (match) {
  //   jsonText = match[1].trim();
  // }
//   else {
  
//   const firstBrace = scriptData.indexOf("{");
//   const lastBrace = scriptData.lastIndexOf("}");
//   jsonText = scriptData.slice(firstBrace, lastBrace + 1);
// }

  // let parsed;
  // try {
  //   parsed = JSON.parse(jsonText);
  // } catch (e) {
  //   console.log("❌ JSON PARSE FAILED:", e);
  //   return;
  // }

  // console.log("🟩 PARSED JSON:", parsed);

  // if (!parsed.scenes) {
  //   console.log("❌ parsed.scenes missing");
  //   return;
  // }

  
  let fullScript = "";
//  parsed.scenes.forEach((scene: any) => {
//   // Pick the first available field for narrative
//   fullScript += (scene.narrative || scene.sceneDescription || scene.description || scene.script) + " ";
// });
// fullScript = fullScript.trim();
// console.log("🎤 FINAL SCRIPT:", fullScript);

// await axios.post('/api/generate-audio',{
//   text:fullScript,
//   id:id
// }).then(resp=>{
//   console.log(resp.data);
// })

 

   if (typeof scriptData === "string" && !scriptData.includes("{")) {
   console.log("ℹ️ Input is plain text, skipping JSON parsing");
   
  //   await axios.post('/api/generate-audio', {
  //     text: scriptData,
  //     id: id
  //   }).then(resp=>{
  //     console.log(resp.data);
  //   })
  // }
   }
  const res = await fetch("/api/generate-audio", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ 
    text: scriptData, 
    id
   }),
  
});

 const data = await res.json();

 

  if (data.url) {
    const fullUrl = `${window.location.origin}${data.url}`;
    setAudioUrl(data.url); // permanent audio URL
    console.log("🎧 Audio URL:", data.url);

    GenerateAudioCaption(data.url,id); 
    
  } else {
    console.error("❌ Failed to generate audio", data.error);
  }

  setLoading(false);

};



const GenerateAudioCaption = async (fileUrl: string,id:string) => {
  setLoading(true);
  console.log("📌 Caption function called with URL:", fileUrl);

  try {
    const resp = await axios.post('/api/generate-caption', {
      audioUrl: fileUrl,
      id
    });

    const captionText = resp.data?.text;
    console.log("Caption text:", captionText);

    setCaptions(captionText);
   
    console.log("📌 RAW CAPTION TEXT:", captionText);

  const parts = captionText
  .split(".")
  .map((s:string) => s.trim())
  .filter(Boolean);

  console.log("🟦 FINAL SENTENCES ARRAY:", parts);
console.log("🟩 TOTAL SENTENCES:", parts.length);

  setSentences(parts);

    // Pass the caption to image generator
    GenerateImages(captionText,id);

  } catch (err) {
    console.error("❌ Caption error:", err);
  }

  setLoading(false);
};

const GenerateImages = async (caption: string,id:string) => {
  setLoading(true);

  try {
    const resp = await axios.post("/api/generate-image", {
      caption,
      id
    });

    console.log("Image API:", resp.data);

    setSentences(resp.data.sentences);
    setGeneratedImages(resp.data.images);

    // GenerateVideo();

  } catch (err) {
    console.error("❌ Image gen failed:", err);
  }

  setLoading(false);
};


  return (
    <div className="p-3">
      <h1 className="font-bold text-4xl text-white text-center">
        Create New Dashboard
      </h1>

      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />

        <button
          className="bg-amber-500 px-6 py-2 text-white rounded mt-5"
          onClick={onCreateClickHandler}
        >
          Create video
        </button>

      </div>

 {/* <div>
  {finalVideoUrl && (
  <div className="mt-5">
    <h2 className="text-xl font-bold mb-2">Your Video</h2>

    <video 
      controls 
      className="w-full rounded shadow"
      src={finalVideoUrl}
    >
    </video>

    <a 
      href={finalVideoUrl} 
      download 
      className="text-blue-500 underline mt-2 block"
    >
      Download Video
    </a>
  </div> 
 )}

</div> */}

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
