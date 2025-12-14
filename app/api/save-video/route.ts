import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  await connectDB();

  const video = await Video.create({
    userId,
    ...body
  });

  return NextResponse.json({ success: true, video });
}
