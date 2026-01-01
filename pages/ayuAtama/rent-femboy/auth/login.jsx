import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Mail, Lock, Loader2, ArrowLeft } from "lucide-react";

const SignInSection = () => {
  const router = useRouter();
  const baseAPIUrl = process.env.NEXT_PUBLIC_API_URL;
  const baseUrl = process.env.NEXT_PUBLIC_FEM_RENT_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${baseAPIUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      window.dispatchEvent(new Event("auth-changed"));

      router.push(`${baseUrl}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen flex bg-gray-50 font-sans text-slate-800">
      <div className="grid w-full md:grid-cols-2">
        <div className="flex flex-col justify-center items-center p-8 bg-white relative">
          <Link 
            href="/ayuAtama/rent-femboy" 
            className="absolute top-8 left-8 text-gray-500 hover:text-blue-600 flex items-center gap-2 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={18} /> Back to Home
          </Link>

          <div className="w-full max-w-md space-y-8 mt-10 md:mt-0">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome Back!
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Please enter your details to sign in.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded shadow-sm">
                  {error}
                </div>
              )}

              <div className="space-y-5">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-gray-50 focus:bg-white sm:text-sm"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Lock size={20} />
                  </div>
                  <input
                    type="password"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-gray-50 focus:bg-white sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link href="register" className="font-bold text-blue-600 hover:text-blue-500 transition-colors hover:underline">
                Register now
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden md:flex relative items-center justify-center bg-slate-900 overflow-hidden">
          <img 
             src="/ayuAtama/pengering.png" 
             alt="Background" 
             className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[2px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50" />
          
          <div className="relative z-10 max-w-lg px-10 text-center">
            <h3 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
              "You're One of Us!"
            </h3>
            <p className="text-gray-200 text-lg leading-relaxed drop-shadow-md">
              Missed the butterflies? Sign in and pick up where the flirting left off. 
              Charming companions are waiting.
            </p>
            
            <div className="mt-10 flex flex-col items-center">
               <div className="w-16 h-1 bg-blue-500 rounded-full mb-4"></div>
               <p className="font-bold text-white">Wahyu Pratama</p>
               <p className="text-sm text-blue-300">Astolfo Enjoyer Developer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInSection;