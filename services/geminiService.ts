
import { GoogleGenAI } from "@google/genai";
import type { GroceryCategory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateDescription(itemName: string, category: GroceryCategory): Promise<string> {
  if (!itemName || !category) {
    throw new Error("Item name and category are required to generate a description.");
  }

  const prompt = `Generate a brief, appealing grocery store item description for a product named "${itemName}" in the "${category}" category. The description should be concise, enticing for customers, and under 40 words.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating description with Gemini API:", error);
    return "Failed to generate description. Please try again.";
  }
}
