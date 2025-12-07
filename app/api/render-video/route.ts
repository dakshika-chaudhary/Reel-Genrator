// import { NextResponse } from "next/server";
// import { bundle } from "@remotion/bundler";
// import { getCompositions, renderMedia } from "@remotion/renderer";
// import path from "path";
// import fs from "fs";
// import os from "os";

// export const dynamic = "force-dynamic"; 

// export async function POST(req: Request) {
//   try {
//     const { images, captions } = await req.json();

    
//     if (!Array.isArray(images) || !Array.isArray(captions)) {
//       throw new Error("images and captions must be arrays");
//     }

//     console.log("🎬 Rendering:", images.length, "frames");

//     const entry = path.join(process.cwd(), "remotion", "index.tsx");
//     const serveUrl = await bundle(entry);

//     const comps = await getCompositions(serveUrl);
//     const composition = comps.find((c) => c.id === "my-video");

//     if (!composition) 
//       throw new Error("Composition 'my-video' not found");

//      const durationInFrames = captions.length * 30;

//     const output = path.join(os.tmpdir(), `video-${Date.now()}.mp4`);

//     await renderMedia({
//       composition,
//       serveUrl,
//       outputLocation: output,
//       inputProps: { images, captions },
//       codec: "h264",
//     });

//     const video = fs.readFileSync(output);

//     return new NextResponse(video, {
//       status: 200,
//       headers: {
//         "Content-Type": "video/mp4",
//         "Content-Disposition": "attachment; filename=generated.mp4",
//       },
//     });

//   } catch (err: any) {
//     console.error("Render error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import { bundle } from "@remotion/bundler";
// import { getCompositions, renderMedia } from "@remotion/renderer";
// import path from "path";
// import fs from "fs";
// import os from "os";

// export const dynamic = "force-dynamic"; // ensure Node runtime

// export async function POST(req: Request) {
//   try {
//     const { images, captions } = await req.json();

//     if (!Array.isArray(images) || !Array.isArray(captions)) {
//       throw new Error("images and captions must be arrays");
//     }

//     console.log("🎬 Rendering:", images.length, "frames");

//     const entry = path.join(process.cwd(), "remotion", "index.tsx"); // 👈 this file
//     const serveUrl = await bundle(entry);

//     const comps = await getCompositions(serveUrl);
//     const video = comps.find((c) => c.id === "my-video"); // 👈 MUST match Root.tsx

//     if (!video) {
//       throw new Error("Composition 'my-video' not found");
//     }

//     const durationInFrames = captions.length * 30; // 1 sec per caption

//     const output = path.join(os.tmpdir(), `video-${Date.now()}.mp4`);

//     await renderMedia({
//       serveUrl,
//       composition: {
//         ...video,
//         durationInFrames,
//       },
//       inputProps: { images, captions },
//       codec: "h264",
//       outputLocation: output,
//     });

//     const file = fs.readFileSync(output);

//     return new NextResponse(file, {
//       status: 200,
//       headers: {
//         "Content-Type": "video/mp4",
//         "Content-Disposition": "attachment; filename=generated.mp4",
//       },
//     });
//   } catch (err: any) {
//     console.error("❌ Render error:", err);
//     return NextResponse.json({ error: err.message ?? "Unknown error" }, { status: 500 });
//   }
// }
