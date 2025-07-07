// src/app/api/gemini/route.ts

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();
    console.log("📥 Topic received:", topic);

    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral",
        prompt: `Give me 3 short quotes about "${topic}". Output them as a bullet list.`,
        stream: false,
      }),
    });

    const data = await res.json();
    const text = data.response;

    console.log("🧠 Mistral response:\n", text);

    // ✅ Always return an array
    const quotes = text
      .split("\n")
      .map(q => q.trim())
      .filter(q => q.length > 0 && q !== "-");

    return Response.json({ quotes });
  } catch (err) {
    console.error("🔥 Ollama fetch failed:", err);
    return Response.json({ quotes: ["Error generating quotes."] });
  }
}

