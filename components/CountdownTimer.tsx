'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useHoverAnimation } from '@/lib/useCredAnimations'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 90, hours: 0, minutes: 0, seconds: 0 })
  const [isUrgent, setIsUrgent] = useState(false)
  
  // CRED-style hover animations
  const timerRef = useHoverAnimation('card')

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
      setTimeLeft(newTime)
      
      // Make it urgent when less than 7 days left
      setIsUrgent(newTime.days < 7)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, color: 'from-red-500 to-red-700' },
    { label: 'Hours', value: timeLeft.hours, color: 'from-orange-500 to-red-600' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'from-yellow-500 to-orange-500' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'from-green-500 to-yellow-500' }
  ]

  return (
    <div ref={timerRef} className="relative">
      {/* Pulsing background */}
      <motion.div
        animate={{
          scale: isUrgent ? [1, 1.05, 1] : [1, 1.02, 1],
          opacity: isUrgent ? [0.3, 0.6, 0.3] : [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: isUrgent ? 0.5 : 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur-xl"
      />
      
      <div className="relative flex justify-center gap-3 md:gap-6">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ 
              scale: isUrgent ? [1, 1.1, 1] : 1,
              rotate: 0,
              opacity: 1
            }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.6,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            className="text-center relative"
          >
            {/* Glowing effect */}
            <motion.div
              animate={{
                boxShadow: isUrgent 
                  ? [
                      "0 0 20px rgba(239, 68, 68, 0.5)",
                      "0 0 40px rgba(239, 68, 68, 0.8)",
                      "0 0 20px rgba(239, 68, 68, 0.5)"
                    ]
                  : [
                      "0 0 10px rgba(59, 130, 246, 0.3)",
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                      "0 0 10px rgba(59, 130, 246, 0.3)"
                    ]
              }}
              transition={{
                duration: isUrgent ? 0.8 : 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`bg-gradient-to-br ${unit.color} backdrop-blur-md bg-white/10 text-white rounded-2xl p-4 md:p-6 min-w-[70px] md:min-w-[90px] shadow-2xl border border-white/30`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={unit.value}
                  initial={{ y: 20, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -20, opacity: 0, scale: 0.8 }}
                  transition={{ 
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className="text-2xl md:text-4xl font-black tracking-tight font-display"
                >
                  {unit.value.toString().padStart(2, '0')}
                </motion.div>
              </AnimatePresence>
              
              <motion.div 
                animate={{
                  color: isUrgent ? ["#ffffff", "#ffeb3b", "#ffffff"] : "#ffffff"
                }}
                transition={{
                  duration: isUrgent ? 0.5 : 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-xs md:text-sm font-bold opacity-90 mt-1 font-subheading"
              >
                {unit.label}
              </motion.div>
            </motion.div>
            
            {/* Urgent warning */}
            {isUrgent && unit.label === 'Days' && unit.value < 7 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse"
              >
                URGENT!
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Funny urgent message */}
      {isUrgent && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-6 text-center"
        >
          <motion.p
            animate={{
              color: ["#ef4444", "#f97316", "#ef4444"]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-lg font-bold"
          >
            GET SUPER PUMPED! Your empire is waiting!
          </motion.p>
        </motion.div>
      )}
    </div>
  )
}
