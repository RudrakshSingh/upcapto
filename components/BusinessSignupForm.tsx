'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useFormHoverAnimation, useButtonHoverAnimation } from '@/lib/useCredAnimations'

const businessSizes = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-20', label: '11-20 employees' },
  { value: '21-50', label: '21-50 employees' },
  { value: '51-100', label: '51-100 employees' },
  { value: '100+', label: '100+ employees' }
]

const natureOfBusiness = [
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'restaurant', label: 'Restaurant & Food Service' },
  { value: 'healthcare', label: 'Healthcare & Medical' },
  { value: 'education', label: 'Education & Training' },
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'logistics', label: 'Logistics & Transportation' },
  { value: 'technology', label: 'Technology & Software' },
  { value: 'consulting', label: 'Consulting & Professional Services' },
  { value: 'hospitality', label: 'Hospitality & Tourism' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'beauty', label: 'Beauty & Wellness' },
  { value: 'fitness', label: 'Fitness & Sports' },
  { value: 'entertainment', label: 'Entertainment & Media' },
  { value: 'agriculture', label: 'Agriculture & Farming' },
  { value: 'construction', label: 'Construction & Engineering' },
  { value: 'legal', label: 'Legal Services' },
  { value: 'marketing', label: 'Marketing & Advertising' },
  { value: 'non-profit', label: 'Non-Profit Organization' },
  { value: 'other', label: 'Other' }
]

export default function BusinessSignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessSize: '',
    natureOfBusiness: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // CRED-style hover animations
  const formRef = useFormHoverAnimation()
  const buttonRef = useButtonHoverAnimation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/waitlist-working', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessSize: formData.businessSize,
          natureOfBusiness: formData.natureOfBusiness
        })
      })
      
      if (response.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
        <div
          className="bg-cred-white/20 backdrop-blur-lg rounded-2xl p-8 text-center shadow-2xl border border-cred-gray-200/30"
        >
        <div className="w-16 h-16 bg-cred-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-cred-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h3 className="text-2xl font-bold text-cred-black mb-2">You're In!</h3>
        <p className="text-cred-gray-600">We'll notify you when we launch.</p>
        </div>
    )
  }

  return (
    <motion.form
      ref={formRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-cred-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-cred-gray-200/30"
    >
      <div className="space-y-6">
        <motion.div
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <label className="block text-sm font-semibold text-cred-gray-700 mb-2 font-subheading">
            Full Name
          </label>
          <motion.input
            whileFocus={{ 
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
              borderColor: "rgba(59, 130, 246, 0.5)"
            }}
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-cred-white/20 backdrop-blur-sm border border-cred-gray-200/30 rounded-lg focus:ring-2 focus:ring-cred-blue-500 focus:border-transparent focus:bg-cred-white/30 transition-all duration-300 font-body"
            placeholder="Enter your full name"
          />
        </motion.div>

        <motion.div
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Email
          </label>
          <motion.input
            whileFocus={{ 
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
              borderColor: "rgba(59, 130, 246, 0.5)"
            }}
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white/30 transition-all duration-300"
            placeholder="Enter your business email"
          />
        </motion.div>

        <motion.div
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number
          </label>
          <motion.input
            whileFocus={{ 
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
              borderColor: "rgba(59, 130, 246, 0.5)"
            }}
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white/30 transition-all duration-300"
            placeholder="Enter your mobile number"
          />
        </motion.div>

        <motion.div
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Size
          </label>
          <motion.select
            whileFocus={{ 
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
              borderColor: "rgba(59, 130, 246, 0.5)"
            }}
            required
            value={formData.businessSize}
            onChange={(e) => setFormData({ ...formData, businessSize: e.target.value })}
            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white/30 transition-all duration-300"
          >
            <option value="">Select business size</option>
            {businessSizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </motion.select>
        </motion.div>

        <motion.div
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nature of Business
          </label>
          <motion.select
            whileFocus={{ 
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
              borderColor: "rgba(59, 130, 246, 0.5)"
            }}
            required
            value={formData.natureOfBusiness}
            onChange={(e) => setFormData({ ...formData, natureOfBusiness: e.target.value })}
            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white/30 transition-all duration-300"
          >
            <option value="">Select nature of business</option>
            {natureOfBusiness.map((business) => (
              <option key={business.value} value={business.value}>
                {business.label}
              </option>
            ))}
          </motion.select>
        </motion.div>

        <motion.button
          ref={buttonRef}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 10px 30px rgba(59, 130, 246, 0.3)",
              "0 15px 35px rgba(59, 130, 246, 0.4)",
              "0 10px 30px rgba(59, 130, 246, 0.3)"
            ]
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-cred-blue-600/80 to-cred-purple-600/80 backdrop-blur-sm text-cred-white py-4 px-6 rounded-lg font-bold text-lg hover:from-cred-blue-700/90 hover:to-cred-purple-700/90 transition-all duration-200 disabled:opacity-50 border border-cred-gray-200/20 shadow-xl relative overflow-hidden font-heading"
        >
          {/* Button shimmer effect */}
          <motion.div
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cred-white/20 to-transparent"
            style={{
              transform: 'skewX(-20deg)'
            }}
          />
          <span className="relative z-10">
            {isSubmitting ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                Joining...
              </motion.span>
            ) : (
              'Join the Revolution'
            )}
          </span>
        </motion.button>
      </div>
    </motion.form>
  )
}
