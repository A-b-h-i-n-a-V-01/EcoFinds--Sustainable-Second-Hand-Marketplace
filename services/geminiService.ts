
import { GoogleGenAI } from "@google/genai";
import { Category } from '../types';

// IMPORTANT: In a real application, the API key should be stored in a secure environment variable.
// We are using a placeholder here as per the instructions.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateDescription = async (title: string, category: Category): Promise<string> => {
  if (!API_KEY) {
    return "AI description generation is unavailable. Please set up your API key.";
  }
  try {
    const prompt = `Generate a compelling and concise marketplace description for a second-hand item. Be enthusiastic and highlight its value. Keep it under 50 words.

Item Title: "${title}"
Category: "${category}"

Description:`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating description with Gemini API:", error);
    return "Failed to generate AI description. Please try again or write one manually.";
  }
};
