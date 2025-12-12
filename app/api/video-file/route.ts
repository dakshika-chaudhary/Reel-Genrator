import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "public", "videos", `${id}.mp4`);

  if (!fs.existsSync(filePath)) {
    console.log("❌ FILE NOT FOUND:", filePath);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const buffer = fs.readFileSync(filePath);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "video/mp4",
    },
  });
}

