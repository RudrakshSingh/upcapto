'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 90, hours: 0, minutes: 0, seconds: 0 })
  const [isUrgent, setIsUrgent] = useState(false)
  const [isTicking, setIsTicking] = useState(false)

  // Ticking sound removed

  useEffect(() => {
    // Set a fixed launch date 90 days from when component mounts
    const launchDate = new Date(Date.now() + (90 * 24 * 60 * 60 * 1000)).getTime()
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = launchDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        return { days, hours, minutes, seconds }
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    // Set initial time
    const initialTime = calculateTimeLeft()
    setTimeLeft(initialTime)
    setIsUrgent(initialTime.days < 7)

    const timer = setInterval(() => {
      const newTime = calculateTimeLeft()
      
      // Play ticking sound every second
      // Ticking sound removed
      setIsTicking(true)
      setTimeout(() => setIsTicking(false), 200)
      
      setTimeLeft(newTime)
      
      // Make it urgent when less than 7 days left
      if (newTime.days < 7 && !isUrgent) {
        setIsUrgent(true)
      } else if (newTime.days >= 7 && isUrgent) {
        setIsUrgent(false)
      }

      if (newTime.days === 0 && newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isUrgent])

  // No need for clock hands rotation anymore

  return (
    <div className="relative flex flex-col items-center space-y-8">
      {/* Epic Countdown Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        className="relative"
      >
        {/* Main Countdown Container */}
        <div className="relative w-80 sm:w-96 h-56 sm:h-64 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-gray-700 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
          
          {/* Matrix-style Rain Effect */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-8 bg-green-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, 300],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
          
          {/* Time Display */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            {/* Days Counter */}
            <motion.div
              className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2"isme
              animate={{ 
                scale: isTicking ? [1, 1.05, 1] : 1,
                textShadow: isTicking ? "0 0 20px rgba(59, 130, 246, 0.5)" : "none"
              }}
              transition={{ duration: 0.3 }}
            >
              {timeLeft.days}
            </motion.div>
            
            <div className="text-lg sm:text-xl font-bold text-gray-300 mb-4">DAYS</div>
            
            {/* Business Time Counter */}
            <div className="flex space-x-2 sm:space-x-3 text-lg sm:text-xl font-mono">
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-blue-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-blue-500 text-white font-bold"
                animate={{ 
                  scale: isTicking ? [1, 1.03, 1] : 1,
                  boxShadow: isTicking ? "0 0 20px rgba(59, 130, 246, 0.4)" : "0 0 10px rgba(59, 130, 246, 0.2)"
                }}
                transition={{ duration: 0.2 }}
              >
                {timeLeft.hours.toString().padStart(2, '0')}
                <div className="text-xs text-blue-200">HRS</div>
              </motion.div>
              <span className="text-gray-400 text-xl sm:text-2xl">:</span>
              <motion.div
                className="bg-gradient-to-r from-purple-600 to-purple-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-purple-500 text-white font-bold"
                animate={{ 
                  scale: isTicking ? [1, 1.03, 1] : 1,
                  boxShadow: isTicking ? "0 0 20px rgba(147, 51, 234, 0.4)" : "0 0 10px rgba(147, 51, 234, 0.2)"
                }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {timeLeft.minutes.toString().padStart(2, '0')}
                <div className="text-xs text-purple-200">MIN</div>
              </motion.div>
              <span className="text-gray-400 text-xl sm:text-2xl">:</span>
              <motion.div
                className="bg-gradient-to-r from-red-600 to-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-red-500 text-white font-bold"
                animate={{ 
                  scale: isTicking ? [1, 1.05, 1] : 1,
                  boxShadow: isTicking ? "0 0 25px rgba(239, 68, 68, 0.6)" : "0 0 15px rgba(239, 68, 68, 0.3)"
                }}
                transition={{ duration: 0.1 }}
              >
                {timeLeft.seconds.toString().padStart(2, '0')}
                <div className="text-xs text-red-200">SEC</div>
              </motion.div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-48 sm:w-64 h-2 bg-gray-700 rounded-full mt-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
                initial={{ width: "100%" }}
                animate={{ 
                  width: `${(timeLeft.days / 90) * 100}%`,
                  boxShadow: isTicking ? "0 0 10px rgba(59, 130, 246, 0.5)" : "none"
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          
          {/* Corner Decorations */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-4 right-4 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-4 left-4 w-3 h-3 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </motion.div>
      
      {/* Business Status Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <div className="text-2xl font-bold text-gray-800 mb-2">
          🚀 Business Launch Countdown
        </div>
        <div className="text-lg text-gray-600 mb-4">
          Join 10,000+ businesses already waiting for Etelios
        </div>
        
        {/* Business Stats */}
        <div className="flex justify-center space-x-8 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Enterprise Ready</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Global Scale</span>
          </div>
        </div>
      </motion.div>
      
      {/* Urgent Message */}
      {isUrgent && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="mt-8 text-center"
        >
          <div className="relative bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 border-2 border-red-300 rounded-2xl p-6 shadow-2xl overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-orange-400/10 animate-pulse"></div>
            
            {/* Content */}
            <div className="relative">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-2xl mb-2"
              >
                ⚡
              </motion.div>
              <p className="text-gray-800 font-bold text-lg md:text-xl">
                ⚡ Limited Early Access! Secure your business advantage before public launch!
              </p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </motion.div>
      )}
    </div>
  )
}