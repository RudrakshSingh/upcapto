'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { automationService } from '@/lib/automationTriggers'

export default function QueryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    query: '',
    category: 'general' as const
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', query: '', category: 'general' })
        
        // Show success message
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      } else {
        throw new Error(result.error || 'Submission failed')
      }
    } catch (error) {
      console.error('Contact submission error:', error)
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      whileHover={{ 
        scale: 1.02, 
        rotateX: 2,
        rotateY: 2,
        transition: { duration: 0.3 }
      }}
      className="relative max-w-2xl mx-auto group"
      style={{
        perspective: '1000px'
      }}
    >
      {/* 3D Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-secondary-teal/5 to-accent-blue/10 rounded-3xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-secondary-teal/10 via-accent-blue/5 to-secondary-teal/10 rounded-3xl blur-lg scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Main Form Container */}
      <motion.div
        className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
          boxShadow: '20px 20px 60px rgba(0, 114, 206, 0.15), -20px -20px 60px #ffffff, inset 0 1px 0 rgba(255, 255, 255, 0.8)'
        }}
        whileHover={{
          boxShadow: '25px 25px 80px rgba(0, 114, 206, 0.2), -25px -25px 80px #ffffff, inset 0 1px 0 rgba(255, 255, 255, 0.9)'
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center mb-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold text-primary-navy mb-4"
            animate={{ 
              color: ["#051622", "#0072CE", "#051622"]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Have a Question?
          </motion.h2>
          <motion.p 
            className="text-primary-navy-light text-lg"
            animate={{ 
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            We're here to help! Ask us anything about Etelios.
          </motion.p>
        </div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="relative z-10 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-primary-navy mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-6 py-4 bg-white/90 backdrop-blur-sm border border-accent-blue/30 rounded-2xl focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all duration-300 placeholder-primary-navy-light shadow-lg hover:shadow-xl hover:shadow-accent-blue/20 focus:shadow-2xl focus:shadow-accent-blue/30"
                style={{
                  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 249, 250, 0.9))',
                  boxShadow: 'inset 2px 2px 8px rgba(0, 114, 206, 0.1), inset -2px -2px 8px rgba(255, 255, 255, 0.8)'
                }}
                placeholder="Your full name"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-primary-navy mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-6 py-4 bg-white/90 backdrop-blur-sm border border-accent-blue/30 rounded-2xl focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all duration-300 placeholder-primary-navy-light shadow-lg hover:shadow-xl hover:shadow-accent-blue/20 focus:shadow-2xl focus:shadow-accent-blue/30"
                style={{
                  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 249, 250, 0.9))',
                  boxShadow: 'inset 2px 2px 8px rgba(0, 114, 206, 0.1), inset -2px -2px 8px rgba(255, 255, 255, 0.8)'
                }}
                placeholder="your@email.com"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-primary-navy mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-white/90 backdrop-blur-sm border border-accent-blue/30 rounded-2xl focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all duration-300 placeholder-primary-navy-light shadow-lg hover:shadow-xl hover:shadow-accent-blue/20 focus:shadow-2xl focus:shadow-accent-blue/30"
                style={{
                  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 249, 250, 0.9))',
                  boxShadow: 'inset 2px 2px 8px rgba(0, 114, 206, 0.1), inset -2px -2px 8px rgba(255, 255, 255, 0.8)'
                }}
                placeholder="+91 98765 43210"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-primary-navy mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-white/90 backdrop-blur-sm border border-accent-blue/30 rounded-2xl focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-accent-blue/20 focus:shadow-2xl focus:shadow-accent-blue/30"
                style={{
                  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 249, 250, 0.9))',
                  boxShadow: 'inset 2px 2px 8px rgba(0, 114, 206, 0.1), inset -2px -2px 8px rgba(255, 255, 255, 0.8)'
                }}
              >
                <option value="general">General Inquiry</option>
                <option value="technical">Technical Support</option>
                <option value="billing">Billing & Pricing</option>
                <option value="support">Customer Support</option>
              </select>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-sm font-medium text-primary-navy mb-2">
              Your Question *
            </label>
            <textarea
              name="query"
              value={formData.query}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-6 py-4 bg-white/90 backdrop-blur-sm border border-accent-blue/30 rounded-2xl focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all duration-300 placeholder-primary-navy-light shadow-lg hover:shadow-xl hover:shadow-accent-blue/20 focus:shadow-2xl focus:shadow-accent-blue/30 resize-none"
              style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 249, 250, 0.9))',
                boxShadow: 'inset 2px 2px 8px rgba(0, 114, 206, 0.1), inset -2px -2px 8px rgba(255, 255, 255, 0.8)'
              }}
              placeholder="Tell us what you'd like to know about Etelios..."
            />
          </motion.div>

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
                Thanks for your question! We'll get back to you within 24 hours via email and WhatsApp.
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
            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
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
                {isSubmitting ? 'Submitting...' : 'Submit Question'}
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

        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <motion.p 
            className="text-sm text-primary-navy-light"
            animate={{ 
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💬 You can also reach us on WhatsApp for instant support
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
