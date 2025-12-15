import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const videos = await Video.find({ userId }).sort({ createdAt: -1 });

  return NextResponse.json(videos);
}
