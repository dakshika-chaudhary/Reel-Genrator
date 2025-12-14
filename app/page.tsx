// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      
//     </div>
//   );
// }


"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";


export default function HomePage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

const handleCreateClick = () => {
  if (!isSignedIn) {
    setShowLoginPopup(true);
    return;
  }

  router.push("/dashboard/create-new");
};

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ================= HEADER ================= */}
      <header className="flex justify-between items-center px-10 py-6">
        <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          ReelBloom
        </h1>

        <nav className="hidden md:flex gap-10 text-gray-300">
          <Link href="#features">Features</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="#showcase">Showcase</Link>
          <Link href="/dashboard/create-new">Dashboard</Link>
        </nav>

    <div className="flex items-center gap-4">
  {isSignedIn ? (
    <UserButton 
      afterSignOutUrl="/"
      appearance={{
        elements: {
          avatarBox: "w-10 h-10"
        }
      }}
    />
  ) : (
    <button
      onClick={handleCreateClick}
      className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-80 transition-all"
    >
      Get Started
    </button>
  )}
</div>

      </header>

     {/* ================= HERO SECTION ================= */}
<section className="relative px-10 mt-20 pb-20 text-center overflow-hidden">
  <motion.h2
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-6xl font-bold leading-tight relative z-10"
  >
    Create AI Videos  
    <br />
    <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
      In Just One Click
    </span>
  </motion.h2>

  <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg relative z-10">
    Transform your ideas into stunning cinematic videos using AI.  
    Generate scripts, voiceovers, images, and full HD videos automatically.
  </p>

  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="mt-10 relative z-10"
  >
    <button
      onClick={handleCreateClick}
      className="inline-flex items-center gap-2 px-8 py-4 text-xl rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition-all"
    >
      Start Creating <ArrowRight />
    </button>
  </motion.div>

  {/* AI Glow Background */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.3 }}
    className="pointer-events-none absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px]"
  />
</section>


      {/* ================= FEATURES ================= */}

      <section id="features" className="mt-32 px-10">
  <h3 className="text-4xl font-bold text-center mb-16">
    Why ReelBloom?
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

    {/* Feature 1 */}
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
      <h4 className="text-xl font-semibold mb-3">
        ⚡ One-Click Creation
      </h4>
      <p className="text-gray-400">
        Generate scripts, visuals, voiceovers, and videos instantly using AI.
      </p>
    </div>

    {/* Feature 2 */}
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
      <h4 className="text-xl font-semibold mb-3">
        🎬 Cinematic Quality
      </h4>
      <p className="text-gray-400">
        Professional-grade videos optimized for reels, shorts, and ads.
      </p>
    </div>

    {/* Feature 3 */}
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
      <h4 className="text-xl font-semibold mb-3">
        🚀 Super Fast
      </h4>
      <p className="text-gray-400">
        Save hours of editing — AI handles everything in minutes.
      </p>
    </div>

  </div>

  {/* LOGIN POPUP (keep it OUTSIDE grid if you want) */}
  {showLoginPopup && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xl flex items-center justify-center"
  >
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-2xl text-center shadow-2xl w-[90%] max-w-md"
    >
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Login Required
      </h2>

      <p className="text-gray-300 mt-3">
        Please sign in to create your AI video.
      </p>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setShowLoginPopup(false)}
          className="px-5 py-2 rounded-lg border border-white/20 text-gray-300 hover:bg-white/10"
        >
          Cancel
        </button>

        <Link
          href="/sign-in"
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90"
        >
          Sign In
        </Link>
      </div>
    </motion.div>
  </motion.div>
)}

</section>





      {/* ================= SHOWCASE ================= */}
      <section id="showcase" className="mt-32 px-10 text-center mb-32">
        <h3 className="text-4xl font-bold">Video Showcase</h3>
        <p className="text-gray-400 mt-3 mb-10">See what users are creating</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <video src="/demo1.mp4" controls className="rounded-xl shadow-xl" />
          <video src="/demo2.mp4" controls className="rounded-xl shadow-xl" />
          <video src="/demo3.mp4" controls className="rounded-xl shadow-xl" />
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-10 text-gray-400 border-t border-white/10">
        © {new Date().getFullYear()} ReelBloom — Powered by AI  
      </footer>
    </div>
  );
}
