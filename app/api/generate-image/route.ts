// import { NextRequest, NextResponse } from "next/server";

// const HUGGING_FACE_API = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev";

// export async function POST(req: NextRequest) {
//   try {
//     const { caption, count } = await req.json();

//     if (!caption) return NextResponse.json({ error: "Caption is required" }, { status: 400 });

//     const numImages = Math.min(count || 1, 3);
//     const images: string[] = [];

//     for (let i = 0; i < numImages; i++) {
//       const response = await fetch(HUGGING_FACE_API, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ inputs: caption }),
//       });

//       const data = await response.json();
//       if (data && data[0]?.generated_image) images.push(data[0].generated_image);
//       else if (data?.error) return NextResponse.json({ error: data.error }, { status: 500 });
//     }

//     return NextResponse.json({ images });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
// app/api/generate-image/route.ts



// const HF_API =
//   "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev";

// export async function POST(req: NextRequest) {
//   try {
//     const { caption, count } = await req.json();
//     if (!caption)
//       return NextResponse.json(
//         { error: "Caption is required" },
//         { status: 400 }
//       );

//     const numImages = Math.min(count || 1, 3);
//     const images: string[] = [];

//     for (let i = 0; i < numImages; i++) {
//       const response = await fetch(HF_API, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           inputs: caption,
//           parameters: { guidance_scale: 3 },
//           options: { wait_for_model: true },
//         }),
//       });

//       // If HF responds with text error, capture it
//       const contentType = response.headers.get("Content-Type") || "";

//       if (contentType.includes("application/json")) {
//         const err = await response.json();
//         console.error("❌ HF JSON ERROR:", err);
//         return NextResponse.json({ error: err.error }, { status: 500 });
//       }

//       // Read raw binary PNG
//       const buffer = Buffer.from(await response.arrayBuffer());

//       const base64 = "data:image/png;base64," + buffer.toString("base64");

//       images.push(base64);
//     }

//     return NextResponse.json({ images });
//   } catch (error: any) {
//     console.error("API Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { caption } = await req.json();
    const base = process.env.NEXT_PUBLIC_SITE_URL; 

    if (!caption) {
      return NextResponse.json(
        { error: "Caption is required" },
        { status: 400 }
      );
    }

    // 1️⃣ Split sentences
    const sentences = caption
      .split(".")
      .map((s: string) => s.trim())
      .filter(Boolean);

    // 2️⃣ Static prototype images
    const predefined = [
  `${base}/prototype-images/img1.jpg`,
  `${base}/prototype-images/img2.jpg`,
  `${base}/prototype-images/img3.jpg`,
  `${base}/prototype-images/img4.jpg`,
];

    // 3️⃣ Assign image per sentence
    const generated = sentences.map(
      (_: any, idx: number) => predefined[idx % predefined.length]
    );

    return NextResponse.json({
      sentences,
      images: generated,
    });

  } catch (err: any) {
    console.log("IMAGE API ERROR:", err);
    return NextResponse.json(
      { error: "Image generation failed" },
      { status: 500 }
    );
  }
}

