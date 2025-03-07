'use client'

import { useEffect, useRef, useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Target, Users, Clock, ArrowRight, Plus } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

export default function CreateChallenge() {
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
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }} // Reduced from 0.8
          className="min-h-screen bg-black text-white overflow-hidden"
        >
          <div 
            ref={gradientRef}
            className="absolute inset-0 pointer-events-none transition-opacity duration-500" // Reduced from 1000ms
            style={{
              background: 'radial-gradient(circle 400px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,255,0,0.1), transparent)',
              transition: 'background 0.3s ease-out', // Reduced from 0.6s
            }}
          />

          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }} // Reduced from 0.8, delay from 0.2
            className="p-4 md:p-6 relative z-10"
          >
            <nav className="flex justify-between items-center max-w-6xl mx-auto">
              <Link href="/" className="text-xl font-light hover:text-green-400 transition-all duration-200 ease-out"> {/* Reduced from 300ms */}
                VARTI STUDIO
              </Link>
              <div className="space-x-4">
                <Link href="/dashboard" className="relative px-4 py-2 text-sm text-gray-400 hover:text-green-400 transition-all duration-200 ease-out rounded-full bg-black/20 backdrop-blur-sm border border-gray-800 hover:border-green-900"> {/* Reduced from 300ms */}
                  Dashboard
                </Link>
                <Link href="/profile" className="relative px-4 py-2 text-sm text-gray-400 hover:text-green-400 transition-all duration-200 ease-out rounded-full bg-black/20 backdrop-blur-sm border border-gray-800 hover:border-green-900"> {/* Reduced from 300ms */}
                  Profile
                </Link>
              </div>
            </nav>
          </motion.header>

          <main className="max-w-6xl mx-auto px-4 py-8 md:py-16 relative z-10">
            <section className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.2, ease: "easeOut" }} // Reduced from 1, delay from 0.4
              >
                <h1 className="text-4xl md:text-6xl font-light leading-tight">
                  Create New <br />
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 }} // Reduced from 0.8, delay from 0.8
                    className="text-green-400 inline-block"
                  >
                    Challenge
                  </motion.span>
                </h1>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }} // Reduced from 0.8, delay from 0.6
                className="text-xl md:text-2xl font-light leading-relaxed text-gray-400 max-w-2xl mt-4"
              >
                Design your habit challenge, invite friends, and track progress together.
              </motion.p>
            </section>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.3 }} // Reduced from 0.8, delay from 0.8
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2">
                <motion.form 
                  className="bg-black/30 backdrop-blur-md rounded-xl border border-gray-800 p-6 shadow-[0_0_25px_rgba(0,0,0,0.2)]"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.4 }} // Reduced from 0.8, delay from 1
                >
                  <div className="space-y-6">
                    <div>
                      <label className="block text-green-400 mb-2 font-light">Challenge Name</label>
                      <Input 
                        placeholder="e.g., 30-Day Meditation Challenge" 
                        className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-green-900 focus:ring-green-900 rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-green-400 mb-2 font-light">Description</label>
                      <Textarea 
                        placeholder="Describe your challenge and what participants should do..." 
                        className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-green-900 focus:ring-green-900 rounded-lg h-32"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-green-400 mb-2 font-light flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Start Date
                        </label>
                        <Input 
                          type="date" 
                          className="bg-black/50 border-gray-800 text-white focus:border-green-900 focus:ring-green-900 rounded-lg"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-green-400 mb-2 font-light flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Duration (days)
                        </label>
                        <Input 
                          type="number" 
                          placeholder="30" 
                          min="1" 
                          max="365" 
                          className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-green-900 focus:ring-green-900 rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-green-400 mb-2 font-light flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        Challenge Goals
                      </label>
                      
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Input 
                            placeholder="e.g., Meditate for 10 minutes daily" 
                            className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-green-900 focus:ring-green-900 rounded-lg"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Input 
                            placeholder="Add another goal" 
                            className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-green-900 focus:ring-green-900 rounded-lg"
                          />
                          <Button type="button" variant="outline" size="icon" className="border-gray-800 text-green-400 hover:text-green-300 hover:border-green-900">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex gap-4">
                    <Button 
                      type="submit" 
                      className="relative bg-black/20 backdrop-blur-sm text-green-400 rounded-full px-8 py-6 text-lg font-light border border-green-950 shadow-[0_0_15px_rgba(0,255,0,0.1)] hover:shadow-[0_0_25px_rgba(0,255,0,0.2)] hover:border-green-900 transition-all duration-300 ease-out group overflow-hidden" // Reduced from 500ms
                    >
                      <span className="relative z-10">Create Challenge</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" /> {/* Reduced from 500ms */}
                    </Button>
                    
                    <Button 
                      type="button"
                      variant="outline" 
                      className="relative bg-black/20 backdrop-blur-sm text-gray-400 rounded-full px-8 py-6 text-lg font-light border border-gray-800 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:border-gray-700 hover:text-gray-300 transition-all duration-300 ease-out" // Reduced from 500ms
                    >
                      Cancel
                    </Button>
                  </div>
                </motion.form>
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.4 }} // Reduced from 0.8, delay from 1.2
                className="bg-black/30 backdrop-blur-md rounded-xl border border-gray-800 p-6 shadow-[0_0_25px_rgba(0,0,0,0.2)] h-fit"
              >
                <h3 className="text-xl font-light text-green-400 mb-6 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Invite Friends
                </h3>
                
                <div className="space-y-4">
                  <Input 
                    placeholder="Enter email address" 
                    className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-green-900 focus:ring-green-900 rounded-lg"
                  />
                  <div className="flex items-center gap-2">
                    <Input 
                      placeholder="Add another friend" 
                      className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-green-900 focus:ring-green-900 rounded-lg"
                    />
                    <Button type="button" variant="outline" size="icon" className="border-gray-800 text-green-400 hover:text-green-300 hover:border-green-900">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-light text-green-400 mb-4">Challenge Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="public" 
                        className="rounded bg-black/50 border-gray-800 text-green-600 focus:ring-green-900"
                      />
                      <label htmlFor="public" className="ml-2 text-gray-400">Make challenge public</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="reminders" 
                        className="rounded bg-black/50 border-gray-800 text-green-600 focus:ring-green-900"
                      />
                      <label htmlFor="reminders" className="ml-2 text-gray-400">Daily reminders</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="celebration" 
                        className="rounded bg-black/50 border-gray-800 text-green-600 focus:ring-green-900"
                      />
                      <label htmlFor="celebration" className="ml-2 text-gray-400">Celebration at completion</label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 border-t border-gray-800 pt-6">
                  <p className="text-gray-500 text-sm">
                    Need inspiration? <Link href="/templates" className="text-green-400 hover:underline transition-colors duration-200 ease-out">Browse challenge templates</Link> or <Link href="/community" className="text-green-400 hover:underline transition-colors duration-200 ease-out">see what others are doing</Link>.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </main>

          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.5 }} // Reduced from 0.8, delay from 1
            className="mt-24 border-t border-gray-800 py-8 relative z-10"
          >
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2025 Varti Studio. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-green-400 transition-colors duration-200 ease-out">Privacy Policy</Link>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-green-400 transition-colors duration-200 ease-out">Terms of Service</Link>
                <Link href="/help" className="text-sm text-gray-500 hover:text-green-400 transition-colors duration-200 ease-out">Help Center</Link>
              </div>
            </div>
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}