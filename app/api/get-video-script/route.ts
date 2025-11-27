import { NextResponse } from "next/server";
import { sendMessage } from "@/configs/AiModel";
import { chatSession } from "@/configs/AiModel";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    console.log("Prompt:", prompt);

    const result = await sendMessage(prompt);
     console.log("Gemini response text:", result);

    return NextResponse.json({ result });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}


// import { NextResponse } from "next/server";
// import { chatSession } from "@/configs/AiModel";

// export async function POST(req) {
//   try {
//     const { prompt } = await req.json();
//     console.log("Prompt received:", prompt);

//     const result = await chatSession.sendMessage(prompt);
//     const responseText = await result.response.text(); // await here

//     console.log("AI response:", responseText);

//     // If the response is JSON, parse it; otherwise just return the text
//     let parsedResult;
//     try {
//       parsedResult = JSON.parse(responseText);
//     } catch {
//       parsedResult = responseText;
//     }

//     return NextResponse.json({ result: parsedResult });

//   } catch (e) {
//     console.error(e);
//     return NextResponse.json(
//       { error: e.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }
