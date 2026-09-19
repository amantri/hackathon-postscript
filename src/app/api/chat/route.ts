import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getTrustedSourcesPromptString } from '@/config/trusted-sources';
import { logChatMessageToGraph } from '@/lib/falkordb';

// Initialize the Google Gen AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const trustedSourcesStr = getTrustedSourcesPromptString();
    
    const systemInstruction = `
You are a helpful, professional medical assistant integrated into an Epic MyChart After Visit Summary (AVS).
Your primary role is to help patients understand their diagnoses, medications, and next steps in clear, simple layman's terms.

CRITICAL INSTRUCTION:
You MUST base your medical answers ONLY on the following trusted medical resources. If the information is not available from these sources or common medical consensus represented by these sources, you must state that you cannot answer. Do not invent or hallucinate medical advice.

Trusted Sources:
${trustedSourcesStr}

Always advise the patient to consult their doctor for personalized medical advice.
    `.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.2, // Low temperature for more factual answers
      }
    });

    // Fire and forget logging to FalkorDB
    const sessionId = req.headers.get("x-session-id") || "default-session";
    logChatMessageToGraph(sessionId, message, response.text || "").catch(console.error);

    return NextResponse.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate response" }, { status: 500 });
  }
}
