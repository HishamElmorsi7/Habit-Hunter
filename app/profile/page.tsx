'use client'

import { useEffect, useRef, useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Award, Target, Calendar, Users, Settings, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

export default function ProfilePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const gradientRef = useRef<HTMLDivElement>(null)
  
  const userProfile = {
    username: "QuantumExplorer",
    name: "Alex Chen",
    bio: "Passionate about self-improvement and technology. On a journey to master new skills and habits.",
    avatar: "/placeholder-avatar.jpg",
    joined: "January 2023",
    stats: {
      challengesCompleted: 12,
      activeChallenges: 3,
      achievements: 8
    }
  }

  const completedChallenges = [
    { id: 1, title: "30-Day Meditation", category: "Wellness", completedDate: "Dec 2024" },
    { id: 2, title: "5K Running Goal", category: "Fitness", completedDate: "Nov 2024" },
    { id: 3, title: "Learn Python Basics", category: "Skills", completedDate: "Oct 2024" }
  ]

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
          transition={{ duration: 0.2 }}
          className="min-h-screen text-white overflow-hidden"
          style={{ background: "black" }}
        >
          <div 
            ref={gradientRef}
            className="absolute inset-0 pointer-events-none opacity-80"
            style={{
              background: `
                radial-gradient(circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                rgba(20, 20, 20, 0.3) 0%, 
                rgba(10, 10, 10, 0.2) 25%, 
                rgba(5, 5, 5, 0.1) 50%, 
                transparent 75%),
                linear-gradient(to bottom, rgba(30, 30, 30, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%)
              `,
              transition: 'background 0.4s ease-out'
            }}
          />

          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="p-4 md:p-6 relative z-10"
          >
            <nav className="flex justify-between items-center max-w-6xl mx-auto">
              <Link href="/" className="text-xl font-light hover:text-[#00CC00] transition-all duration-300">
                VARTI STUDIO
              </Link>
              <div className="space-x-4">
                <Link href="/dashboard" className="px-4 py-2 text-sm text-gray-400 hover:text-[#00CC00] transition-all duration-300 rounded-full bg-black/20 backdrop-blur-sm border border-gray-800 hover:border-[#00CC00]/20">
                  Dashboard
                </Link>
                <Link href="/profile" className="px-4 py-2 text-sm text-[#00CC00] transition-all duration-300 rounded-full bg-black/20 backdrop-blur-sm border border-[#00CC00]/20">
                  Profile
                </Link>
              </div>
            </nav>
          </motion.header>

          <main className="max-w-6xl mx-auto px-4 py-8 md:py-16 relative z-10">
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.4 }}
              className="mb-12"
            >
              <div className="bg-black/30 backdrop-blur-md rounded-xl border border-gray-800 p-8 shadow-[0_0_25px_rgba(0,0,0,0.2)]">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <Avatar className="w-24 h-24 md:w-32 md:h-32">
                    <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                    <AvatarFallback>{userProfile.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-light mb-2">{userProfile.name}</h1>
                    <p className="text-gray-400 mb-2">@{userProfile.username}</p>
                    <p className="text-gray-300 max-w-2xl">{userProfile.bio}</p>
                    <p className="text-sm text-gray-500 mt-2">Joined {userProfile.joined}</p>
                  </div>
                  <div className="flex gap-4">
                    <Link href="/editProfile">
                        <Button 
                            variant="outline"
                            className="bg-black/20 text-[#00CC00] border-[#00CC00]/20 hover:border-[#00CC00]/40 hover:shadow-[0_0_15px_rgba(0,204,0,0.2)] rounded-full"
                        >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                        </Button>
                    </Link>
                    <Button 
                      variant="outline"
                      className="bg-black/20 text-gray-400 border-gray-800 hover:text-[#00CC00] hover:border-[#00CC00]/20 rounded-full"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-black/50 rounded-lg p-4 text-center border border-gray-800">
                    <Target className="h-6 w-6 text-[#00CC00] mx-auto mb-2" />
                    <h3 className="text-xl font-light">{userProfile.stats.challengesCompleted}</h3>
                    <p className="text-sm text-gray-400">Challenges Completed</p>
                  </div>
                  <div className="bg-black/50 rounded-lg p-4 text-center border border-gray-800">
                    <Calendar className="h-6 w-6 text-[#00CC00] mx-auto mb-2" />
                    <h3 className="text-xl font-light">{userProfile.stats.activeChallenges}</h3>
                    <p className="text-sm text-gray-400">Active Challenges</p>
                  </div>
                  <div className="bg-black/50 rounded-lg p-4 text-center border border-gray-800">
                    <Award className="h-6 w-6 text-[#00CC00] mx-auto mb-2" />
                    <h3 className="text-xl font-light">{userProfile.stats.achievements}</h3>
                    <p className="text-sm text-gray-400">Achievements</p>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.6 }}
              className="mb-12"
            >
              <div className="bg-black/30 backdrop-blur-md rounded-xl border border-gray-800 p-6 shadow-[0_0_25px_rgba(0,0,0,0.2)]">
                <h2 className="text-xl font-light mb-6 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-[#00CC00]" />
                  Completed Challenges
                </h2>
                <div className="space-y-4">
                  {completedChallenges.map(challenge => (
                    <div 
                      key={challenge.id}
                      className="flex justify-between items-center p-4 bg-black/50 rounded-lg border border-gray-800 hover:border-[#00CC00]/20 transition-all duration-300"
                    >
                      <div>
                        <h3 className="text-lg font-light">{challenge.title}</h3>
                        <p className="text-sm text-gray-400">{challenge.category}</p>
                      </div>
                      <p className="text-sm text-gray-500">{challenge.completedDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.8 }}
              className="flex justify-end"
            >
              <Button 
                variant="outline"
                className="bg-black/20 text-gray-400 border-gray-800 hover:text-red-400 hover:border-red-400/20 rounded-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </motion.div>
          </main>

          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 1 }}
            className="mt-24 border-t border-gray-800 py-8 relative z-10"
          >
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2025 Varti Studio. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-[#00CC00] transition-colors duration-300">Privacy Policy</Link>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-[#00CC00] transition-colors duration-300">Terms of Service</Link>
                <Link href="/help" className="text-sm text-gray-500 hover:text-[#00CC00] transition-colors duration-300">Help Center</Link>
              </div>
            </div>
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}