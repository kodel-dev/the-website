import NavbarLayout from "./NavbarLayout";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <nav>
        <NavbarLayout />
      </nav>

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