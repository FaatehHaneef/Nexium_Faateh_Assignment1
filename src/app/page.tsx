"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<string[]>([]);

  const handleGenerate = async () => {
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
        {result.map((quote: string, i: number) => (
  <p key={i} className="text-lg">
    “{quote}”
  </p>
))}
      </div>
    </main>
  );
}

