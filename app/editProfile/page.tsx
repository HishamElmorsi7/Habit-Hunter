'use client'

import { useEffect, useRef, useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Save, X, Upload, User } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

export default function EditProfilePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const gradientRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [profile, setProfile] = useState({
    username: "QuantumExplorer",
    name: "Alex Chen",
    bio: "Passionate about self-improvement and technology. On a journey to master new skills and habits.",
    avatar: "/placeholder-avatar.jpg"
  })

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated profile to your backend
    console.log("Profile updated:", profile)
  }

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
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-light">Edit Profile</h1>
                  <Link href="/profile">
                    <Button 
                      variant="outline"
                      size="icon"
                      className="bg-black/20 text-gray-400 border-gray-800 hover:text-[#00CC00] hover:border-[#00CC00]/20 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center">
                      <div className="relative group">
                        <Avatar className="w-32 h-32">
                          <AvatarImage src={profile.avatar} alt={profile.name} />
                          <AvatarFallback>{profile.name[0]}</AvatarFallback>
                        </Avatar>
                        <button 
                          type="button"
                          onClick={handleAvatarClick}
                          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                        >
                          <Upload className="h-6 w-6 text-[#00CC00]" />
                        </button>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <p className="text-sm text-gray-400 mt-2">Click to upload new avatar</p>
                    </div>

                    <div className="flex-1 space-y-6">
                      <div>
                        <Label htmlFor="name" className="text-gray-300 mb-2 block">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profile.name}
                          onChange={handleInputChange}
                          className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-[#00CC00]/20 focus:ring-[#00CC00]/20 rounded-lg"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="username" className="text-gray-300 mb-2 block">Username</Label>
                        <Input
                          id="username"
                          name="username"
                          value={profile.username}
                          onChange={handleInputChange}
                          className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-[#00CC00]/20 focus:ring-[#00CC00]/20 rounded-lg"
                          placeholder="Enter your username"
                        />
                      </div>

                      <div>
                        <Label htmlFor="bio" className="text-gray-300 mb-2 block">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={profile.bio}
                          onChange={handleInputChange}
                          className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-[#00CC00]/20 focus:ring-[#00CC00]/20 rounded-lg min-h-[100px]"
                          placeholder="Tell us about yourself"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Link href="/profile">
                      <Button 
                        variant="outline"
                        className="bg-black/20 text-gray-400 border-gray-800 hover:text-[#00CC00] hover:border-[#00CC00]/20 rounded-full"
                      >
                        Cancel
                      </Button>
                    </Link>
                    <Button 
                      type="submit"
                      className="bg-black/20 text-[#00CC00] border-[#00CC00]/20 hover:border-[#00CC00]/40 hover:shadow-[0_0_15px_rgba(0,204,0,0.2)] rounded-full"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            </motion.section>
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