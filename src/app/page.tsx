"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const quotes = {
  love: [
    "Love is blind.",
    "Love conquers all.",
    "All you need is love.",
  ],
  inspiration: [
    "Dream big.",
    "Stay positive.",
    "Never give up.",
  ],
  life: [
    "Life is what you make it.",
    "Live and let live.",
    "Life is short, make it sweet.",
  ],
};

export default function Home() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<string[]>([]);

  const handleGenerate = () => {
    const found = quotes[topic.toLowerCase() as keyof typeof quotes];
    setResult(found || ["No quotes found for this topic."]);
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
        {result.map((quote, i) => (
          <p key={i} className="text-lg">
            “{quote}”
          </p>
        ))}
      </div>
    </main>
  );
}

