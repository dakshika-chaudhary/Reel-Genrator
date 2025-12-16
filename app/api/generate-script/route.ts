import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("🚀 generate-script API called");

    const { topic, duration, style, customPrompt } = await req.json();

    if (!topic || !duration || !style) {
      return NextResponse.json(
        { error: "topic, duration and style are required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY missing" },
        { status: 500 }
      );
    }

    const durationMap: Record<string, number> = {
      "30 Seconds": 70,
      "60 Seconds": 140,
    };

    const wordLimit = durationMap[duration] || 80;

    const basePrompt = customPrompt
      ? `Use this custom prompt:\n"${customPrompt}"`
      : `Create a ${topic.toLowerCase()} story`;

    const prompt = `
You are a professional short-video script writer.

${basePrompt}

Rules:
- Style: ${style}
- Duration: ${duration}
- Word limit: ${wordLimit}
- Short sentences
- No emojis
- No headings
- Narration only
`;

    // ✅ REST v1 CALL (CORRECT)
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Gemini error:", err);
      return NextResponse.json(
        { error: "Gemini request failed" },
        { status: 500 }
      );
    }

    const data = await res.json();
    const script = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!script) {
      return NextResponse.json(
        { error: "No script returned" },
        { status: 500 }
      );
    }

    console.log("✅ Script generated");

    return NextResponse.json({ script });
  } catch (err: any) {
    console.error("❌ SCRIPT ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Script generation failed" },
      { status: 500 }
    );
  }
}
