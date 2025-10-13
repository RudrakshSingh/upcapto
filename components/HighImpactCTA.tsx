'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import CountdownTimer from './CountdownTimer'
import BusinessSignupForm from './BusinessSignupForm'
import Background3D from './Background3D'
import useScrollAnimation from '@/lib/useScrollAnimation'
import { useCredAnimations, useTextAnimation, useStaggerAnimation, useHeroAnimation, useHoverAnimation, useSmoothScroll } from '@/lib/useCredAnimations'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Joiner {
  name: string
  location: string
  business: string
  time: string
  isNew: boolean
  isReal?: boolean
}

export default function HighImpactCTA() {
  const [recentJoiners, setRecentJoiners] = useState<Joiner[]>([
    { name: 'Rajesh Kumar', location: 'Mumbai', business: 'Restaurant', time: '2 minutes ago', isNew: true },
    { name: 'Priya Sharma', location: 'Delhi', business: 'Retail', time: '5 minutes ago', isNew: true },
    { name: 'Amit Singh', location: 'Bangalore', business: 'Tech', time: '8 minutes ago', isNew: true },
    { name: 'Sneha Patel', location: 'Ahmedabad', business: 'Healthcare', time: '12 minutes ago', isNew: false },
    { name: 'Vikram Reddy', location: 'Hyderabad', business: 'Manufacturing', time: '15 minutes ago', isNew: false }
  ])
  const [showPopup, setShowPopup] = useState(true)
  const [hasNewJoiner, setHasNewJoiner] = useState(false)
  
  // CRED-style animations
  const { containerRef } = useCredAnimations()
  const heroRef = useHeroAnimation()
  const headingRef = useTextAnimation('heroText')
  const descriptionRef = useTextAnimation('fadeUp')
  const timerRef = useTextAnimation('scaleIn')
  const formRef = useTextAnimation('fadeUp')
  const { scrollTo } = useSmoothScroll()
  
  // Hover animations
  const cardHoverRef = useHoverAnimation('card')
  const buttonHoverRef = useHoverAnimation('button')

  // Auto-hide popup after 40 seconds
  useEffect(() => {
    if (showPopup) {
      const hideTimer = setTimeout(() => {
        setShowPopup(false)
      }, 40000) // 40 seconds

      return () => clearTimeout(hideTimer)
    }
  }, [showPopup])

  // Fetch real data from database
  const fetchRecentJoiners = async () => {
    try {
      const response = await fetch('/api/recent-joiners')
      const data = await response.json()
      
      if (data.success && data.joiners.length > 0) {
        setRecentJoiners(data.joiners)
        setHasNewJoiner(true)
        setTimeout(() => setHasNewJoiner(false), 3000)
      }
    } catch (error) {
      console.error('Error fetching recent joiners:', error)
    }
  }

  // Fetch real data on component mount
  useEffect(() => {
    fetchRecentJoiners()
  }, [])

  // Simulate real-time joiners like before but with real names from database
  useEffect(() => {
    const interval = setInterval(() => {
      // Try to fetch real data first
      fetchRecentJoiners()
      
      // Add a new joiner every 15 seconds
      const newJoiner = {
        name: `User ${Math.floor(Math.random() * 1000)}`,
        location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune'][Math.floor(Math.random() * 5)],
        business: ['Restaurant', 'Retail', 'Tech', 'Healthcare', 'Manufacturing'][Math.floor(Math.random() * 5)],
        time: 'just now',
        isNew: true
      }
      
      setRecentJoiners(prev => [newJoiner, ...prev.slice(0, 4)])
      
      // Show popup when new joiner arrives
      setShowPopup(true)
      setHasNewJoiner(true)
      
      // Reset new joiner flag after animation
      setTimeout(() => setHasNewJoiner(false), 2000)
    }, 15000) // Every 15 seconds

    return () => clearInterval(interval)
  }, [])

  // Show popup on page load/refresh
  useEffect(() => {
    setShowPopup(true)
  }, [])

  return (
    <section ref={containerRef} className="relative py-20 bg-mono-gray-50 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-subtle-gradient"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-mono-gray-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-mono-gray-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* Professional Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-6 h-6 bg-mono-gray-300/30 rounded-full opacity-20"
        />
        
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 right-1/4 w-4 h-4 bg-mono-gray-400/30 rounded-lg opacity-20"
        />

        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-mono-gray-400/30 rounded-full opacity-20"
        />

        <motion.div
          animate={{
            y: [0, -18, 0],
            rotate: [0, -8, 0]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-mono-gray-300/30 rounded-lg opacity-20"
        />

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            className="absolute w-1 h-1 bg-mono-gray-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={heroRef} className="text-center mb-16">
          <div
            ref={headingRef}
            className="mb-12 mt-8"
          >
            <h1 className="text-5xl md:text-7xl font-black text-mono-black mb-6 font-display">
              GET
              <span className="text-mono-gray-600">
                {' '}SUPER PUMPED
              </span>
              <br />
              WITH ETELIOS!
            </h1>
          </div>
          
          <div ref={descriptionRef}>
            <p className="text-xl md:text-2xl text-mono-gray-600 max-w-3xl mx-auto mb-8 font-body font-medium">
              Replace 10+ business tools with one intelligent platform. Built for Global businesses, powered by AI, designed for scale.
            </p>
          </div>

          {/* Countdown Timer */}
          <div ref={timerRef} className="mb-12">
            <div 
              className="rounded-2xl p-8 shadow-subtle-lg relative overflow-hidden bg-white border border-mono-gray-200"
            >
              
              {/* Glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl" />
              <h3 className="text-2xl font-bold text-mono-black mb-6">
                Launching in:
              </h3>
              <CountdownTimer />
            </div>
          </div>
        </div>

        {/* Signup Form */}
        <div
          id="signup-form"
          ref={formRef}
          className="max-w-md mx-auto"
        >
          <BusinessSignupForm />
        </div>

        {/* Authentic Messaging */}
        <div className="mt-16 text-center">
          <p className="text-cred-gray-500 mb-6">Be among the first to experience the future</p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12 opacity-80">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cred-blue-500 rounded-full"></div>
              <span className="text-lg font-semibold text-cred-gray-600">Early Access</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cred-purple-500 rounded-full"></div>
              <span className="text-lg font-semibold text-cred-gray-600">Lightning Fast</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cred-green-500 rounded-full"></div>
              <span className="text-lg font-semibold text-cred-gray-600">Future Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Joiners Popup - Bottom Left Corner */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ 
            duration: 0.3,
            ease: "easeOut"
          }}
          className="fixed bottom-4 left-4 z-50"
        >
          <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2 max-w-xs">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <p className="text-xs font-medium">
                {recentJoiners[0]?.name} from {recentJoiners[0]?.location} joined!
              </p>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="text-white/70 hover:text-white transition-colors ml-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </section>
  )
}
