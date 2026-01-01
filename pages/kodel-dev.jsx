import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function KodelDev() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isCaught, setIsCaught] = useState(false);
  const [message, setMessage] = useState("Coba Klik Gw Kalau Bisa! 😝");
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const playSound = (soundFile) => {
    const audio = new Audio(`/sounds/${soundFile}`);
    audio.volume = 0.5;
    audio.play().catch((e) => console.log("Audio play failed", e));
  };

  const runAway = () => {
    if (isCaught) return;

    if (attempts % 5 === 0 && attempts > 0) {
       playSound("meluncur.mp3");
    }

    const x = Math.random() * (window.innerWidth - 200) - (window.innerWidth / 2 - 100);
    const y = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100);
    
    setPosition({ x, y });
    setAttempts((prev) => prev + 1);
    
    const taunts = [
      "Eits, meleset! 🤣",
      "Kurang cepet bang!",
      "Kejar aku dong~",
      "Nyerah aja udah...",
      "Wkwkwk kasian...",
      "Lag ya mouse-nya?",
    ];
    setMessage(taunts[Math.floor(Math.random() * taunts.length)]);
  };

  const handleWin = () => {
    setIsCaught(true);
    setMessage("ANJIR KENA DONG?! 😱");
    playSound("meledug.mp3");
  };

  const resetGame = () => {
    setIsCaught(false);
    setAttempts(0);
    setPosition({ x: 0, y: 0 });
    setMessage("Oke, ronde 2! Siap?");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center overflow-hidden relative selection:bg-red-500 selection:text-white">
      <div className="absolute top-8 left-8 z-50">
        <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Kembali ke Menu
        </Link>
      </div>

      <div className="absolute top-8 right-8 text-right z-40 pointer-events-none">
        <h3 className="text-gray-500 text-sm uppercase tracking-widest">Attempts</h3>
        <p className="text-4xl font-black text-red-500">{attempts}</p>
      </div>

      <div className="text-center z-10 pointer-events-none">
         <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 mb-4 animate-pulse">
           THE IMPOSSIBLE BUTTON
         </h1>
         <p className="text-xl text-gray-300 font-mono min-h-[30px] transition-all">
           {message}
         </p>
      </div>

      <div 
        className="absolute transition-all duration-100 ease-out"
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`,
          zIndex: 20
        }}
      >
        {!isCaught ? (
          <button
            onMouseEnter={runAway}
            onClick={handleWin}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] border-4 border-blue-400 transition-all active:scale-95 whitespace-nowrap"
          >
            KLIK GW DONG! 🖱️
          </button>
        ) : (
          <div className="flex flex-col items-center animate-bounce">
            <div className="text-6xl mb-4">💥🤯💥</div>
            <button 
              onClick={resetGame}
              className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg shadow-lg font-bold"
            >
              Main Lagi?
            </button>
          </div>
        )}
      </div>

      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full blur-[100px] animate-pulse"></div>
         <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>
    </div>
  );
}