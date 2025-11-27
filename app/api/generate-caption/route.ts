import { NextRequest, NextResponse } from "next/server";
import {AssemblyAI} from 'assemblyai';

export async function POST(req:NextRequest){

    try{
const { audioUrl } = await req.json(); 

if (!audioUrl) {
      return NextResponse.json({ error: "audioUrl is required" }, { status: 400 });
    }

const client = new AssemblyAI({
  apiKey: process.env.CAPTION_API!,
});

const audioFile = audioUrl;

const data = {
  audio: audioFile
};

  const transcript = await client.transcripts.transcribe(data);
  console.log(transcript.text);

  return NextResponse.json({ text: transcript.text });
}
catch(err:any){
   return NextResponse.json({'error':err})
}
}