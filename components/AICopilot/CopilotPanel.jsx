"use client";
import { useEffect, useRef, useState } from "react";

export default function CopilotPanel({ open, onClose = () => {} }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Halo Wibu 👋 Aku AI Copilot. Mau eksplor apa hari ini?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    boxRef.current?.scrollTo({
      top: boxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [open, onClose]);

  async function send() {
    if (!input.trim() || loading) return;

    const next = [...messages, { role: "user", content: input }];
    setMessages(next);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: next }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let text = "";

    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        if (line.includes("[DONE]")) continue;

        try {
          const json = JSON.parse(line.replace("data: ", ""));
          const token = json.choices?.[0]?.delta?.content;
          if (token) {
            text += token;
            setMessages((m) => {
              const copy = [...m];
              copy[copy.length - 1].content = text;
              return copy;
            });
          }
        } catch {}
      }
    }

    setLoading(false);
  }

  if (!open) return null;

  return (
    <div
      className="
        fixed bottom-24 right-6 z-[9999]
        w-[360px] max-h-[460px]
        rounded-3xl
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        flex flex-col overflow-hidden
      "
    >
      {/* Header */}
      <div className="px-4 py-3 border-b dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-300 text-white dark:text-black flex items-center justify-center text-xs font-bold">
            AI
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">AI Copilot</p>
            <p className="text-xs text-zinc-500">
              {loading ? "Sedang berpikir…" : "Siap membantu"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={boxRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[82%] leading-relaxed ${
              m.role === "user"
                ? "ml-auto bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black rounded-2xl rounded-tr-sm px-3 py-2"
                : "bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-tl-sm px-3 py-2"
            }`}
          >
            {m.content}
          </div>
        ))}

        {loading && (
          <div className="text-xs text-zinc-500">AI sedang mengetik…</div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t dark:border-zinc-800">
        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-2xl px-3 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Tulis pertanyaan…"
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button
            onClick={send}
            className="text-xs font-semibold px-3 py-1 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-black"
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
