import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { topic, style, duration } = await req.json();

  // Simple script generator (you can replace with AI later)
  const script = `
    This is a ${duration} ${style} video about ${topic}.
    The story unfolds with engaging visuals and narration,
    designed for short-form content and reels.
  `;

  return NextResponse.json({ script });
}
