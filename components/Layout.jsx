import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-gray-100 font-sans selection:bg-pink-500/30">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <h1>
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                The Website ⚡
              </span>
            </Link>
          </h1>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/community" className="text-gray-400 hover:text-white transition-colors">
              Community
            </Link>
            <Link href="/guestbook" className="text-gray-400 hover:text-white transition-colors">
              Guestbook
            </Link>
            <a 
              href="https://github.com/vincoodev/the-website" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow w-full relative z-10">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
         </div>
      </main>
      
      <footer className="border-t border-white/10 bg-black/20 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
           <p>&copy; {new Date().getFullYear()} The Website Project. Open Source.</p>
        </div>
      </footer>

    </div>
  );
}