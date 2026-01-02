import Link from "next/link";
import { useState } from "react";
import AnimatedMessage from "../components/AnimatedMessage";
import DelayCursor from "../components/DelayCursor";
import AnimeCTAButton from "@components/ayuAtama/button";
import FakeFemboyPopup from "@components/ayuAtama/fakePopup";
import MovingPuzzleButton from "../components/MovingPuzzleButton";
import AICopilot from "@components/AICopilot/AICopilot";

export default function Index() {
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
      <AnimeCTAButton />
      <MovingPuzzleButton />

      <AnimatedMessage />
      <DelayCursor />
      <Visitor />
      {/* <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style> */}
      <AICopilot />
    </div>
  );
}