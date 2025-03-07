'use client'

import { useEffect, useRef, useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const gradientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gradientRef.current) {
        const rect = gradientRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        gradientRef.current.style.setProperty('--mouse-x', `${x}px`)
        gradientRef.current.style.setProperty('--mouse-y', `${y}px`)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    setIsLoaded(true)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="min-h-screen bg-black text-white overflow-hidden"
        >
          <div 
            ref={gradientRef}
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
            style={{
              background: 'radial-gradient(circle 400px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,255,0,0.1), transparent)',
              transition: 'background 0.6s ease-out',
            }}
          />

          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="p-4 md:p-6 relative z-10"
          >
            <nav className="flex justify-between items-center max-w-6xl mx-auto">
              <Link href="/" className="text-xl font-light hover:text-green-400 transition-all duration-300 ease-out">
                VARTI STUDIO
              </Link>
              <div className="space-x-4">
                <Link href="/login" className="relative px-4 py-2 text-sm text-gray-400 hover:text-green-400 transition-all duration-300 ease-out rounded-full bg-black/20 backdrop-blur-sm border border-gray-800 hover:border-green-900">Login</Link>
                <Link href="/signup" className="relative px-4 py-2 text-sm text-gray-400 hover:text-green-400 transition-all duration-300 ease-out rounded-full bg-black/20 backdrop-blur-sm border border-gray-800 hover:border-green-900">Sign Up</Link>
              </div>
            </nav>
          </motion.header>

          <main className="max-w-6xl mx-auto px-4 py-12 md:py-24 relative z-10">
            <section className="mb-24 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              >
                <h1 className="text-4xl md:text-6xl font-light leading-tight">
                  Create habit <br />
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.8 }}
                    className="text-green-400 inline-block"
                  >
                    Challenges
                  </motion.span> <br />
                  with Friends
                </h1>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.6 }}
                className="text-xl md:text-2xl font-light leading-relaxed text-gray-400 max-w-2xl"
              >
                Transform your life through shared goals and mutual support. Join Varti Studio and start your journey to better habits today.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  asChild
                  className="relative bg-black/20 backdrop-blur-sm text-green-400 rounded-full px-8 py-6 text-lg font-light border border-green-950 shadow-[0_0_15px_rgba(0,255,0,0.1)] hover:shadow-[0_0_25px_rgba(0,255,0,0.2)] hover:border-green-900 transition-all duration-500 ease-out group overflow-hidden"
                >
                  <Link href="/signup">
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="relative bg-black/20 backdrop-blur-sm text-gray-400 rounded-full px-8 py-6 text-lg font-light border border-gray-800 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:border-gray-700 hover:text-gray-300 transition-all duration-500 ease-out group overflow-hidden"
                >
                  <span className="relative z-10">Learn More</span>
                  <ArrowRight className="relative z-10 ml-2 h-5 w-5 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                </Button>
              </motion.div>
            </section>
          </main>

          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 1 }}
            className="mt-24 border-t border-gray-800 py-8 relative z-10"
          >
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">&copy; 2025 Varti Studio. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-green-400 transition-colors duration-300 ease-out">Privacy Policy</Link>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-green-400 transition-colors duration-300 ease-out">Terms of Service</Link>
              </div>
            </div>
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

