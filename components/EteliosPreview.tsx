'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import useScrollAnimation from '@/lib/useScrollAnimation'
import { useSmoothScroll } from '@/lib/useCredAnimations'
import { scrollToForm } from '@/lib/scrollToForm'

export default function EteliosPreview() {
  // CRED-style scroll animations
  const { ref: welcomeRef, isVisible: welcomeVisible } = useScrollAnimation()
  const { ref: dashboardRef, isVisible: dashboardVisible } = useScrollAnimation()
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation()
  const { ref: messageRef, isVisible: messageVisible } = useScrollAnimation()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation()
  const { scrollTo } = useSmoothScroll()

  // Image rotation state and refs
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Three dashboard images - using your uploaded images
  const dashboardImages = [
    {
      src: "/dashboard-1.png",
      alt: "Etelios HR Analytics Dashboard",
      title: "HR Analytics Dashboard",
      description: "Comprehensive workforce insights and analytics"
    },
    {
      src: "/dashboard-2.png", 
      alt: "Etelios Business Intelligence",
      title: "Business Intelligence",
      description: "AI-powered business insights and predictions"
    },
    {
      src: "/dashboard-3.png",
      alt: "Etelios Operations Management", 
      title: "Operations Management",
      description: "Complete business operations management"
    }
  ]

  // CRED-style scroll-based image rotation
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 180, 360])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % dashboardImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [dashboardImages.length])

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Clean white background */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div
            ref={welcomeRef}
            className={`mb-8 scroll-trigger ${welcomeVisible ? 'animate' : ''}`}
          >
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 font-display">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Etelios
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 font-body font-medium">
              Your Business Buddy - Digital Cofounder
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto font-body">
              An AI-powered co-founder that works while you sleep. Your Business Has a Brain Now. Never miss a business opportunity again!
            </p>
          </div>
        </div>

        {/* Three Image Rotation Section */}
        <div 
          ref={containerRef}
          className="relative max-w-7xl mx-auto mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Rotating Images */}
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                {/* Image Container with CRED-style rotation */}
                <div className="relative w-full h-full">
                  {dashboardImages.map((image, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      initial={{ opacity: 0, rotateY: 90 }}
                      animate={{ 
                        opacity: currentImageIndex === index ? 1 : 0,
                        rotateY: currentImageIndex === index ? 0 : 90
                      }}
                      transition={{ 
                        duration: 0.8, 
                        ease: "easeInOut",
                        type: "spring",
                        stiffness: 100
                      }}
                    >
                      <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                        {/* Exact Same as Your Image - Simple White Card */}
                        <div className="w-full h-full bg-white flex items-center justify-center relative">
                          {/* Simple White Card Content - Exactly as in your image */}
                          <div className="w-full h-full p-8">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                  <span className="text-white font-bold text-sm">E</span>
                                </div>
                                <div>
                                  <h3 className="text-gray-900 font-bold text-lg">Etelios</h3>
                                  <p className="text-gray-600 text-sm">Digital Cofounder</p>
                                </div>
                              </div>
                              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                                Login
                              </button>
                            </div>

                            {/* Welcome Section */}
                            <div className="text-center mb-8">
                              <h1 className="text-4xl font-black text-gray-900 mb-2">
                                Welcome to{' '}
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                  Etelios
                                </span>
                              </h1>
                              <p className="text-gray-700 mb-6 text-lg">Your Business Buddy</p>
                              
                              <div className="flex gap-4 justify-center mb-6">
                                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
                                  Get Started
                                </button>
                                <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold">
                                  View All Modules
                                </button>
                              </div>

                              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                An AI-powered co-founder that works while you sleep / Your Business Has a Brain Now. Never miss a business opportunity again!
                              </p>

                              {/* Feature Icons */}
                              <div className="flex justify-center space-x-8 mb-8">
                                <div className="text-center">
                                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-2">
                                    <span className="text-2xl">🤖</span>
                                  </div>
                                  <p className="text-sm text-gray-700">AI-Powered</p>
                                </div>
                                <div className="text-center">
                                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-2">
                                    <span className="text-2xl">⚡</span>
                                  </div>
                                  <p className="text-sm text-gray-700">Smart Automation</p>
                                </div>
                                <div className="text-center">
                                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-2">
                                    <span className="text-2xl">📊</span>
                                  </div>
                                  <p className="text-sm text-gray-700">Predictive Analytics</p>
                                </div>
                              </div>
                            </div>

                            {/* Core Features Grid */}
                            <div>
                              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Features</h2>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {/* Feature Cards - Exact same as your image */}
                                {[
                                  { title: 'HRM & Payroll', desc: 'Human Resource Management and Payroll System', color: 'bg-blue-500', icon: '👥' },
                                  { title: 'CRM & Marketing', desc: 'Customer Relationship Management', color: 'bg-green-500', icon: '📈' },
                                  { title: 'Inventory & WMS', desc: 'Inventory and Warehouse Management', color: 'bg-purple-500', icon: '📦' },
                                  { title: 'Finance & Accounting', desc: 'Financial Management and Accounting', color: 'bg-yellow-500', icon: '💰' },
                                  { title: 'Sales & POS', desc: 'Sales and Point of Sale System', color: 'bg-red-500', icon: '🛒' },
                                  { title: 'AI Business Brain', desc: 'AI-powered business intelligence and insights', color: 'bg-pink-500', icon: '🧠' },
                                  { title: 'Smart Analytics', desc: 'AI-driven analytics and predictions', color: 'bg-indigo-500', icon: '🎯' },
                                  { title: 'Reports & Analytics', desc: 'Business Intelligence and Reporting', color: 'bg-teal-500', icon: '📊' },
                                  { title: 'Activity Feed', desc: 'System Activity and Notifications', color: 'bg-rose-500', icon: '📅' },
                                  { title: 'Project Management', desc: 'Project Planning and Tracking', color: 'bg-emerald-500', icon: '📋' },
                                  { title: 'Tenant Admin & Settings', desc: 'Administration and System Settings', color: 'bg-gray-500', icon: '⚙️' }
                                ].map((feature, index) => (
                                  <div
                                    key={feature.title}
                                    className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105"
                                  >
                                    <div className={`${feature.color} p-4 text-center`}>
                                      <div className="text-3xl mb-2">{feature.icon}</div>
                                    </div>
                                    <div className="p-4">
                                      <h3 className="font-bold text-white text-sm mb-2">{feature.title}</h3>
                                      <p className="text-gray-400 text-xs">{feature.desc}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Image overlay with Etelios branding */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-xs">E</span>
                            </div>
                            <span className="font-semibold text-gray-800 text-sm">Etelios</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Image Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {dashboardImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentImageIndex === index 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Amazing Floating Elements with Multiple Animations */}
              <motion.div 
                className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [360, 180, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.div 
                className="absolute top-1/2 -right-8 w-16 h-16 bg-pink-500/15 rounded-full blur-lg"
                animate={{ 
                  y: [-20, 20, -20],
                  x: [0, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              <motion.div 
                className="absolute bottom-1/3 -left-8 w-20 h-20 bg-green-500/15 rounded-full blur-lg"
                animate={{ 
                  y: [20, -20, 20],
                  x: [0, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              />
              
              {/* Particle Effects */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Right Side - 40% Text Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="text-center lg:text-left">
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 font-display">
                    This is only{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      40%
                    </span>
                  </h2>
                  <p className="text-xl text-gray-700 mb-6 font-body">
                    of what Etelios can do
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                      <span className="text-3xl font-black text-white">40%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-display">
                      Current Features
                    </h3>
                    <p className="text-gray-600 font-body">
                      What you see above is just the beginning
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 font-body">Core business management modules</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 font-body">Standard operational tools</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 font-body">Traditional business software capabilities</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
                      <span className="text-3xl font-black text-white">60%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-display">
                      Advanced Capabilities
                    </h3>
                    <p className="text-gray-600 font-body">
                      The real power lies in what you haven't seen yet
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 font-body">AI-powered automation and intelligence</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 font-body">Predictive analytics and forecasting</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 font-body">Machine learning decision support</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 font-body">Advanced business intelligence</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-6 font-body">
                    The advanced capabilities represent the true value proposition
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={scrollToForm}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg font-heading cursor-pointer"
                  >
                    Access Full Platform
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
