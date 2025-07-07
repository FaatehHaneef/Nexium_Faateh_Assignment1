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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data: { quotes?: string[] } = await res.json();
      setResult(data.quotes || ["No quotes found. Try again!"]);
    } catch (err) {
      console.error("Client error:", err);
      setResult(["❌ Something went wrong!"]);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-black to-purple-900 text-white flex flex-col items-center justify-center overflow-hidden px-4 py-10">
      {/* Decorative Background Blobs */}
      <div className="absolute w-[40rem] h-[40rem] bg-purple-500 opacity-30 rounded-full -top-40 -left-40 blur-3xl"></div>
      <div className="absolute w-[30rem] h-[30rem] bg-fuchsia-500 opacity-20 rounded-full -bottom-20 -right-20 blur-2xl"></div>

      {/* Header Box */}
      <div className="relative z-10 mb-10 backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-xl px-8 py-6 text-center">
        <h1 className="text-5xl font-extrabold text-white tracking-wide drop-shadow-md">
          🤖 AI Quote Generator
        </h1>
        <p className="mt-2 text-sm text-purple-300">
          ✨ Summon Some Wisdom ✨
        </p>
      </div>

      {/* Input Box */}
      <div className="relative z-10 w-full max-w-xl bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-8 shadow-2xl">
        <Input
          placeholder="Options: love, life, productivity, coding, happiness & Taylor Swift"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mb-4 bg-white/10 text-white border-white/20 placeholder-purple-300"
        />

        <Button
          onClick={handleGenerate}
          className="w-full bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white font-bold shadow-lg hover:opacity-90"
        >
          ✨ Generate Quotes
        </Button>

        {/* Quotes Output */}
        <div className="mt-6 space-y-4">
          {result.map((quote, i) => (
            <div
              key={i}
              className="bg-white/10 border border-white/10 rounded-md p-4 text-sm text-purple-100 italic shadow-sm"
            >
              <span className="text-lg">💬</span> {quote}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

