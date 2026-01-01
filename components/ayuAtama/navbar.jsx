import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Menu, X, User, LogOut, Settings, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const baseurl = process.env.NEXT_PUBLIC_FEM_RENT_URL;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const navLinks = [
    { name: "Home", path: `${baseurl}` },
    { name: "Discover", path: `${baseurl}/discover` },
    { name: "Contact", path: `${baseurl}/contact` },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUser = () => {
      fetch(`${apiUrl}/me`, { credentials: "include" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => setUser(data))
        .catch(() => setUser(null))
        .finally(() => setLoadingUser(false));
    };

    fetchUser();
    window.addEventListener("auth-changed", fetchUser);
    return () => window.removeEventListener("auth-changed", fetchUser);
  }, [apiUrl]);

  async function handleLogout() {
    await fetch(`${apiUrl}/auth/logout`, { method: "POST" });
    setUser(null);
    window.location.href = `${baseurl}/auth/login`;
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-sans ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className={`p-2 rounded-full transition-colors ${
              isScrolled 
                ? "hover:bg-gray-100 text-gray-600" 
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
            title="Kembali ke Main Menu"
          >
            <ArrowLeft size={20} />
          </Link>

          <Link
            href={baseurl || "/"}
            className={`text-xl font-bold tracking-tight ${
              isScrolled ? "text-indigo-600" : "text-white"
            }`}
          >
            FemRent<span className={`${isScrolled ? "text-gray-800" : "text-indigo-200"}`}>.</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path} 
              className={`text-sm font-medium transition-colors hover:text-indigo-400 ${
                isScrolled ? "text-gray-600" : "text-gray-200"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4 relative">
          {loadingUser ? (
            <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setUserOpen(!userOpen)}
                className={`flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border transition-all ${
                  isScrolled 
                    ? "border-gray-200 bg-white hover:border-indigo-300" 
                    : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <img
                  src={user.profile?.image || `https://ui-avatars.com/api/?name=${user.email}&background=random`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium max-w-[100px] truncate">
                  {user.profile?.displayName || user.profile?.nickname || "User"}
                </span>
              </button>

              {userOpen && (
                <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-50">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                       {user.profile?.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>

                  <div className="py-1">
                    <Link href={`${baseurl}/settings`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                      <Settings size={16} className="mr-2" /> Settings
                    </Link>
                  </div>

                  <div className="border-t border-gray-50 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} className="mr-2" /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href={`${baseurl}/auth/login`}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                isScrolled 
                  ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                  : "bg-white text-indigo-600 hover:bg-gray-100"
              }`}
            >
              Sign In
            </Link>
          )}
        </div>

        <button
          onClick={() => setIsMenuOpen(true)}
          className={`md:hidden p-2 rounded-md ${
            isScrolled ? "text-gray-800" : "text-white"
          }`}
        >
          <Menu size={24} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col md:hidden animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between p-4 border-b">
             <span className="font-bold text-xl text-indigo-600">Menu</span>
             <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
               <X size={24} />
             </button>
          </div>
          
          <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
             <Link 
               href="/"
               className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-indigo-200 transition-colors"
             >
                <div className="bg-white p-2 rounded-full shadow-sm text-indigo-600">
                   <ArrowLeft size={20} />
                </div>
                <div>
                   <p className="font-semibold text-gray-900">Main Website</p>
                   <p className="text-xs text-gray-500">Kembali ke halaman utama</p>
                </div>
             </Link>

             <div className="space-y-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Navigation</p>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-medium text-gray-800 hover:text-indigo-600"
                  >
                    {link.name}
                  </Link>
                ))}
             </div>

             <div className="mt-auto border-t pt-6">
                {user ? (
                   <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                         <img 
                           src={user.profile?.image || `https://ui-avatars.com/api/?name=${user.email}`} 
                           className="w-10 h-10 rounded-full" 
                         />
                         <div>
                            <p className="font-medium">{user.profile?.displayName || "User"}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                         </div>
                      </div>
                      <Link href={`${baseurl}/settings`} className="block w-full py-3 text-center rounded-lg border border-gray-200 font-medium">
                         Settings
                      </Link>
                      <button onClick={handleLogout} className="block w-full py-3 text-center rounded-lg bg-red-50 text-red-600 font-medium">
                         Sign Out
                      </button>
                   </div>
                ) : (
                   <Link
                    href={`${baseurl}/auth/login`}
                    className="block w-full py-3 rounded-lg bg-indigo-600 text-white font-bold text-center shadow-lg"
                   >
                     Login / Register
                   </Link>
                )}
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;