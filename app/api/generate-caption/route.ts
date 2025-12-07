

// import { NextRequest, NextResponse } from "next/server";
// import { AssemblyAI } from "assemblyai";

// export async function POST(req: NextRequest) {
//   try {
//     const { audioUrl } = await req.json();

//     if (!audioUrl) {
//       return NextResponse.json({ error: "audioUrl is required" }, { status: 400 });
//     }

//     const client = new AssemblyAI({
//       apiKey: process.env.CAPTION_API!,
//     });

//     // 1️⃣ Fetch audio file
//     const fileRes = await fetch(audioUrl);
//     const arrayBuffer = await fileRes.arrayBuffer();
//     const audioBuffer = new Uint8Array(arrayBuffer);

//     // 2️⃣ Upload file — RETURNS A STRING URL
//     const uploadUrl: string = await client.files.upload(audioBuffer);

//     // ❗ No upload_url property — uploadUrl *is already a URL string*

//     // 3️⃣ Transcribe audio
//     const transcript = await client.transcripts.transcribe({
//       audio_url: uploadUrl,
//     });
//     console.log(transcript.words);

//     return NextResponse.json({ 
//       text: transcript.words });

//   } catch (error: any) {
//     console.error("Caption error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { AssemblyAI } from "assemblyai";

export async function POST(req: Request) {
  try {
    const { audioUrl } = await req.json();

    if (!audioUrl) {
      return NextResponse.json({ error: "audioUrl is required" }, { status: 400 });
    }

    const client = new AssemblyAI({
      apiKey: process.env.CAPTION_API!,
    });

    // Download audio file
    const res = await fetch(audioUrl);
    const buffer = Buffer.from(await res.arrayBuffer());

    // Upload to AssemblyAI
    const file = await client.files.upload(buffer);

    // Transcribe
    const transcript = await client.transcripts.transcribe({
      audio_url: file, // uploaded URL
    });

    return NextResponse.json({
      text: transcript.text,
      words: transcript.words,
    });

  } catch (error: any) {
    console.error("Caption error:", error);
    return NextResponse.json(
      { error: error.message ?? "Unknown caption error" },
      { status: 500 }
    );
  }
}
