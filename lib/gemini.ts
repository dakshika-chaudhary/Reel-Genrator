import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
});

export const modelName = "gemini-3-pro-preview";

export const config = {
  thinkingConfig: {
    thinkingLevel: "HIGH",
  },
  tools: [
    {
      googleSearch: {},
    },
  ],
};
