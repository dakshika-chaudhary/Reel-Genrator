import { NextResponse } from "next/server";
import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import util from "util";
import path from "path";

interface TTSRequest {
  text: string;
  id?: string;
}

// const client = new textToSpeech.TextToSpeechClient({
//   credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS as string)
// });

const credentials = JSON.parse(
  fs.readFileSync(process.env.GOOGLE_CLOUD_CREDENTIALS as string, "utf8")
);

const client = new textToSpeech.TextToSpeechClient({ credentials });


export async function POST(req: Request) {
  try {
    const { text,id }: TTSRequest = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }
    if(!id){
      return NextResponse.json(
        {error:"id is required"},
        {status:400}
      )
    }

    const request = {
      input: { text:text },
      voice: { languageCode: "en-US", ssmlGender: "FEMALE" as const },
      audioConfig: { audioEncoding: "MP3" as const },
    };

    const [response] = await client.synthesizeSpeech(request);

  // const outputFilePath = path.join(process.cwd(), "public", `output-${id}.mp3`);

  //   fs.writeFileSync(outputFilePath, response.audioContent as Buffer, "binary");

  //   console.log("✅ Audio file saved at:", outputFilePath);

  //   // Return URL to the frontend
  //   return NextResponse.json({
  //     result: `output-${id}.mp3`,
  //     url: `/output-${id}.mp3`,
  
      // Save MP3 to public folder
    const outputFilePath = path.join(process.cwd(), "public", `audio-${id}.mp3`);
    fs.writeFileSync(outputFilePath, response.audioContent as Buffer);

    console.log("✅ Audio saved:", outputFilePath);

    // Return permanent URL for frontend
    return NextResponse.json({ url: `/audio-${id}.mp3` });

  } catch (error: any) {
    console.error("TTS Error:", error);
    return NextResponse.json(
      { error: "Failed to generate speech" },
      { status: 500 }
    );
  }
}
