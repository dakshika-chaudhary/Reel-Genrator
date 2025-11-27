// "use client";

// import React, { useState } from "react";
// import axios from "axios";

// import SelectTopic from "./_components/SelectTopic";
// import SelectStyle from "./_components/SelectStyle";
// import SelectDuration from "./_components/SelectDuration";
// import CustomLoading from "./_components/CustomLoading";

// export default function CreateNewPage() {
//   const [formData, setFormData] = useState({
//     topic: "",
//     customPrompt: "",
//     duration: "",
//     imageStyle: "",
//   });

//   const [loading, setLoading] = useState(false);
// const [videoScript, setVideoScript] = useState(null);
//   // Handle dropdown/text changes
//   const onHandleInputChange = (fieldName: string, fieldValue: string) => {
//     console.log(fieldName, fieldValue);

//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: fieldValue,
//     }));
//   };

//   const onCreateClickHandler = () => {
//     GetVideoScript();
//     setLoading(true);
//     console.log("Form Data Submitted:", formData);
//     };

//   // Get video script from API
//   const GetVideoScript = async () => {
//    const prompt =
//   "Write a script to generate " +
//   formData.duration +
//   " seconds video on topic: " +
//   formData.topic +
//   " along with AI image prompt in " +
//   formData.imageStyle +
//   " format for each scene. Give result in JSON.";
//     const result = await axios.post("/api/get-video-script", {
//       prompt,
//     }).then (response=>{
//       console.log("RESPONSE DATA:",response.data.result);
//       setVideoScript(response.data.result);
//       GenerateAudioFile(response.data.result);
//     });
//  setLoading(false);
    
//   };

//   const GenerateAudioFile = async()=>{
//    if (!videoScript) {
//     alert("Please generate script first!");
//     return;
//    }

//     let fullScript ='';
//     videoScript.forEach((scene:any)=>{
//          fullScript+=scene.script+" ";
//     });

//     console.log("FULL SCRIPT TO TTS:", fullScript);

//   }

//   return (
//     <div className="p-3">
//       <h1 className="font-bold text-4xl text-primary text-center">
//         Create New Dashboard
//       </h1>

//       <div className="mt-10 shadow-md p-10">
//         <SelectTopic onUserSelect={onHandleInputChange} />
//         <SelectStyle onUserSelect={onHandleInputChange} />
//         <SelectDuration onUserSelect={onHandleInputChange} />

//         <button
//           className="bg-primary px-6 py-2 text-white rounded mt-5"
//           onClick={onCreateClickHandler}
//         >
//           Create video
//         </button>
//       </div>
//       <CustomLoading loading={loading} />
//     </div>
//   );
// }



"use client";
import React, { useState } from "react";
import axios from "axios";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import CustomLoading from "./_components/CustomLoading";
import {v4 as uuidv4} from 'uuid';
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

  const onHandleInputChange = (fieldName: string, fieldValue: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };
  const scriptData = "An old, abandoned house stood on a hill, silhouetted against the stormy sky. A lone figure cautiously approaches the front door, the wind howling around them. Inside, dust motes dance in the single ray of moonlight filtering through a cracked window. A faint whisper echoes through the empty halls, 'Leave...'  The figure turns, startled, but sees nothing. The whispering grows louder. The walls seem to close in as the whispers intensify, 'Get out!'"


  const onCreateClickHandler = () => {
    setLoading(true);
    GenerateAudioFile(scriptData);
    // GetVideoScript();
  };

  
  // Fetch script from backend
  const GetVideoScript = async () => {
    const prompt =
      "Write a script to generate " +
      formData.duration +
      " seconds video on topic: " +
      formData.topic +
      " along with AI image prompt in " +
      formData.imageStyle +
      " format for each scene. Give result in JSON.";

      console.log(prompt);

      const resp = await axios.post("/api/get-video-script", { prompt });
console.log(resp.data.result);
setVideoScript(resp.data.result);
GenerateAudioFile(resp.data.result);

        // const result = await axios.post("/api/get-video-script", { 
        //   prompt:prompt 
        // }).then(resp=>{
        //   console.log(resp.data.result);
        //   setVideoScript(resp.data.result);
        //   console.log("SCRIPT RESULT:", resp.data.result);
        //   GenerateAudioFile(resp.data.result);
        // });
  };

 const GenerateAudioFile = async (scriptData: any) => {
  console.log("🟦 RAW INPUT:", scriptData);
  const id = uuidv4();
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
  body: JSON.stringify({ text: scriptData, id }),
});

 const data = await res.json();

  if (data.url) {
    setAudioUrl(data.url); // permanent audio URL
    console.log("🎧 Audio URL:", data.url);
  } else {
    console.error("❌ Failed to generate audio", data.error);
  }

  setLoading(false);

};

  return (
    <div className="p-3">
      <h1 className="font-bold text-4xl text-primary text-center">
        Create New Dashboard
      </h1>

      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />

        <button
          className="bg-primary px-6 py-2 text-white rounded mt-5"
          onClick={onCreateClickHandler}
        >
          Create video
        </button>

      </div>

      
        {audioUrl && (
  <audio controls src={audioUrl} className="mt-5 w-full" />
)}
      <CustomLoading loading={loading} />
    </div>
  );
}
