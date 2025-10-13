'use client'

import { useState } from 'react'

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
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
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
      
      const data = await response.json()
      
      if (response.ok) {
        setIsSubmitted(true)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center shadow-subtle-lg border border-mono-gray-200">
        <div className="w-16 h-16 bg-mono-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-mono-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h3 className="text-2xl font-bold text-mono-black mb-2">You're In!</h3>
        <p className="text-mono-gray-600">We'll notify you when we launch.</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-8 shadow-subtle-lg border border-mono-gray-200"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-mono-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-mono-gray-50 border border-mono-gray-200 rounded-lg focus:ring-2 focus:ring-mono-gray-400 focus:border-mono-gray-400 focus:bg-white transition-all duration-300"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-mono-gray-700 mb-2">
            Business Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-mono-gray-50 border border-mono-gray-200 rounded-lg focus:ring-2 focus:ring-mono-gray-400 focus:border-mono-gray-400 focus:bg-white transition-all duration-300"
            placeholder="Enter your business email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-mono-gray-700 mb-2">
            Mobile Number
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-mono-gray-50 border border-mono-gray-200 rounded-lg focus:ring-2 focus:ring-mono-gray-400 focus:border-mono-gray-400 focus:bg-white transition-all duration-300"
            placeholder="Enter your mobile number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-mono-gray-700 mb-2">
            Business Size
          </label>
          <select
            required
            value={formData.businessSize}
            onChange={(e) => setFormData({ ...formData, businessSize: e.target.value })}
            className="w-full px-4 py-3 bg-mono-gray-50 border border-mono-gray-200 rounded-lg focus:ring-2 focus:ring-mono-gray-400 focus:border-mono-gray-400 focus:bg-white transition-all duration-300"
          >
            <option value="">Select business size</option>
            {businessSizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-mono-gray-700 mb-2">
            Nature of Business
          </label>
          <select
            required
            value={formData.natureOfBusiness}
            onChange={(e) => setFormData({ ...formData, natureOfBusiness: e.target.value })}
            className="w-full px-4 py-3 bg-mono-gray-50 border border-mono-gray-200 rounded-lg focus:ring-2 focus:ring-mono-gray-400 focus:border-mono-gray-400 focus:bg-white transition-all duration-300"
          >
            <option value="">Select nature of business</option>
            {natureOfBusiness.map((business) => (
              <option key={business.value} value={business.value}>
                {business.label}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-mono-black text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-mono-gray-800 transition-all duration-200 disabled:opacity-50 border border-mono-gray-200 shadow-subtle"
        >
          {isSubmitting ? 'Joining...' : 'Join the Revolution'}
        </button>
      </div>
    </form>
  )
}
