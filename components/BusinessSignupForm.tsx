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
      <div className="cred-card p-8 text-center">
        <div className="w-16 h-16 bg-cred-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-cred-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h3 className="cred-subheading text-2xl mb-2">You're In!</h3>
        <p className="cred-body">We'll notify you when we launch.</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="cred-card p-8"
    >
      <div className="space-y-6">
        <div>
          <label className="cred-label">
            Full Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="cred-input w-full"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="cred-label">
            Business Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="cred-input w-full"
            placeholder="Enter your business email"
          />
        </div>

        <div>
          <label className="cred-label">
            Mobile Number
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="cred-input w-full"
            placeholder="Enter your mobile number"
          />
        </div>

        <div>
          <label className="cred-label">
            Business Size
          </label>
          <select
            required
            value={formData.businessSize}
            onChange={(e) => setFormData({ ...formData, businessSize: e.target.value })}
            className="cred-input w-full"
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
          <label className="cred-label">
            Nature of Business
          </label>
          <select
            required
            value={formData.natureOfBusiness}
            onChange={(e) => setFormData({ ...formData, natureOfBusiness: e.target.value })}
            className="cred-input w-full"
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
          className="cred-button w-full py-4 px-6 text-lg disabled:opacity-50"
        >
          {isSubmitting ? 'Joining...' : 'Join the Revolution'}
        </button>
      </div>
    </form>
  )
}
