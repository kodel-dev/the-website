import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { User, Mail, Lock, FileImage, ShieldCheck, Loader2, ArrowLeft, AtSign, DollarSign } from "lucide-react";

const RegisterSection = () => {
  const router = useRouter();
  const baseAPIUrl = process.env.NEXT_PUBLIC_API_URL;
  const homeUrl = process.env.NEXT_PUBLIC_FEM_RENT_URL;
  const BACKGROUNDS = {
    RENTER: "/ayuAtama/pengering1.png",
    FEMBOY: "/ayuAtama/pengering2.png",
  };
  
  const [activeBg, setActiveBg] = useState(BACKGROUNDS.RENTER);
  const [role, setRole] = useState("RENTER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [baseRate, setBaseRate] = useState("");
  const [image, setImage] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeDisclaimer, setAgreeDisclaimer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setActiveBg(BACKGROUNDS[role]);
  }, [role]);

  async function uploadImage() {
    if (!image) return null;
    const formData = new FormData();
    formData.append("image", image);
    const res = await fetch(`${baseAPIUrl}/upload`, { method: "POST", body: formData });
    if (!res.ok) throw new Error("Image upload failed");
    const data = await res.json();
    return data.url;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!agreeTerms || !agreePrivacy || !agreeDisclaimer) {
      setError("You must agree to all legal terms to continue.");
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImage();
      const payload = {
        email, password, role, imageUrl,
        legal: { terms: agreeTerms, privacy: agreePrivacy, disclaimer: agreeDisclaimer },
      };

      if (role === "RENTER") payload.nickname = nickname;
      if (role === "FEMBOY") {
        payload.displayName = displayName;
        payload.bio = bio;
        payload.baseRate = Number(baseRate);
      }

      const res = await fetch(`${baseAPIUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      router.push(`${homeUrl}/auth/login`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const InputGroup = ({ icon: Icon, ...props }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Icon size={18} />
      </div>
      <input
        {...props}
        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-gray-50 focus:bg-white text-sm"
      />
    </div>
  );

  return (
    <section className="min-h-screen flex bg-gray-50 font-sans">
      <div className="grid w-full md:grid-cols-2">
        
        <div className="flex flex-col justify-center items-center p-6 md:p-12 bg-white relative overflow-y-auto max-h-screen">
           <Link href="/ayuAtama/rent-femboy" className="absolute top-6 left-6 text-gray-400 hover:text-blue-600 flex items-center gap-2 transition-colors z-10">
            <ArrowLeft size={20} /> Home
          </Link>

          <div className="w-full max-w-md py-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
              <p className="text-gray-500 text-sm mt-1">Join us and find your perfect companion.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2">
                  <ShieldCheck size={16} /> {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 p-1 bg-gray-100 rounded-xl">
                {["RENTER", "FEMBOY"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 text-sm font-semibold rounded-lg transition-all ${
                      role === r 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {r === "RENTER" ? "I want to Rent" : "I am a Femboy"}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <InputGroup icon={Mail} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <InputGroup icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                
                {role === "RENTER" && (
                   <InputGroup icon={User} placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
                )}

                {role === "FEMBOY" && (
                  <>
                    <InputGroup icon={AtSign} placeholder="Display Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
                    
                    <div className="relative">
                      <textarea
                        className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white text-sm min-h-[80px]"
                        placeholder="Tell us about yourself (Bio)..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        required
                      />
                    </div>

                    <InputGroup icon={DollarSign} type="number" placeholder="Rate per hour (IDR/USD)" value={baseRate} onChange={(e) => setBaseRate(e.target.value)} required />
                  </>
                )}

                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileImage className="w-6 h-6 text-gray-400 mb-1" />
                      <p className="text-xs text-gray-500">
                        {image ? image.name : "Upload Profile Picture"}
                      </p>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files[0])} required />
                  </label>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100">
                {[
                  { state: agreeTerms, setter: setAgreeTerms, text: "I agree to Terms & Conditions" },
                  { state: agreePrivacy, setter: setAgreePrivacy, text: "I agree to Privacy Policy" },
                  { state: agreeDisclaimer, setter: setAgreeDisclaimer, text: "I accept the Disclaimer" },
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.state ? "bg-blue-600 border-blue-600" : "border-gray-300 bg-white group-hover:border-blue-400"}`}>
                      {item.state && <ShieldCheck size={12} className="text-white" />}
                    </div>
                    <input type="checkbox" checked={item.state} onChange={(e) => item.setter(e.target.checked)} className="hidden" />
                    <span className="text-xs text-gray-600 select-none group-hover:text-gray-900">{item.text}</span>
                  </label>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg shadow-lg transform active:scale-[0.98] transition-all flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <Link href="login" className="font-semibold text-blue-600 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden md:block relative bg-gray-900 overflow-hidden">
           <div 
             className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out transform hover:scale-105"
             style={{ backgroundImage: `url(${activeBg})` }}
           />
           <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

           <div className="relative z-10 h-full flex flex-col justify-center px-12 text-white">
              <h1 className="text-5xl font-extrabold mb-6 leading-tight">
                {role === "RENTER" ? "Find Your Companion" : "Share Your Charm"}
              </h1>
              <p className="text-lg text-gray-200 max-w-md leading-relaxed">
                {role === "RENTER" 
                  ? "Browse through hundreds of profiles, chat, and book your time with charming personalities." 
                  : "Join our community of verified femboys, set your rates, and meet respectful clients securely."}
              </p>
              
              <div className="mt-12 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-sm">
                 <p className="italic text-gray-300 text-sm">"The safest platform for rent-femboy services in Indonesia."</p>
                 <div className="mt-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">W</div>
                    <div>
                      <p className="text-sm font-bold">Wahyu Pratama</p>
                      <p className="text-xs text-blue-300">Lead Developer</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default RegisterSection;