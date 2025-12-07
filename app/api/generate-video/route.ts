

// import { NextResponse } from "next/server";
// import path from "path";
// import fs from "fs";
// import { exec } from "child_process";

// export async function POST(req: Request) {
//   try {
//     const { images, captions, audioUrl, id } = await req.json();

//     if (!images || !captions || !audioUrl || !id) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // 1️⃣ Create temp working folder
//     const tempDir = path.join(process.cwd(), "public","temp", id);
//     fs.mkdirSync(tempDir, { recursive: true });

//     // 2️⃣ Download all images
//     for (let i = 0; i < images.length; i++) {
//       const response = await fetch(images[i]);
//       const buffer = Buffer.from(await response.arrayBuffer());
//       fs.writeFileSync(path.join(tempDir, `img${i}.jpg`), buffer);
//     }

//     // 3️⃣ Create FFmpeg concat file
//     const listFilePath = path.join(tempDir, "list.txt");

//     let fileListContent = "";
//     for (let i = 0; i < images.length; i++) {
//       fileListContent += `file img${i}.jpg\n`;
//       fileListContent += `duration 3\n`; // each slide = 3 seconds
//     }

//     fs.writeFileSync(listFilePath, fileListContent);

//     // 4️⃣ Download audio file locally
//     const audioRes = await fetch(audioUrl);
//     const audioBuffer = Buffer.from(await audioRes.arrayBuffer());
//     const audioPath = path.join(tempDir, "audio.mp3");
//     fs.writeFileSync(audioPath, audioBuffer);

//     // 5️⃣ Output FINAL video path
//     const outputPath = path.join(
//       process.cwd(),
//       "public",
//       "generated-videos",
//       `${id}.mp4`
//     );

//     // 6️⃣ FFmpeg command (slideshow + audio)
//     const ffmpegCmd = `
//       ffmpeg -y -f concat -safe 0 -i "${listFilePath}" \
//       -i "${audioPath}" \
//       -vf "scale=1080:1920,setsar=1" \
//       -shortest "${outputPath}"
//     `;

//     console.log("🎥 Starting FFmpeg...");

//     // 7️⃣ Run FFmpeg
//     await new Promise((resolve, reject) => {
//       exec(ffmpegCmd, (error) => {
//         if (error) reject(error);
//         else resolve(true);
//       });
//     });

//     console.log("🎉 Video created:", outputPath);

//     // 8️⃣ Return final video URL
//     return NextResponse.json({
//       videoUrl: `/generated-videos/${id}.mp4`,
//     });

//   } catch (err) {
//     console.error("VIDEO GENERATION ERROR:", err);
//     return NextResponse.json(
//       { error: "Video generation failed" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { exec } from "child_process";

export async function POST(req: Request) {
  try {
    const { images, captions, audioUrl, id } = await req.json();

    if (!images || !captions || !audioUrl || !id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1️⃣ TEMP folder inside public
    const tempDir = path.join(process.cwd(), "public", "temp", id);
    
    fs.mkdirSync(tempDir, { recursive: true });

    // 2️⃣ Download IMAGES to temp folder
    const localImagePaths: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const res = await fetch(images[i]);
      const buffer = Buffer.from(await res.arrayBuffer());

      const filePath = path.join(tempDir, `img${i}.jpg`);
      fs.writeFileSync(filePath, buffer);

      localImagePaths.push(filePath);
    }

    // 3️⃣ Create list.txt with ABSOLUTE PATHS
    const listFile = path.join(tempDir, "list.txt");
    let listText = "";

    for (let filePath of localImagePaths) {
      listText += `file '${filePath.replace(/\\/g, "/")}'\n`;
      listText += `duration 3\n`;
    }

    fs.writeFileSync(listFile, listText);

    // 4️⃣ Download audio into temp
    const audioRes = await fetch(audioUrl);
    const audioBuffer = Buffer.from(await audioRes.arrayBuffer());
    const audioPath = path.join(tempDir, "audio.mp3");
    fs.writeFileSync(audioPath, audioBuffer);

    // 5️⃣ Final video output inside public/generated-videos
    const outputDir = path.join(process.cwd(),"videos");
    fs.mkdirSync(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, `${id}.mp4`);

    // 6️⃣ FFmpeg command (ABSOLUTE PATHS)
    const ffmpegCmd = `
      ffmpeg -y -f concat -safe 0 -i "${listFile}" \
      -i "${audioPath}" \
      -vf "scale=1080:1920,format=yuv420p" \
      -shortest "${outputPath}"
    `;

    console.log("🎥 FFmpeg running:", ffmpegCmd);

    // 7️⃣ Run FFmpeg
    await new Promise((resolve, reject) => {
      exec(ffmpegCmd, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });

    console.log("🎉 Video created at:", outputPath);
    console.log("Output path:", outputPath, "Exists:", fs.existsSync(outputPath));


    return NextResponse.json({
      videoUrl: `/api/video-file?id=${id}`,
    });

  } catch (err:any) {
    console.error("❌ VIDEO GENERATION ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Video generation failed" },
      { status: 500 }
    );
  }
}
