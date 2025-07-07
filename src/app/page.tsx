"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<string[]>([]);

  const handleGenerate = async () => {
  const fallbackQuotes: Record<string, string[]> = {
    love: [
      "Love is not just feeling; it is an action that speaks volumes.",
      "The more one judges, the less one loves.",
      "Love recognizes no barriers. It jumps hurdles to reach its destination."
    ],
    inspiration: [
      "Dream big, start small, act now.",
      "Inspiration exists, but it has to find you working.",
      "Push yourself, because no one else is going to do it for you."
    ],
    life: [
      "Life is what happens when you're busy making other plans.",
      "Enjoy the little things in life, for one day you'll look back and realize they were the big things.",
      "Life is either a daring adventure or nothing at all."
    ]
  };

  const lowerTopic = topic.toLowerCase().trim();

  // Return hardcoded quotes if topic matches
  if (fallbackQuotes[lowerTopic]) {
    setResult(fallbackQuotes[lowerTopic]);
    return;
  }

  // Otherwise, call the API
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Server Error: ${res.status} – ${text}`);
    }

    const data: { quotes?: string[] } = await res.json();
    setResult(data.quotes || ["No quotes received. Try again!"]);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("API error:", err);
      setResult([`❌ Error: ${err.message}`]);
    } else {
      setResult(["❌ Unknown error occurred."]);
    }
  }
};


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 gap-4">
      <h1 className="text-3xl font-bold">Quote Generator</h1>
      <Input
        placeholder="Enter a topic (e.g. love, life, inspiration)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full max-w-md"
      />
      <Button onClick={handleGenerate}>Generate Quotes</Button>

      <div className="mt-6 space-y-2 text-center">
        {Array.isArray(result) ? (
          result.map((quote, i) => (
            <p key={i} className="text-lg">“{quote}”</p>
          ))
        ) : (
          <p className="text-red-500">⚠ Could not load quotes. Try again.</p>
        )}
      </div>
    </main>
  );
}

