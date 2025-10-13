// Security utilities for production
import { NextRequest } from 'next/server'

export interface RateLimitConfig {
  max: number
  windowMs: number
}

export interface SecurityConfig {
  rateLimit: RateLimitConfig
  cors: {
    origin: string[]
    methods: string[]
    credentials: boolean
  }
  validation: {
    maxNameLength: number
    maxEmailLength: number
    maxPhoneLength: number
    maxQueryLength: number
  }
}

class SecurityService {
  private static instance: SecurityService
  private rateLimitStore: Map<string, { count: number; resetTime: number }> = new Map()

  static getInstance(): SecurityService {
    if (!SecurityService.instance) {
      SecurityService.instance = new SecurityService()
    }
    return SecurityService.instance
  }

  // Rate limiting
  isRateLimited(ip: string, config: RateLimitConfig): boolean {
    const now = Date.now()
    const key = ip
    const record = this.rateLimitStore.get(key)

    if (!record || now > record.resetTime) {
      this.rateLimitStore.set(key, { count: 1, resetTime: now + config.windowMs })
      return false
    }

    if (record.count >= config.max) {
      return true
    }

    record.count++
    this.rateLimitStore.set(key, record)
    return false
  }

  // Input validation
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) && email.length <= 255
  }

  validatePhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone) && phone.length <= 20
  }

  validateName(name: string): boolean {
    return name.length >= 2 && name.length <= 100 && /^[a-zA-Z\s]+$/.test(name)
  }

  validateQuery(query: string): boolean {
    return query.length >= 10 && query.length <= 2000
  }

  // Sanitize input
  sanitizeString(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
  }

  // XSS protection
  escapeHtml(input: string): string {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
  }

  // Get client IP
  getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    
    if (forwarded) {
      return forwarded.split(',')[0].trim()
    }
    
    if (realIP) {
      return realIP
    }
    
    return request.ip || 'unknown'
  }

  // CORS headers
  getCORSHeaders(config: SecurityConfig['cors']) {
    return {
      'Access-Control-Allow-Origin': config.origin.join(', '),
      'Access-Control-Allow-Methods': config.methods.join(', '),
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': config.credentials.toString()
    }
  }

  // Security headers
  getSecurityHeaders() {
    return {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  }

  // Validate form data
  validateFormData(data: any, type: 'waitlist' | 'contact'): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Common validations
    if (!data.name || !this.validateName(data.name)) {
      errors.push('Name must be 2-100 characters and contain only letters and spaces')
    }

    if (!data.email || !this.validateEmail(data.email)) {
      errors.push('Valid email address is required')
    }

    if (data.phone && !this.validatePhone(data.phone)) {
      errors.push('Phone number must be valid (max 20 characters)')
    }

    // Type-specific validations
    if (type === 'contact') {
      if (!data.query || !this.validateQuery(data.query)) {
        errors.push('Query must be 10-2000 characters')
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Clean up rate limit store (run periodically)
  cleanupRateLimit(): void {
    const now = Date.now()
    for (const [key, record] of Array.from(this.rateLimitStore.entries())) {
      if (now > record.resetTime) {
        this.rateLimitStore.delete(key)
      }
    }
  }
}

export const securityService = SecurityService.getInstance()

// Clean up rate limit store every 5 minutes
setInterval(() => {
  securityService.cleanupRateLimit()
}, 5 * 60 * 1000)
