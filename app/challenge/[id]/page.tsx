'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Users, Clock, Calendar, Target, Zap, Trophy, CheckCircle, BarChart2 } from 'lucide-react'
import { motion } from "framer-motion"
import Heatmap from 'react-heatmap-grid'

export default function Challenge() {
  const { id } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const gradientRef = useRef<HTMLDivElement>(null)
  const [logInput, setLogInput] = useState('')

  const allChallenges = [
    {
      id: 1,
      title: "Morning Meditation",
      description: "Start your day with 10 minutes of mindfulness",
      participantsCount: 8,
      daysLeft: 14,
      duration: 30,
      category: "Wellness",
      isActive: true,
      participants: [
        { id: 101, name: "Alex", progress: 70, logs: ["Day 1: 10 min", "Day 2: 15 min"], activityData: [5, 10, 15, 20, 10, 5, 0] },
        { id: 102, name: "You", progress: 65, logs: ["Day 1: 10 min"], activityData: [10, 5, 15, 10, 5, 0, 0] },
        { id: 103, name: "Sam", progress: 50, logs: ["Day 1: 10 min"], activityData: [0, 5, 10, 15, 5, 5, 0] }
      ]
    },
    {
      id: 2,
      title: "10K Steps Daily",
      description: "Walk 10,000 steps every day for 30 days",
      participantsCount: 12,
      daysLeft: 23,
      duration: 30,
      category: "Fitness",
      isActive: true,
      participants: [
        { id: 201, name: "You", progress: 45, logs: ["Day 1: 10k steps"], activityData: [10000, 8000, 12000, 9000, 6000, 0, 0] },
        { id: 202, name: "Jamie", progress: 60, logs: ["Day 1: 12k steps"], activityData: [12000, 10000, 11000, 13000, 9000, 7000, 0] }
      ]
    },
    {
      id: 4,
      title: "Plant-Based Week",
      description: "Try going plant-based for one week",
      participantsCount: 124,
      duration: 7,
      category: "Nutrition",
      trending: true,
      isActive: false,
      participants: []
    }
  ]

  const challenge = allChallenges.find(ch => ch.id === parseInt(id as string)) || null
  const yourProgress = challenge?.participants.find(p => p.name === "You")?.progress || 0
  const yourLogs = challenge?.participants.find(p => p.name === "You")?.logs || []
  const yourActivityData = challenge?.participants.find(p => p.name === "You")?.activityData || []

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

  if (!challenge) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <p className="text-xl font-light">Challenge not found</p>
      </div>
    )
  }

  const handleJoinChallenge = () => {
    console.log(`Joined challenge: ${challenge.title}`)
  }

  const handleLogProgress = (e: React.FormEvent) => {
    e.preventDefault()
    if (logInput.trim()) {
      console.log(`Logged: ${logInput}`)
      setLogInput('')
    }
  }

  // Heatmap data preparation
  const xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const yLabels = challenge.participants.map(p => p.name)
  const heatmapData = challenge.participants.map(p => p.activityData || [0, 0, 0, 0, 0, 0, 0])

  // Group diagram data preparation (average activity across all participants)
  const allActivityData = challenge.participants.map(p => p.activityData || [0, 0, 0, 0, 0, 0, 0])
  const avgActivityData = xLabels.map((_, index) => {
    const total = allActivityData.reduce((sum, data) => sum + data[index], 0)
    return challenge.participants.length > 0 ? total / challenge.participants.length : 0
  })
  const maxGroupActivityValue = Math.max(...avgActivityData, 1)
  const maxYourActivityValue = Math.max(...yourActivityData, 1)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
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
          transition: 'background 0.4s ease-out',
        }}
      />

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
        className="p-4 md:p-6 relative z-10"
      >
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <Link href="/" className="text-xl font-light hover:text-[#00CC00] transition-all duration-300 ease-out">
            VARTI STUDIO
          </Link>
          <Link href="/challenges" className="text-sm text-gray-400 hover:text-[#00CC00] transition-colors duration-300">
            <ArrowLeft className="inline-block h-4 w-4 mr-2" />
            Back to Challenges
          </Link>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-light leading-tight mb-2">
            {challenge.title} <span className="relative inline-block"><i>⚡</i></span>
          </h1>
          <p className="text-lg font-light text-gray-400">{challenge.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Challenge Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.6 }}
            className="lg:col-span-2 bg-black/30 backdrop-blur-md rounded-xl border border-gray-800 p-6 shadow-[0_0_25px_rgba(0,0,0,0.2)]"
          >
            <div className="flex flex-wrap gap-3 text-sm mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/50 text-gray-400 border border-gray-800">
                <Users className="h-3.5 w-3.5 mr-1.5" />
                {challenge.participantsCount} participants
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/50 text-gray-400 border border-gray-800">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                {challenge.duration} days
              </span>
              {challenge.isActive && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/50 text-gray-400 border border-gray-800">
                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                  {challenge.daysLeft} days left
                </span>
              )}
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/50 text-[#00CC00] border border-[#00CC00]/20">
                <Target className="h-3.5 w-3.5 mr-1.5" />
                {challenge.category}
              </span>
            </div>

            {challenge.trending && (
              <div className="flex items-center text-sm text-orange-400 mb-4">
                <Trophy className="h-4 w-4 mr-2" />
                <span>Trending Challenge</span>
              </div>
            )}

            {/* Participants Tracking */}
            <h2 className="text-xl font-light text-white mb-4">Participants</h2>
            {challenge.participants.length > 0 ? (
              <div className="space-y-4">
                {challenge.participants.map(participant => (
                  <div key={participant.id} className="flex items-center justify-between bg-black/50 p-4 rounded-lg border border-gray-800">
                    <div>
                      <p className="text-white font-light">{participant.name}</p>
                      <p className="text-sm text-gray-400">Progress: {participant.progress}%</p>
                    </div>
                    <Progress value={participant.progress} className="w-1/3 h-2 bg-gray-800" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No participants yet. Be the first to join!</p>
            )}

            {/* Heatmaps Section */}
            {challenge.participants.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-light text-white mb-4">Activity Heatmap</h2>
                <Heatmap
                  xLabels={xLabels}
                  yLabels={yLabels}
                  data={heatmapData}
                  squares
                  height={40}
                  cellStyle={(background, value, min, max, data, x, y) => ({
                    background: `rgba(0, 204, 0, ${1 - (max - value) / (max - min)})`,
                    borderRadius: '4px',
                  })}
                  cellRender={(value) => value && `${value}`}
                />
                <p className="text-sm text-gray-400 mt-2">Weekly activity intensity (higher values = darker green)</p>
              </div>
            )}

            {/* Group Activity Trend Diagram */}
            {challenge.participants.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-light text-white mb-4 flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2" />
                  Group Activity Trend
                </h2>
                <svg className="w-full h-32" viewBox={`0 0 200 ${maxGroupActivityValue + 20}`}>
                  <polyline
                    fill="none"
                    stroke="#00CC00"
                    strokeWidth="2"
                    points={avgActivityData.map((value, index) => `${index * (200 / (avgActivityData.length - 1))},${maxGroupActivityValue - value}`).join(' ')}
                  />
                  {avgActivityData.map((value, index) => (
                    <circle
                      key={index}
                      cx={index * (200 / (avgActivityData.length - 1))}
                      cy={maxGroupActivityValue - value}
                      r="3"
                      fill="#00CC00"
                    />
                  ))}
                </svg>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  {xLabels.map((label, index) => (
                    <span key={index}>{label}</span>
                  ))}
                </div>
                <p className="text-sm text-gray-400 mt-2">Average activity per day across all participants</p>
              </div>
            )}
          </motion.div>

          {/* Right Column: Your Progress & Logging */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.8 }}
            className="bg-black/30 backdrop-blur-md rounded-xl border border-gray-800 p-6 shadow-[0_0_25px_rgba(0,0,0,0.2)]"
          >
            {challenge.isActive ? (
              <>
                <h2 className="text-xl font-light text-white mb-4">Your Progress</h2>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32" viewBox="0 0 100 100">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="#1a1a1a" 
                      strokeWidth="10" 
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="#00CC00" 
                      strokeWidth="10" 
                      strokeDasharray="283" 
                      strokeDashoffset={283 - (283 * yourProgress / 100)} 
                      strokeLinecap="round" 
                      transform="rotate(-90 50 50)" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-2xl font-light">{yourProgress}%</div>
                </div>
                <Progress value={yourProgress} className="w-full h-2 bg-gray-800 mb-4" />

                {/* Your Activity Trend Diagram */}
                {yourActivityData.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-light text-white mb-2 flex items-center">
                      <BarChart2 className="h-4 w-4 mr-2" />
                      Your Activity Trend
                    </h3>
                    <svg className="w-full h-32" viewBox={`0 0 200 ${maxYourActivityValue + 20}`}>
                      <polyline
                        fill="none"
                        stroke="#00CC00"
                        strokeWidth="2"
                        points={yourActivityData.map((value, index) => `${index * (200 / (yourActivityData.length - 1))},${maxYourActivityValue - value}`).join(' ')}
                      />
                      {yourActivityData.map((value, index) => (
                        <circle
                          key={index}
                          cx={index * (200 / (yourActivityData.length - 1))}
                          cy={maxYourActivityValue - value}
                          r="3"
                          fill="#00CC00"
                        />
                      ))}
                    </svg>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      {xLabels.map((label, index) => (
                        <span key={index}>{label}</span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Your weekly activity trend</p>
                  </div>
                )}

                {/* Log Progress */}
                <form onSubmit={handleLogProgress} className="space-y-4 mt-6">
                  <Input
                    value={logInput}
                    onChange={(e) => setLogInput(e.target.value)}
                    placeholder="Log your progress (e.g., 10 min)"
                    className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-[#00CC00]/20 focus:ring-[#00CC00]/20 rounded-lg"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-black/20 backdrop-blur-sm text-[#00CC00] rounded-full px-6 py-5 text-base font-light border border-[#00CC00]/20 shadow-[0_0_15px_rgba(0,204,0,0.1)] hover:shadow-[0_0_25px_rgba(0,204,0,0.2)] hover:border-[#00CC00]/40 transition-all duration-500 ease-out"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Log Progress
                  </Button>
                </form>

                {/* Your Logs */}
                <h3 className="text-lg font-light text-white mt-6 mb-2">Your Logs</h3>
                {yourLogs.length > 0 ? (
                  <ul className="space-y-2">
                    {yourLogs.map((log, index) => (
                      <li key={index} className="text-sm text-gray-400">{log}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No logs yet. Start tracking!</p>
                )}
              </>
            ) : (
              <div className="text-center">
                <Button
                  onClick={handleJoinChallenge}
                  className="relative bg-black/20 backdrop-blur-sm text-[#00CC00] rounded-full px-6 py-5 text-base font-light border border-[#00CC00]/20 shadow-[0_0_15px_rgba(0,204,0,0.1)] hover:shadow-[0_0_25px_rgba(0,204,0,0.2)] hover:border-[#00CC00]/40 transition-all duration-500 ease-out group overflow-hidden"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  <span className="relative z-10">Join Challenge</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00CC00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 1 }}
        className="mt-24 border-t border-gray-800 py-8 relative z-10"
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2025 Varti Studio. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-[#00CC00] transition-colors duration-300 ease-out">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-[#00CC00] transition-colors duration-300 ease-out">Terms of Service</Link>
            <Link href="/help" className="text-sm text-gray-500 hover:text-[#00CC00] transition-colors duration-300 ease-out">Help Center</Link>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  )
}