import { GoogleGenAI } from "@google/genai";

export const chatSession = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
});

// export const modelName = "gemini-3-pro-preview";
export const modelName = "gemini-2.0-flash";

export async function sendMessage(prompt: string) {
  const response = await chatSession.models.generateContent({
    model: modelName,

    config: {
     
      tools: [
        {
          googleSearch: {},
        },
      ],
    },

    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });
console.log ("Response from Gemini API:", response);

const parts = response?.candidates?.[0]?.content?.parts || [];

  const text = parts
    .map((part: any) => part.text || "")
    .join("\n")
    .trim();
  return text;
}
