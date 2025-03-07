'use client'

import { useState, useEffect, useRef } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { PlusCircle, ArrowLeft, Target } from 'lucide-react'
import { motion } from "framer-motion"

export default function CreateChallenge() {
  const [isLoaded, setIsLoaded] = useState(false)
  const gradientRef = useRef<HTMLDivElement>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    privacy: 'public'
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
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the formData to your backend API
    console.log('Challenge Created:', formData)
    // Optionally redirect or show success message
  }

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
      <main className="max-w-2xl mx-auto px-4 py-8 md:py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-light leading-tight mb-2">
            Create a New <span className="relative inline-block"><i>Challenge⚡</i></span>
          </h1>
          <p className="text-lg font-light text-gray-400">Inspire yourself and others with a new goal</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-black/30 backdrop-blur-md rounded-xl border border-gray-800 p-6 shadow-[0_0_25px_rgba(0,0,0,0.2)]"
        >
          <div className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-white font-light mb-2 block">Challenge Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., 30-Day Fitness Challenge"
                className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-[#00CC00]/20 focus:ring-[#00CC00]/20 rounded-lg"
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-white font-light mb-2 block">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your challenge..."
                className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-[#00CC00]/20 focus:ring-[#00CC00]/20 rounded-lg min-h-[100px]"
                required
              />
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category" className="text-white font-light mb-2 block">Category</Label>
              <Select onValueChange={handleSelectChange('category')} required>
                <SelectTrigger className="bg-black/50 border-gray-800 text-white focus:border-[#00CC00]/20 focus:ring-[#00CC00]/20 rounded-lg">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-black/80 border-gray-800 text-white">
                  <SelectItem value="Fitness">Fitness</SelectItem>
                  <SelectItem value="Wellness">Wellness</SelectItem>
                  <SelectItem value="Nutrition">Nutrition</SelectItem>
                  <SelectItem value="Mindfulness">Mindfulness</SelectItem>
                  <SelectItem value="Skills">Skills</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Duration */}
            <div>
              <Label htmlFor="duration" className="text-white font-light mb-2 block">Duration (days)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 30"
                className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-[#00CC00]/20 focus:ring-[#00CC00]/20 rounded-lg"
                min="1"
                required
              />
            </div>

            {/* Privacy */}
            <div>
              <Label htmlFor="privacy" className="text-white font-light mb-2 block">Privacy</Label>
              <Select onValueChange={handleSelectChange('privacy')} defaultValue="public">
                <SelectTrigger className="bg-black/50 border-gray-800 text-white focus:border-[#00CC00]/20 focus:ring-[#00CC00]/20 rounded-lg">
                  <SelectValue placeholder="Select privacy setting" />
                </SelectTrigger>
                <SelectContent className="bg-black/80 border-gray-800 text-white">
                  <SelectItem value="public">Public (Anyone can join)</SelectItem>
                  <SelectItem value="private">Private (Invite only)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="relative bg-black/20 backdrop-blur-sm text-[#00CC00] rounded-full px-6 py-5 text-base font-light border border-[#00CC00]/20 shadow-[0_0_15px_rgba(0,204,0,0.1)] hover:shadow-[0_0_25px_rgba(0,204,0,0.2)] hover:border-[#00CC00]/40 transition-all duration-500 ease-out group overflow-hidden"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                <span className="relative z-10">Create Challenge</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00CC00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
              </Button>
            </div>
          </div>
        </motion.form>
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