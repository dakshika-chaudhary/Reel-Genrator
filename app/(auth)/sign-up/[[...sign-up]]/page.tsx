
"use client";

import Image from "next/image";
import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div
      className="
        min-h-screen 
        bg-gradient-to-br from-black via-[#0b0018] to-[#020205]
        text-white
      "
    >
      {/* ---------------- HEADER ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          px-6 py-4 
          flex items-center justify-between 
          bg-black/20 backdrop-blur-xl 
          border-b border-white/10
          shadow-lg shadow-black/30
        "
      >
        {/* Logo */}
        <div className="flex gap-3 items-center">
          <Image
            src="/appImages/logo.png"
            alt="logo"
            width={35}
            height={35}
            className="rounded-lg"
          />

          <h1
            className="
              text-3xl font-extrabold 
              bg-gradient-to-r from-purple-400 to-blue-400
              bg-clip-text text-transparent tracking-wide
            "
          >
            ReelBloom
          </h1>
        </div>

        {/* Home Button */}
        <Link
          href="/"
          className="
            px-6 py-2 rounded-xl
            bg-gradient-to-r from-purple-600 to-blue-600 
            text-white font-semibold
            hover:opacity-90 hover:scale-[1.03] 
            transition-all shadow-md
          "
        >
          Home
        </Link>
      </motion.div>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[90vh]">
        
        {/* Left Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex justify-center items-center p-10"
        >
          <div className="relative">
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-purple-700/20 blur-3xl rounded-3xl"></div>

            <Image
              src="/appImages/login.jpg"
              alt="signup"
              width={500}
              height={500}
              className="
                object-cover rounded-3xl border border-white/10
                shadow-2xl shadow-purple-900/40
              "
            />
          </div>
        </motion.div>

        {/* Right SignUp Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center p-10"
        >
          <div
            className="
              w-full max-w-md 
              bg-white/10 backdrop-blur-xl 
              border border-white/20 
              rounded-2xl shadow-2xl shadow-black/40 
              p-10
            "
          >
            <h2
              className="
                text-3xl font-bold text-center mb-6
                bg-gradient-to-r from-purple-400 to-blue-400 
                bg-clip-text text-transparent
              "
            >
              Create Your Account
            </h2>

            <SignUp
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:opacity-90",
                  card: "bg-transparent shadow-none border-none",
                  headerTitle: "text-white text-xl font-bold",
                  headerSubtitle: "text-gray-300",
                  socialButtonsBlockButton:
                    "bg-white/10 border border-white/20 text-white hover:bg-white/20",
                  formFieldInput:
                    "bg-black/20 border-white/20 text-white placeholder-gray-400",
                },
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
