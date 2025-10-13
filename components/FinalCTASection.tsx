'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function FinalCTASection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    betaAccess: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Submit to contact API for beta access request
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.mobile,
          query: formData.betaAccess 
            ? 'I want early beta access to Etelios. Please prioritize my application for the beta testing program.'
            : 'I am interested in learning more about Etelios and would like to be notified about early access opportunities.',
          category: 'beta_access'
        })
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', mobile: '', betaAccess: false })
        
        // Show success message
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      } else {
        throw new Error(result.error || 'Submission failed')
      }
    } catch (error) {
      console.error('Beta access request error:', error)
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gradient-to-br from-accent-blue/5 to-secondary-teal/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-gradient-to-tr from-secondary-teal/5 to-accent-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Premium Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-navy mb-6 leading-tight">
              Want Early Beta Access?
              <br />
              <motion.span 
                className="bg-hero-gradient bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Join our beta testing program.
              </motion.span>
            </h2>
          </motion.div>

          {/* 3D Morphed CTA Form */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.02, 
              rotateX: 2,
              rotateY: 2,
              transition: { duration: 0.3 }
            }}
            className="relative max-w-md mx-auto group"
            style={{
              perspective: '1000px'
            }}
          >
            {/* 3D Background Layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-secondary-teal/5 to-accent-blue/10 rounded-3xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary-teal/10 via-accent-blue/5 to-secondary-teal/10 rounded-3xl blur-lg scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
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
                transition={{ delay: 0.6 }}
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
                  Request Beta Access
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
                  Get early access to the future of retail
                </motion.p>
              </motion.div>

              {/* 3D Morphed Form */}
              <motion.form 
                onSubmit={handleSubmit} 
                className="relative z-10 space-y-4 md:space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="space-y-4">
                  {[
                    { name: 'name', placeholder: 'Full Name', type: 'text' },
                    { name: 'email', placeholder: 'Email Address', type: 'email' },
                    { name: 'mobile', placeholder: 'Mobile Number', type: 'tel' }
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, x: -20, rotateY: -15 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      transition={{ 
                        delay: 1.0 + index * 0.1,
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
                          value={formData[field.name as keyof typeof formData] as string}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                          required
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

                {/* 3D Checkbox */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group/checkbox"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/10 to-secondary-teal/10 rounded-xl opacity-0 group-hover/checkbox:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 flex items-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-accent-blue/20">
                    <motion.input
                      type="checkbox"
                      id="beta"
                      name="betaAccess"
                      checked={formData.betaAccess}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-accent-blue border-2 border-accent-blue rounded focus:ring-accent-blue focus:ring-2"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    />
                    <motion.label 
                      htmlFor="beta" 
                      className="ml-3 text-sm font-medium text-primary-navy cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                    >
                      I want early beta access
                    </motion.label>
                  </div>
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
                      Beta access request submitted! We'll review your application and get back to you soon.
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
                  transition={{ delay: 1.4, type: "spring", stiffness: 100 }}
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
                      {isSubmitting ? 'Requesting...' : 'Request Beta Access'}
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
                transition={{ delay: 1.6 }}
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
                Early access + special launch offers
              </motion.p>
            </motion.div>
          </motion.div>

          {/* 3D Growth Hook */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05,
              rotateX: 5,
              transition: { duration: 0.3 }
            }}
            className="relative max-w-lg mx-auto group"
            style={{
              perspective: '1000px'
            }}
          >
            {/* 3D Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/10 to-secondary-teal/10 rounded-2xl blur-lg scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <motion.div
              className="relative z-10 bg-gradient-to-r from-accent-blue/10 to-secondary-teal/10 rounded-2xl p-6 border border-accent-blue/20 shadow-lg"
              style={{
                background: 'linear-gradient(145deg, rgba(0, 114, 206, 0.1), rgba(0, 196, 140, 0.1))',
                boxShadow: 'inset 2px 2px 8px rgba(0, 114, 206, 0.1), inset -2px -2px 8px rgba(255, 255, 255, 0.8)'
              }}
            >
              <motion.p 
                className="text-lg font-semibold text-primary-navy text-center"
                animate={{ 
                  color: ["#051622", "#0072CE", "#051622"]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                  className="inline-block mr-2"
                >
                  🚀
                </motion.span>
                Invite 3 friends → unlock priority access
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
