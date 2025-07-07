export async function POST(req: Request) {
  const { topic } = await req.json();
  const isVercel = process.env.VERCEL === "1";

  // Fallback behavior for Vercel (since it can't access localhost)
  if (isVercel) {
    console.warn("⚠️ Running on Vercel – using static fallback quotes.");
    return Response.json({
      quotes: `• Believe in yourself.\n• Stay consistent.\n• Never stop dreaming.`
    });
  }

  try {
    console.log("📥 Topic received:", topic);

    const ollamaRes = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        prompt: `Give me 3 short, inspiring quotes about "${topic}". Format them as a bullet list.`,
        stream: false
      }),
    });

    if (!ollamaRes.ok) {
      const error = await ollamaRes.text();
      throw new Error(`Ollama Error ${ollamaRes.status}: ${error}`);
    }

    const result = await ollamaRes.json();
    const text = result.response;

    console.log("🧠 Mistral response:\n", text);

    return Response.json({ quotes: text.split("\n").filter(q => q.trim()) });

  } catch (err) {
    console.error("🔥 Ollama fetch failed:", err);
    return new Response("Failed to generate quotes", { status: 500 });
  }
}

