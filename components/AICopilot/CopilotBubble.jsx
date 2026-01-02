export default function CopilotBubble({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-6 right-6 z-50
        h-12 px-5 rounded-full
        bg-gradient-to-br from-zinc-900 to-zinc-700
        dark:from-zinc-100 dark:to-zinc-300
        text-white dark:text-black
        shadow-[0_8px_30px_rgba(0,0,0,0.4)]
        hover:scale-[1.04]
        active:scale-[0.97]
        transition-all duration-200
        text-sm font-semibold
        tracking-tight
      "
    >
      Ask AI
    </button>
  );
}
