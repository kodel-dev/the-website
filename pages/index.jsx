import Link from "next/link";
import { useState } from "react";
import AnimatedMessage from "../components/AnimatedMessage";
import DelayCursor from "../components/DelayCursor";
import AnimeCTAButton from "@components/ayuAtama/button";
import FakeFemboyPopup from "@components/ayuAtama/fakePopup";
import MovingPuzzleButton from "../components/MovingPuzzleButton";
import Fireworks from "../components/Fireworks";

export default function Index() {
  const [fireworksOn, setFireworksOn] = useState(false);

  function Visitor() {
    return (
      <div className="mt-24 mb-12 relative group max-w-xs mx-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center shadow-2xl">
           
           <div className="flex items-center gap-2 mb-4 bg-white/5 px-3 py-1 rounded-full border border-white/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Live Traffic</span>
           </div>
           
           <a 
             href="https://flagcounter.me/details/gt8" 
             target="_blank" 
             rel="noreferrer"
             className="transform transition-transform duration-300 hover:scale-105"
           >
             <img 
               src="https://flagcounter.me/gt8/" 
               alt="Flag Counter" 
               className="rounded-lg shadow-lg border border-white/5"
             />
           </a>
           
           <p className="text-[10px] text-gray-500 mt-4 font-mono">
             Real-time visitor tracking from around the world.
           </p>
        </div>
      </div>
    );
  }

  const MenuCard = ({ href, title, colorClass, icon, description, isExternal }) => {
    const content = (
      <div className={`glass-card h-full p-6 rounded-2xl border border-white/10 relative overflow-hidden group-hover:border-${colorClass}-500/50 transition-all duration-300`}>
        <div className={`absolute inset-0 bg-gradient-to-br from-${colorClass}-500/0 to-${colorClass}-500/0 group-hover:from-${colorClass}-500/10 group-hover:to-transparent transition-all duration-500`} />
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="mb-4">
            <div className={`w-12 h-12 rounded-lg bg-${colorClass}-500/20 flex items-center justify-center mb-3 text-2xl`}>
              {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
              {title}
            </h3>
            {description && <p className="text-sm text-gray-400">{description}</p>}
          </div>
          <div className="flex items-center text-xs font-semibold text-gray-500 group-hover:text-white transition-colors">
            BUKA FITUR &rarr;
          </div>
        </div>
      </div>
    );

    if (isExternal) {
      return <a href={href} className="block group">{content}</a>;
    }
    return <Link href={href} className="block group">{content}</Link>;
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center">
      <FakeFemboyPopup />
      <DelayCursor delay={0.01} />
      
      <div className="text-center mb-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-10 w-full flex justify-center opacity-80">
             <AnimatedMessage />
        </div>
        
        <h2 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 py-4 mt-20">
          Selamat Datang!
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-2">
          Pusat eksperimen coding, game aneh, dan fitur absurd.
          Silakan jelajahi kekacauan ini.
        </p>

        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <AnimeCTAButton />
          <MovingPuzzleButton />
          
          <button
            onClick={() => setFireworksOn((v) => !v)}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2 shadow-lg border ${
              fireworksOn 
                ? "bg-green-500/20 border-green-500 text-green-400 hover:shadow-green-500/50" 
                : "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
            }`}
          >
            <span>{fireworksOn ? "✨ MATIKAN EFEK" : "🚀 NYALAKAN EFEK"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full px-4 mb-16">
        
        <MenuCard 
          href="/home" 
          title="MULAI" 
          icon="🚀" 
          colorClass="blue"
          description="Halaman utama dashboard."
        />

        <MenuCard 
          href="/nbrthx" 
          title="SVGSTEGO" 
          icon="🔐" 
          colorClass="purple"
          description="Sembunyikan pesan rahasia dalam SVG."
        />

        <MenuCard 
          href="/kodel-dev" 
          title="MUSTAHIL" 
          icon="🤬" 
          colorClass="orange"
          description="Tombol yang tidak sopan."
        />

        <MenuCard 
          href="/doom" 
          title="DOOM" 
          icon="💀" 
          colorClass="red"
          description="Mainkan game klasik DOOM di browser."
        />

        <MenuCard 
          href="/vinrex/index.html" 
          title="VINREX GAME" 
          icon="🦖" 
          colorClass="yellow"
          description="Game dinosaurus offline Chrome."
          isExternal={true}
        />

        <MenuCard 
          href="/snekabsurd" 
          title="Absurd Snek" 
          icon="🐍" 
          colorClass="green"
          description="Game ular tapi aneh."
        />

        <MenuCard 
          href="/bola-ajaib" 
          title="Bola Ajaib" 
          icon="🎱" 
          colorClass="indigo"
          description="Tanyakan nasibmu pada bola."
        />

        <MenuCard 
          href="/gabut" 
          title="Gabut Mode" 
          icon="💤" 
          colorClass="gray"
          description="Tempat buang-buang waktu."
        />

        <MenuCard 
          href="/guestbook" 
          title="Guestbook" 
          icon="📖" 
          colorClass="pink"
          description="Tuliskan jejak kunjunganmu."
        />

      </div>

      <Fireworks enabled={fireworksOn} />
      
      <Visitor />
      
      <div className="h-10"></div>
    </div>
  );
}