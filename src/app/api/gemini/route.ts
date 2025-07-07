import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();
    console.log("📥 Topic received:", topic);

    const lowerTopic = topic.toLowerCase();

    // 💬 Hardcoded quotes
    const fallbackQuotes: Record<string, string[]> = {
      love: [
        "Love is not just a feeling, it's a choice you make daily.",
        "The best thing to hold onto in life is each other.",
        "To love and be loved is to feel the sun from both sides.",
        "In dreams and in love, there are no impossibilities.",
        "Love grows by giving. The love we give away is the only love we keep.",
      ],
      life: [
        "Life is really simple, but we insist on making it complicated.",
        "Do not take life too seriously. You will never get out of it alive.",
        "Life is either a daring adventure or nothing at all.",
        "Life is short. Smile while you still have teeth.",
        "Live life to the fullest and focus on the positive.",
      ],
      coding: [
        "First, solve the problem. Then, write the code.",
        "Coding is today's language of creativity.",
        "Code is like humor. When you have to explain it, it’s bad.",
        "Talk is cheap. Show me the code.",
        "Good code is its own best documentation.",
      ],
      happiness: [
        "Happiness is not by chance, but by choice.",
        "Happiness is only real when shared.",
        "Be happy for this moment. This moment is your life.",
        "Happiness depends upon ourselves.",
        "Do more of what makes you happy.",
      ],
      productivity: [
        "Focus on being productive instead of busy.",
        "It’s not always that we need to do more but rather focus on less.",
        "Small steps in the right direction can turn out to be the biggest steps of your life.",
        "Work smarter, not harder.",
        "Success is the sum of small efforts repeated daily.",
      ],
      "taylor swift": [
        "I'm intimidated by the fear of being average. – Taylor Swift",
        "No matter what happens in life, be good to people. – TS",
        "The rest of the world was black and white, but we were in screaming color.",
        "People haven't always been there for me, but music always has.",
        "We’re happy, free, confused, and lonely at the same time.",
      ],
    };

    // ✅ If a hardcoded match is found
    if (fallbackQuotes[lowerTopic]) {
      return Response.json({ quotes: fallbackQuotes[lowerTopic] });
    }

    // 🌐 Else, fall back to Ollama/Mistral fetch
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
    return Response.json(
      {
        quotes: [
          "⚠️ Sorry, something went wrong. Try again later or with a different topic.",
        ],
      },
      { status: 500 }
    );
  }
}

