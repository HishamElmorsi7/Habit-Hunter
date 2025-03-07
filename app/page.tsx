"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, Dumbbell } from "lucide-react"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background with integrated image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
          style={{
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-b0m9O1QEBHRhGRcIwzfxdJ324BLxfi.png')`,
            filter: "brightness(1.2) contrast(1.1)",
          }}
          role="img"
          aria-label="Decorative green cat background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.1),transparent_70%)]" />
      </div>

      {/* Navigation */}
      <header className="relative z-10 px-8 py-6">
        <nav className="flex justify-between items-center space-x-4">
          <button className="text-[#00FF00] hover:text-[#00FF00]/80 transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" className="text-[#00FF00] text-sm tracking-widest hover:text-[#00FF00]/80 transition-colors">
            VARTI
          </Link>
          <Link
            href="/challenges"
            className="text-xs text-[#00FF00] border border-[#00FF00]/20 px-4 py-2 rounded-full 
                     hover:bg-[#00FF00]/10 transition-all duration-300 flex items-center"
          >
            <Dumbbell className="w-4 h-4 mr-2" />
            CHALLENGES
          </Link>
          <Link
            href="/signup"
            className="text-xs text-[#00FF00] border border-[#00FF00]/20 px-4 py-2 rounded-full 
                     hover:bg-[#00FF00]/10 transition-all duration-300 flex items-center"
          >
            JOIN NOW
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-8 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="text-xs tracking-wider text-gray-400">
                CHALLENGE <span className="text-[#00FF00]">YOURSELF™</span>
              </div>
              <h1 className="text-7xl font-bold tracking-tighter text-white" style={{ fontFamily: "Arial Black" }}>
                <span className="inline-block transform -skew-x-12">HAB</span>
                <span className="inline-block transform skew-x-12">IT</span>
                <span className="block mt-2">
                  <span className="inline-block transform -skew-x-12">HUNT</span>
                  <span className="inline-block transform skew-x-12">ER</span>
                </span>
              </h1>
              <div className="space-y-1">
                <p className="text-[#00FF00] text-sm">" CHASE YOUR POTENTIAL "</p>
                <p className="text-gray-400 text-xs tracking-wider">21 DAYS TO TRANSFORM YOUR LIFE</p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link
                  href="/challenge"
                  className="inline-block bg-transparent border border-[#00FF00]/20 text-[#00FF00] 
                           px-8 py-4 text-sm tracking-wider rounded-sm hover:bg-[#00FF00]/10 
                           transition-all duration-300"
                >
                  START CHALLENGE
                </Link>
                <Link
                  href="/learn"
                  className="inline-block bg-[#00FF00]/10 text-[#00FF00] 
                           px-8 py-4 text-sm tracking-wider rounded-sm hover:bg-[#00FF00]/20 
                           transition-all duration-300"
                >
                  LEARN MORE
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-1 text-xs text-gray-500">
            <span>0</span>
            <span className="text-[#00FF00]">1</span>
          </div>
          <div className="text-[10px] text-gray-500">
            2025 © VARTI STUDIO - TRANSFORM YOUR HABITS, TRANSFORM YOUR LIFE
          </div>
        </div>
      </footer>
    </div>
  )
}

