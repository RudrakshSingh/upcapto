'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { automationService } from '@/lib/automationTriggers'
import Background3D from './Background3D'

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 90) // 90 days from now

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Submit to backend API
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          businessSize: '1-10', // Default for hero section
          natureOfBusiness: 'retail' // Default for hero section
        })
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ firstName: '', lastName: '', email: '', phone: '' })
        
        // Show success message
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      } else {
        throw new Error(result.error || 'Submission failed')
      }
    } catch (error) {
      console.error('Waitlist submission error:', error)
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white pt-32 pb-20">
      {/* 3D Background */}
      <Background3D />
      
      {/* Soft gradient overlays */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent-blue/5 to-secondary-teal/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary-teal/5 to-accent-blue/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12 md:space-y-16 mt-8"
        >
          
          {/* Cread-style Premium Headline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="space-y-6 md:space-y-8"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold text-accent-blue tracking-tight leading-tight"
            >
              The Operating System
              <br />
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="bg-hero-gradient bg-clip-text text-transparent"
              >
                for Retail.
              </motion.span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="inline-flex items-center px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6 bg-accent-gradient text-white rounded-full text-lg sm:text-xl md:text-2xl font-semibold shadow-lg hover:shadow-xl hover:bg-secondary-gradient transition-all duration-300 hover-glow"
            >
              <motion.span 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="mr-3 text-xl sm:text-2xl md:text-3xl"
              >
                🚀
              </motion.span>
              Coming Soon
            </motion.div>
          </motion.div>
          
          {/* Premium Subheadline */}
            <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl text-primary-navy-light max-w-5xl mx-auto leading-relaxed font-body px-4"
          >
            From Accounts to AI Forecasting — run your entire business in one simple dashboard. 
            <span className="font-semibold text-primary-navy"> Be the first to experience it.</span>
          </motion.p>

          {/* Interactive Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white rounded-3xl p-6 md:p-8 max-w-md md:max-w-lg mx-auto shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 relative overflow-hidden group"
            style={{
              background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
              boxShadow: '20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff'
            }}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 via-secondary-teal/5 to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="relative z-10"
            >
              <motion.div 
                className="flex items-center justify-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mr-3 text-2xl"
                >
                  ⏰
                </motion.div>
                <motion.p 
                  className="text-primary-navy font-semibold text-lg"
                  animate={{ 
                    color: ["#1A2B40", "#0072CE", "#1A2B40"]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  Launching in
                </motion.p>
              </motion.div>
              
              <div className="flex justify-center space-x-3 md:space-x-4">
                {[
                  { value: timeLeft.days, label: 'days', color: 'from-accent-blue to-accent-blue-dark' },
                  { value: timeLeft.hours, label: 'hours', color: 'from-secondary-teal to-secondary-teal-dark' },
                  { value: timeLeft.minutes, label: 'minutes', color: 'from-accent-blue to-secondary-teal' },
                  { value: timeLeft.seconds, label: 'seconds', color: 'from-secondary-teal to-accent-blue' }
                ].map((item, index) => (
                  <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 1.8 + index * 0.2,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    className="text-center relative group/item"
                  >
                    {/* Glowing background effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${item.color.includes('accent-blue') ? '#0072CE' : '#00C48C'}, ${item.color.includes('accent-blue') ? '#0051A2' : '#009975'})`,
                        filter: 'blur(8px)',
                        transform: 'scale(1.2)'
                      }}
                    />
                    
                    <motion.div 
                      key={`${item.label}-${item.value}`}
                      initial={{ scale: 0.8, rotateY: -90 }}
                      animate={{ scale: 1, rotateY: 0 }}
                      transition={{ 
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 5,
                        transition: { duration: 0.2 }
                      }}
                      className="relative z-10 bg-white rounded-2xl p-3 md:p-4 shadow-lg border border-gray-100"
                    >
                      <motion.div 
                        key={item.value}
                        initial={{ scale: 0.9, opacity: 0.7, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.4,
                          type: "spring",
                          stiffness: 300
                        }}
                        className={`text-2xl md:text-3xl lg:text-4xl font-display font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                      >
                        {item.value.toString().padStart(2, '0')}
                      </motion.div>
                    </motion.div>
                    
                    <motion.div 
                      className="text-sm text-primary-navy font-medium mt-2"
                      animate={{ 
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    >
                      {item.label}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              
              {/* Progress bar */}
              <motion.div 
                className="mt-6 bg-gray-200 rounded-full h-2 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
              >
                <motion.div 
                  className="h-full bg-gradient-to-r from-accent-blue to-secondary-teal rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ 
                    duration: 2,
                    delay: 2.4,
                    ease: "easeOut"
                  }}
                />
              </motion.div>
              
              {/* Status text */}
              <motion.p 
                className="text-xs text-primary-navy-light mt-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6 }}
              >
                {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
                  <span className="text-accent-blue font-semibold">🎉 We're Live! Join Now!</span>
                ) : (
                  <span>🚀 Early access coming soon</span>
                )}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* 3D Morphed Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ 
              scale: 1.02, 
              rotateX: 2,
              rotateY: 2,
              transition: { duration: 0.3 }
            }}
            className="relative max-w-md md:max-w-lg mx-auto group"
            style={{
              perspective: '1000px'
            }}
          >
            {/* 3D Background Layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-secondary-teal/5 to-accent-blue/10 rounded-3xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary-teal/10 via-accent-blue/5 to-secondary-teal/10 rounded-3xl blur-lg scale-105 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            
            {/* Main Form Container */}
            <motion.div
              className="relative z-10 bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100 overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                boxShadow: '20px 20px 60px rgba(0, 114, 206, 0.15), -20px -20px 60px #ffffff, inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              }}
              whileHover={{
                boxShadow: '25px 25px 80px rgba(0, 114, 206, 0.2), -25px -25px 80px #ffffff, inset 0 1px 0 rgba(255, 255, 255, 0.9)'
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent-blue to-secondary-teal rounded-3xl"></div>
                <motion.div
                  className="absolute top-4 right-4 w-20 h-20 bg-accent-blue/20 rounded-full blur-xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-16 h-16 bg-secondary-teal/20 rounded-full blur-xl"
                  animate={{ 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.6, 0.3, 0.6]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>

              {/* Form Header */}
              <motion.div
                className="relative z-10 text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                
                <motion.h3 
                  className="text-2xl md:text-3xl font-display font-bold text-primary-navy mb-2"
                  animate={{ 
                    color: ["#051622", "#0072CE", "#051622"]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Join the Waitlist
                </motion.h3>
                
                <motion.p 
                  className="text-primary-navy-light text-sm"
                  animate={{ 
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Be the first to experience the future of retail
                </motion.p>
              </motion.div>
              {/* 3D Morphed Form */}
              <motion.form 
                onSubmit={handleSubmit} 
                className="relative z-10 space-y-4 md:space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <div className="space-y-4">
                  {[
                    { name: 'firstName', placeholder: 'First Name', type: 'text' },
                    { name: 'lastName', placeholder: 'Last Name', type: 'text' },
                    { name: 'email', placeholder: 'Email Address', type: 'email' },
                    { name: 'phone', placeholder: 'Mobile Number', type: 'tel' }
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, x: -20, rotateY: -15 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      transition={{ 
                        delay: 1.6 + index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        rotateY: 2,
                        transition: { duration: 0.2 }
                      }}
                      className="relative group/input"
                    >
                      {/* Input Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-secondary-teal/20 rounded-2xl blur-md opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 scale-110"></div>
                      
                      {/* Input Container */}
                      <div className="relative">
                        
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                          required={field.name === 'firstName' || field.name === 'email'}
                          className="w-full px-6 py-4 bg-white/90 backdrop-blur-sm border border-accent-blue/30 rounded-2xl focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all duration-300 placeholder-primary-navy-light shadow-lg hover:shadow-xl hover:shadow-accent-blue/20 focus:shadow-2xl focus:shadow-accent-blue/30 relative z-10"
                          style={{
                            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 249, 250, 0.9))',
                            boxShadow: 'inset 2px 2px 8px rgba(0, 114, 206, 0.1), inset -2px -2px 8px rgba(255, 255, 255, 0.8)'
                          }}
                          onFocus={(e) => {
                            e.target.style.background = 'linear-gradient(145deg, rgba(255, 255, 255, 1), rgba(248, 249, 250, 1))'
                            e.target.style.boxShadow = 'inset 4px 4px 12px rgba(0, 114, 206, 0.15), inset -4px -4px 12px rgba(255, 255, 255, 0.9), 0 0 20px rgba(0, 114, 206, 0.2)'
                          }}
                          onBlur={(e) => {
                            e.target.style.background = 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 249, 250, 0.9))'
                            e.target.style.boxShadow = 'inset 2px 2px 8px rgba(0, 114, 206, 0.1), inset -2px -2px 8px rgba(255, 255, 255, 0.8)'
                          }}
                        />
                        
                        {/* Focus Indicator */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-accent-blue to-secondary-teal opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300"
                          style={{
                            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            maskComposite: 'xor',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor'
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              
                {/* 3D Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 text-green-800 px-6 py-4 rounded-2xl text-center shadow-lg relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(145deg, rgba(220, 252, 231, 0.9), rgba(209, 250, 229, 0.9))',
                      boxShadow: 'inset 2px 2px 8px rgba(34, 197, 94, 0.1), inset -2px -2px 8px rgba(255, 255, 255, 0.8)'
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl"
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="relative z-10 flex items-center justify-center">
                      <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        ✅
                      </motion.span>
                      Successfully joined the waitlist! Check your email for confirmation.
                    </span>
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="bg-gradient-to-r from-red-100 to-pink-100 border border-red-300 text-red-800 px-6 py-4 rounded-2xl text-center shadow-lg relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(145deg, rgba(254, 226, 226, 0.9), rgba(252, 231, 243, 0.9))',
                      boxShadow: 'inset 2px 2px 8px rgba(239, 68, 68, 0.1), inset -2px -2px 8px rgba(255, 255, 255, 0.8)'
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-2xl"
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="relative z-10 flex items-center justify-center">
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="mr-2"
                      >
                        ❌
                      </motion.span>
                      Something went wrong. Please try again.
                    </span>
                  </motion.div>
                )}
                
                {/* 3D Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 2.0, type: "spring", stiffness: 100 }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateX: 5,
                    rotateY: 2,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    rotateX: -2
                  }}
                  className="relative w-full py-4 sm:py-5 md:py-6 rounded-2xl font-semibold text-lg sm:text-xl md:text-2xl shadow-2xl overflow-hidden group/button disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(145deg, #0072CE, #0051A2)',
                    boxShadow: '20px 20px 60px rgba(0, 114, 206, 0.3), -20px -20px 60px rgba(255, 255, 255, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary-teal to-accent-blue opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"
                    animate={{ 
                      background: [
                        'linear-gradient(45deg, #0072CE, #0051A2)',
                        'linear-gradient(45deg, #00C48C, #0072CE)',
                        'linear-gradient(45deg, #0072CE, #0051A2)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  {/* Button Content */}
                  <motion.div className="relative z-10 flex items-center justify-center">
                    
                    <motion.span
                      animate={{ 
                        opacity: isSubmitting ? [0.7, 1, 0.7] : 1
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: isSubmitting ? Infinity : 0
                      }}
                    >
                      {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                    </motion.span>
                  </motion.div>
                  
                  {/* Ripple Effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-2xl"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: isSubmitting ? [0, 1.5, 0] : 0,
                      opacity: isSubmitting ? [0, 0.3, 0] : 0
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: isSubmitting ? Infinity : 0
                    }}
                  />
                </motion.button>
              </motion.form>
              
              {/* 3D Footer Message */}
              <motion.p 
                className="relative z-10 text-sm text-primary-navy mt-6 text-center font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 }}
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: 1
                  }}
                  className="inline-block mr-2"
                >
                  ✨
                </motion.span>
                Early members get priority access + special launch offers
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
