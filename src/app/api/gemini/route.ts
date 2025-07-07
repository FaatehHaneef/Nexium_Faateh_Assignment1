import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();
    console.log("📥 Topic received:", topic);

    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      body: JSON.stringify({
        model: "mistral",
        prompt: `Give me 3 short quotes about "${topic}". Output them as a bullet list.`,
        stream: false,
      }),
    });

    const data = await res.json();
    const text = data.response;

    console.log("🧠 Mistral response:\n", text);

    const quotes = text
      .split("\n")
      .map((q: string) => q.trim())
      .filter((q: string) => q.length > 0 && q !== "-");

    return Response.json({ quotes });
  } catch (err) {
    console.error("🔥 Ollama fetch failed:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

