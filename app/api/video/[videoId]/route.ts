import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ videoId: string }> }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 🔥 THIS IS THE FIX
  const { videoId } = await context.params;

  await connectDB();

  const video = await Video.findOne({
    videoId,
    userId,
  });

  if (!video) {
    return NextResponse.json(
      { error: "Video not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(video);
}
