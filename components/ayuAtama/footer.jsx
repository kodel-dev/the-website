import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const FOOTER_LINES = [
  "Still here? That probably means the interface did its job a little too well.",
  "You’re allowed to close the tab anytime. Or maybe not?",
  "No animations are running right now, and yet your attention is still locked in.",
  "We optimized this page for speed, clarity, and comfort.",
  "Everything on this page is working exactly as expected.",
  "At this point, you’re no longer just browsing. You’re actively participating.",
  "There’s nothing hidden below this footer... except code.",
];

function Footer() {
  const [footerIndex, setFooterIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFooterIndex((prev) => (prev + 1) % FOOTER_LINES.length);
    }, 6000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-slate-900 text-white relative overflow-hidden font-sans border-t border-slate-800">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center relative z-10">
        
        <div className="flex flex-col items-center gap-2 mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            FemRent
          </h2>
          <p className="text-slate-400 text-sm">Your reliable companion platform.</p>
        </div>

        <div className="max-w-xl mx-auto text-center px-4 py-3 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm mb-10">
          <p className="text-sm text-indigo-300 italic transition-opacity duration-500 ease-in-out">
            "{FOOTER_LINES[footerIndex]}"
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm font-medium text-slate-300">
          <Link href="/ayuAtama/rent-femboy" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/ayuAtama/rent-femboy/discover" className="hover:text-white transition-colors">
            Discover
          </Link>
          <Link href="/ayuAtama/rent-femboy/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        <div className="w-full h-px bg-slate-800 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} <a href="https://wahyupratama.web.id" className="hover:text-indigo-400 transition-colors">FemRent</a>. All rights reserved.
          </p>
          
          <Link 
            href="/" 
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white transition-all group border border-slate-700"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Main Website</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;