import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Video from "@/models/Video"; // adjust import
import { auth } from "@clerk/nextjs/server";

export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { videoId } = await req.json();

  try {
    // 1️⃣ Delete DB record
    const video = await Video.findOneAndDelete({ videoId, userId });

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // 2️⃣ Delete video file
    const videoPath = path.join(
      process.cwd(),
      "public",
      "videos",
      `${videoId}.mp4`
    );

    if (fs.existsSync(videoPath)) {
      fs.unlinkSync(videoPath);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
