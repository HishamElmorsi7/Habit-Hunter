'use client'

import { useEffect, useRef, useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Target, Calendar, Users, Clock, Search, PlusCircle, TrendingUp, Award, Zap } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

export default function ChallengesDashboard() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState('my-challenges')
  const gradientRef = useRef<HTMLDivElement>(null)
  
  const myChallenges = [
    {
      id: 1,
      title: "Morning Meditation",
      description: "Start your day with 10 minutes of mindfulness",
      participants: 8,
      daysLeft: 14,
      progress: 65,
      category: "Wellness"
    },
    {
      id: 2,
      title: "10K Steps Daily",
      description: "Walk 10,000 steps every day for 30 days",
      participants: 12,
      daysLeft: 23,
      progress: 45,
      category: "Fitness"
    },
    {
      id: 3,
      title: "Coding Streak",
      description: "Code for at least 1 hour every day",
      participants: 5,
      daysLeft: 9,
      progress: 80,
      category: "Skills"
    }
  ]

  const exploreChallenges = [
    {
      id: 4,
      title: "Plant-Based Week",
      description: "Try going plant-based for one week",
      participants: 124,
      duration: 7,
      category: "Nutrition",
      trending: true
    },
    {
      id: 5,
      title: "Digital Detox Weekend",
      description: "Spend the weekend offline and reclaim your attention",
      participants: 85,
      duration: 2,
      category: "Wellness"
    },
    {
      id: 6,
      title: "30-Day Yoga Journey",
      description: "Daily yoga practice for flexibility and strength",
      participants: 328,
      duration: 30,
      category: "Fitness",
      trending: true
    },
    {
      id: 7,
      title: "Gratitude Journaling",
      description: "Write three things you're grateful for each day",
      participants: 217,
      duration: 21,
      category: "Mindfulness"
    },
    {
      id: 8,
      title: "Read 5 Books in a Month",
      description: "Expand your mind with a reading challenge",
      participants: 95,
      duration: 30,
      category: "Education"
    }
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
          transition={{ duration: 0.1 }} // Reduced from 0.2
          className="min-h-screen text-white overflow-hidden"
          style={{
            background: "black",
            backgroundAttachment: "fixed"
          }}
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
              transition: 'background 0.2s ease-out', // Slightly faster transition
            }}
          />
          
          <div className="absolute inset-0 pointer-events-none opacity-70"
            style={{
              background: `radial-gradient(circle 1px at 10% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 0.2%),
                          radial-gradient(circle 1px at 30% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 0.2%),
                          radial-gradient(circle 1px at 50% 80%, rgba(255, 255, 255, 0.3) 0%, transparent 0.2%),
                          radial-gradient(circle 1px at 70% 10%, rgba(255, 255, 255, 0.2) 0%, transparent 0.2%),
                          radial-gradient(circle 1px at 90% 40%, rgba(255, 255, 255, 0.3) 0%, transparent 0.2%),
                          radial-gradient(circle 1px at 20% 90%, rgba(255, 255, 255, 0.2) 0%, transparent 0.2%),
                          radial-gradient(circle 1px at 40% 5%, rgba(255, 255, 255, 0.3) 0%, transparent 0.2%),
                          radial-gradient(circle 1px at 75% 75%, rgba(255, 255, 255, 0.2) 0%, transparent 0.2%),
                          radial-gradient(circle 1px at 95% 95%, rgba(255, 255, 255, 0.3) 0%, transparent 0.2%)`,
              backgroundSize: "cover"
            }}
          />

          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: 0.1 }} // Reduced from 0.2, delay 0.2
            className="p-4 md:p-6 relative z-10"
          >
            <nav className="flex justify-between items-centermax-w-6xl mx-auto">
              <Link href="/" className="text-xl font-light hover:text-[#00CC00] transition-all duration-200 ease-out">
                VARTI STUDIO
              </Link>
              <div className="space-x-4">
                <Link href="/dashboard" className="relative px-4 py-2 text-sm text-[#00CC00] transition-all duration-200 ease-out rounded-full bg-black/20 backdrop-blur-sm border border-[#00CC00]/20">Dashboard</Link>
                <Link href="/profile" className="relative px-4 py-2 text-sm text-gray-400 hover:text-[#00CC00] transition-all duration-200 ease-out rounded-full bg-black/20 backdrop-blur-sm border border-gray-800 hover:border-[#00CC00]/20">Profile</Link>
              </div>
            </nav>
          </motion.header>

          <main className="max-w-6xl mx-auto px-4 py-8 md:py-16 relative z-10">
            <section className="mb-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }} // Reduced from 1, delay 0.4
                >
                  <h1 className="text-3xl md:text-5xl font-light leading-tight mb-2 relative">
                    Your <span className="relative inline-block"><i>Challenges⚡</i></span>
                  </h1>
                  <p className="text-lg font-light text-gray-400">Track progress, explore new challenges, and achieve your goals</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1, delay: 0.3 }} // Reduced from 0.2, delay 0.6
                  className="mt-4 md:mt-0"
                >
                  <Button 
                    asChild
                    className="relative bg-black/20 backdrop-blur-sm text-[#00CC00] rounded-full px-6 py-5 text-base font-light border border-[#00CC00]/20 shadow-[0_0_15px_rgba(0,204,0,0.1)] hover:shadow-[0_0_25px_rgba(0,204,0,0.2)] hover:border-[#00CC00]/40 transition-all duration-300 ease-out group overflow-hidden"
                  >
                    <Link href="/create-challenge">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      <span className="relative z-10">Create New Challenge</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00CC00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                    </Link>
                  </Button>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: 0.4 }} // Reduced from 0.2, delay 0.8
                className="flex border-b border-gray-800"
              >
                <button 
                  onClick={() => setActiveTab('my-challenges')}
                  className={`px-6 py-3 text-base font-light relative ${activeTab === 'my-challenges' ? 'text-[#00CC00]' : 'text-gray-400 hover:text-[#00CC00]'} transition-colors duration-200`}
                >
                  Active Challenges
                  {activeTab === 'my-challenges' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00CC00]" />}
                </button>
                <button 
                  onClick={() => setActiveTab('explore')}
                  className={`px-6 py-3 text-base font-light relative ${activeTab === 'explore' ? 'text-[#00CC00]' : 'text-gray-400 hover:text-[#00CC00]'} transition-colors duration-200`}
                >
                  Explore Challenges
                  {activeTab === 'explore' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00CC00]" />}
                </button>
              </motion.div>
            </section>

            <AnimatePresence mode="wait">
              {activeTab === 'my-challenges' && (
                <motion.section
                  key="my-challenges"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.05 }} // Super fast tab switch (was 0)
                  className="space-y-6"
                >
                  {myChallenges.length === 0 ? (
                    <div className="text-center py-16 px-6 bg-black/30 backdrop-blur-md rounded-xl border border-gray-800">
                      <div className="mx-auto w-16 h-16 rounded-full bg-black/50 flex items-center justify-center mb-4">
                        <Target className="h-8 w-8 text-[#00CC00]" />
                      </div>
                      <h3 className="text-xl font-light text-white mb-2">No active challenges</h3>
                      <p className="text-gray-400 mb-6">Join a challenge or create your own to get started</p>
                      <Button 
                        asChild
                        className="relative bg-black/20 backdrop-blur-sm text-[#00CC00] rounded-full px-6 py-5 text-base font-light border border-[#00CC00]/20 shadow-[0_0_15px_rgba(0,204,0,0.1)] hover:shadow-[0_0_25px_rgba(0,204,0,0.2)] hover:border-[#00CC00]/40 transition-all duration-300 ease-out"
                      >
                        <Link href="/create-challenge">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Create Challenge
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    myChallenges.map((challenge) => (
                      <motion.div
                        key={challenge.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1 }} // Reduced from 0.2
                        className="bg-black/30 backdrop-blur-md rounded-xl border border-gray-800 p-6 shadow-[0_0_25px_rgba(0,0,0,0.2)] hover:border-[#00CC00]/20 transition-all duration-200 ease-out group"
                      >
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <h3 className="text-xl font-light text-white mb-1 group-hover:text-[#00CC00] transition-colors duration-200">{challenge.title}</h3>
                            <p className="text-gray-400 mb-4">{challenge.description}</p>
                            <div className="flex flex-wrap gap-3 text-sm">
                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/50 text-gray-400 border border-gray-800">
                                <Users className="h-3.5 w-3.5 mr-1.5" />
                                {challenge.participants} participants
                              </span>
                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/50 text-gray-400 border border-gray-800">
                                <Clock className="h-3.5 w-3.5 mr-1.5" />
                                {challenge.daysLeft} days left
                              </span>
                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/50 text-[#00CC00] border border-[#00CC00]/20">
                                <Target className="h-3.5 w-3.5 mr-1.5" />
                                {challenge.category}
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-center justify-center">
                            <div className="relative w-20 h-20">
                              <div className="absolute inset-0 flex items-center justify-center text-xl font-light">{challenge.progress}%</div>
                            </div>
                            <div className="mt-2 text-sm text-gray-400">Progress</div>
                          </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                          <Link 
                            href={`/challenge/${challenge.id}`} 
                            className="text-[#00CC00] font-light hover:text-[#00CC00]/80 transition-colors duration-200"
                          >
                            View Challenge →
                          </Link>
                        </div>
                      </motion.div>
                    ))
                  )}
                </motion.section>
              )}

              {activeTab === 'explore' && (
                <motion.section
                  key="explore"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.05 }} // Super fast tab switch (was 0)
                >
                  <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div className="flex items-center space-x-2 w-full md:w-auto">
                      <Input 
                        placeholder="Search challenges..." 
                        className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-[#00CC00]/20 focus:ring-[#00CC00]/20 rounded-lg max-w-md"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="border-gray-800 text-[#00CC00] hover:text-[#00CC00]/80 hover:border-[#00CC00]/20"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex space-x-2 mt-4 md:mt-0">
                      <Button variant="outline" size="sm" className="border-gray-800 text-gray-400 hover:text-[#00CC00] hover:border-[#00CC00]/20 rounded-full">All</Button>
                      <Button variant="outline" size="sm" className="border-gray-800 text-gray-400 hover:text-[#00CC00] hover:border-[#00CC00]/20 rounded-full">Fitness</Button>
                      <Button variant="outline" size="sm" className="border-gray-800 text-gray-400 hover:text-[#00CC00] hover:border-[#00CC00]/20 rounded-full">Wellness</Button>
                      <Button variant="outline" size="sm" className="border-gray-800 text-gray-400 hover:text-[#00CC00] hover:border-[#00CC00]/20 rounded-full">Skills</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {exploreChallenges.map((challenge) => (
    <motion.div
      key={challenge.id}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
      className="bg-black/30 backdrop-blur-md rounded-xl border border-gray-800 p-6 shadow-[0_0_25px_rgba(0,0,0,0.2)] hover:border-[#00CC00]/20 transition-all duration-200 ease-out group flex flex-col h-full"
    >
      {/* Trending Section */}
      <div className="flex items-center text-xs mb-3 min-h-[1.25rem]">
        {challenge.trending ? (
          <>
            <TrendingUp className="h-3.5 w-3.5 mr-1 text-orange-400" />
            <span className="text-orange-400">Trending</span>
          </>
        ) : (
          <div className="h-3.5 w-0" /> // Invisible placeholder with zero width
        )}
      </div>

      {/* Title and Description with fixed height/truncation */}
      <h3 className="text-xl font-light text-white mb-1 group-hover:text-[#00CC00] transition-colors duration-200 line-clamp-1">
        {challenge.title}
      </h3>
      <p className="text-gray-400 mb-4 text-sm line-clamp-2 flex-grow">
        {challenge.description}
      </p>

      {/* Tags with controlled layout */}
      <div className="flex flex-wrap gap-2 text-sm mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/50 text-gray-400 border border-gray-800 whitespace-nowrap">
          <Users className="h-3.5 w-3.5 mr-1.5" />
          {challenge.participants} participants
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/50 text-gray-400 border border-gray-800 whitespace-nowrap">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          {challenge.duration} days
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/50 text-orange-400 whitespace-nowrap">
          <Target className="h-3.5 w-3.5 mr-1.5" />
          {challenge.category}
        </span>
      </div>

      {/* Footer with consistent alignment */}
      <div className="mt-auto flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          className="border-[#00CC00]/20 text-[#00CC00] shadow-[0_0_15px_rgba(0,204,0,0.2)] bg-black/50 hover:text-[#00CC00]/80 hover:border-gray-800 hover:shadow-[0_0_5px_rgba(0,204,0,0.1)] hover:bg-black/30 rounded-full group-hover:border-[#00CC00]/20 transition-all duration-200"
        >
          <Zap className="h-3.5 w-3.5 mr-1.5" />
          Join Now
        </Button>
        <Link
          href={`/challenge/${challenge.id}`}
          className="text-gray-400 text-sm font-light hover:text-[#00CC00] transition-colors duration-200"
        >
          Details →
        </Link>
      </div>
    </motion.div>
  ))}
</div>
                </motion.section>
              )}
            </AnimatePresence>
            
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: 0.5 }} // Reduced from 0.2, delay 1.2
              className="mt-16"
            >
              <div className="bg-black/30 backdrop-blur-md rounded-xl border border-gray-800 p-6 shadow-[0_0_25px_rgba(0,0,0,0.2)]">
                <div className="flex items-center mb-6">
                  <Award className="h-5 w-5 mr-2 text-[#00CC00]" />
                  <h2 className="text-xl font-light text-white">Achievements Unlocked</h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-black/50 rounded-lg p-4 border border-gray-800 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-[#00CC00]/10 flex items-center justify-center mb-2">
                      <Zap className="h-6 w-6 text-[#00CC00]" />
                    </div>
                    <h3 className="text-sm font-light text-white">First Challenge</h3>
                    <p className="text-xs text-gray-500">Completed your first challenge</p>
                  </div>
                  
                  <div className="bg-black/50 rounded-lg p-4 border border-gray-800 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-[#00CC00]/10 flex items-center justify-center mb-2">
                      <Calendar className="h-6 w-6 text-[#00CC00]" />
                    </div>
                    <h3 className="text-sm font-light text-white">Week Streak</h3>
                    <p className="text-xs text-gray-500">Maintained 7-day streak</p>
                  </div>
                  
                  <div className="bg-black/50 rounded-lg p-4 border border-gray-800 flex flex-col items-center text-center opacity-50">
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-2">
                      <Users className="h-6 w-6 text-gray-600" />
                    </div>
                    <h3 className="text-sm font-light text-gray-400">Community Builder</h3>
                    <p className="text-xs text-gray-500">Create a challenge with 5+ members</p>
                  </div>
                  
                  <div className="bg-black/50 rounded-lg p-4 border border-gray-800 flex flex-col items-center text-center opacity-50">
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-2">
                      <Target className="h-6 w-6 text-gray-600" />
                    </div>
                    <h3 className="text-sm font-light text-gray-400">Habit Master</h3>
                    <p className="text-xs text-gray-500">Complete 5 different challenges</p>
                  </div>
                </div>
              </div>
            </motion.section>
          </main>

          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.6 }} // Reduced from 0.2, delay 1
            className="mt-24 border-t border-gray-800 py-8 relative z-10"
          >
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2025 Varti Studio. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-[#00CC00] transition-colors duration-200 ease-out">Privacy Policy</Link>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-[#00CC00] transition-colors duration-200 ease-out">Terms of Service</Link>
                <Link href="/help" className="text-sm text-gray-500 hover:text-[#00CC00] transition-colors duration-200 ease-out">Help Center</Link>
              </div>
            </div>
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}