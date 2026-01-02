"use client";

import { useEffect, useRef, useState } from "react";

export default function CopilotPanel({ open }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Halo 👋 Aku AI copilot. Mau coba apa hari ini?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setTyping(true);

    // Fake AI response
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "ai", text: "Menarik 😄 Ceritakan sedikit lebih detail." },
      ]);
      setTyping(false);
    }, 900);
  }

  return (
    <div
      className={`
        fixed bottom-24 right-6 z-[9999]
        w-[340px] h-[380px]
        rounded-3xl
        bg-neutral-900/95 backdrop-blur
        text-white
        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
        border border-neutral-800
        flex flex-col overflow-hidden
        transition-all duration-300 ease-out
        ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 pointer-events-none"
        }
      `}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-800 flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-white to-neutral-400 text-black flex items-center justify-center text-xs font-bold">
          AI
        </div>
        <p className="text-sm font-semibold">AI Copilot</p>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto text-sm">
        {messages.map((m, i) =>
          m.role === "ai" ? (
            <div key={i} className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-neutral-700 flex-shrink-0" />
              <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-neutral-800 px-3 py-2">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-end">
              <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-white text-black px-3 py-2">
                {m.text}
              </div>
            </div>
          )
        )}

        {typing && (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-neutral-700" />
            <div className="px-3 py-2 rounded-2xl bg-neutral-800 flex gap-1">
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce delay-150" />
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce delay-300" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-neutral-800">
        <div className="flex items-center gap-2 bg-neutral-800 rounded-2xl px-3 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Tanya singkat..."
            className="
              flex-1 bg-transparent
              text-sm outline-none
              placeholder:text-neutral-400
            "
          />
          <button
            onClick={sendMessage}
            className="
              px-3 py-1 rounded-xl
              bg-white text-black text-xs font-semibold
              hover:bg-neutral-200 transition
            "
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
