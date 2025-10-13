// Enhanced Security System - Bulletproof Implementation
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { headers } from 'next/headers'

export interface SecurityConfig {
  rateLimit: {
    max: number
    windowMs: number
    blockDuration: number
  }
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
  encryption: {
    algorithm: string
    keyLength: number
  }
  monitoring: {
    enableLogging: boolean
    alertThreshold: number
  }
}

interface SecurityEvent {
  type: 'RATE_LIMIT' | 'SUSPICIOUS_ACTIVITY' | 'INVALID_INPUT' | 'BLOCKED_IP'
  ip: string
  userAgent: string
  timestamp: number
  details: any
}

interface BlockedIP {
  ip: string
  reason: string
  blockedAt: number
  expiresAt: number
}

class EnhancedSecurityService {
  private static instance: EnhancedSecurityService
  private rateLimitStore: Map<string, { count: number; resetTime: number; violations: number }> = new Map()
  private blockedIPs: Map<string, BlockedIP> = new Map()
  private securityEvents: SecurityEvent[] = []
  private suspiciousPatterns: RegExp[] = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /eval\s*\(/i,
    /expression\s*\(/i,
    /vbscript:/i,
    /data:text\/html/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /<link/i,
    /<meta/i,
    /document\.cookie/i,
    /document\.write/i,
    /window\.location/i,
    /\.\.\//g,
    /\.\.\\/g,
    /union\s+select/i,
    /drop\s+table/i,
    /insert\s+into/i,
    /delete\s+from/i,
    /update\s+set/i,
    /or\s+1\s*=\s*1/i,
    /and\s+1\s*=\s*1/i,
    /exec\s*\(/i,
    /system\s*\(/i,
    /cmd\s*\/c/i,
    /powershell/i,
    /bash\s*-c/i
  ]

  static getInstance(): EnhancedSecurityService {
    if (!EnhancedSecurityService.instance) {
      EnhancedSecurityService.instance = new EnhancedSecurityService()
    }
    return EnhancedSecurityService.instance
  }

  // Enhanced Rate Limiting with Progressive Penalties
  isRateLimited(ip: string, config: SecurityConfig['rateLimit']): { blocked: boolean; reason?: string } {
    const now = Date.now()
    const key = ip
    const record = this.rateLimitStore.get(key)

    // Check if IP is permanently blocked
    if (this.isIPBlocked(ip)) {
      return { blocked: true, reason: 'IP permanently blocked' }
    }

    if (!record || now > record.resetTime) {
      this.rateLimitStore.set(key, { count: 1, resetTime: now + config.windowMs, violations: 0 })
      return { blocked: false }
    }

    if (record.count >= config.max) {
      record.violations++
      
      // Progressive penalties
      if (record.violations >= 3) {
        this.blockIP(ip, 'Multiple rate limit violations', config.blockDuration * 2)
        this.logSecurityEvent({
          type: 'RATE_LIMIT',
          ip,
          userAgent: 'unknown',
          timestamp: now,
          details: { violations: record.violations, count: record.count }
        })
        return { blocked: true, reason: 'IP blocked due to repeated violations' }
      }

      this.logSecurityEvent({
        type: 'RATE_LIMIT',
        ip,
        userAgent: 'unknown',
        timestamp: now,
        details: { count: record.count, violations: record.violations }
      })

      return { blocked: true, reason: 'Rate limit exceeded' }
    }

    record.count++
    this.rateLimitStore.set(key, record)
    return { blocked: false }
  }

  // IP Blocking System
  blockIP(ip: string, reason: string, duration: number): void {
    const now = Date.now()
    this.blockedIPs.set(ip, {
      ip,
      reason,
      blockedAt: now,
      expiresAt: now + duration
    })
  }

  isIPBlocked(ip: string): boolean {
    const blocked = this.blockedIPs.get(ip)
    if (!blocked) return false

    const now = Date.now()
    if (now > blocked.expiresAt) {
      this.blockedIPs.delete(ip)
      return false
    }

    return true
  }

  // Advanced Input Validation
  validateAndSanitize(input: any, type: string): { isValid: boolean; sanitized: any; errors: string[] } {
    const errors: string[] = []
    const sanitized: any = {}

    for (const [key, value] of Object.entries(input)) {
      if (typeof value !== 'string') {
        errors.push(`Invalid data type for ${key}`)
        continue
      }

      // Check for suspicious patterns
      if (this.containsSuspiciousPattern(value)) {
        errors.push(`Suspicious content detected in ${key}`)
        this.logSecurityEvent({
          type: 'SUSPICIOUS_ACTIVITY',
          ip: 'unknown',
          userAgent: 'unknown',
          timestamp: Date.now(),
          details: { field: key, content: value.substring(0, 100) }
        })
        continue
      }

      // Sanitize based on field type
      switch (key) {
        case 'name':
          if (!this.validateName(value)) {
            errors.push('Invalid name format')
            continue
          }
          sanitized[key] = this.sanitizeString(value)
          break

        case 'email':
          if (!this.validateEmail(value)) {
            errors.push('Invalid email format')
            continue
          }
          sanitized[key] = this.sanitizeString(value.toLowerCase())
          break

        case 'phone':
          if (!this.validatePhone(value)) {
            errors.push('Invalid phone format')
            continue
          }
          sanitized[key] = this.sanitizeString(value)
          break

        case 'query':
          if (!this.validateQuery(value)) {
            errors.push('Query must be 10-2000 characters')
            continue
          }
          sanitized[key] = this.sanitizeString(value)
          break

        default:
          sanitized[key] = this.sanitizeString(value)
      }
    }

    return {
      isValid: errors.length === 0,
      sanitized,
      errors
    }
  }

  // Enhanced Validation Methods
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email) && email.length <= 255 && !this.containsSuspiciousPattern(email)
  }

  validatePhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{7,19}$/
    return phoneRegex.test(phone) && phone.length <= 20 && !this.containsSuspiciousPattern(phone)
  }

  validateName(name: string): boolean {
    const nameRegex = /^[a-zA-Z\s\-'\.]{2,100}$/
    return nameRegex.test(name) && !this.containsSuspiciousPattern(name)
  }

  validateQuery(query: string): boolean {
    return query.length >= 10 && query.length <= 2000 && !this.containsSuspiciousPattern(query)
  }

  // Suspicious Pattern Detection
  containsSuspiciousPattern(input: string): boolean {
    return this.suspiciousPatterns.some(pattern => pattern.test(input))
  }

  // Advanced Sanitization
  sanitizeString(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .replace(/[^\w\s@\.\-_\+]/g, '') // Remove special characters except allowed ones
      .substring(0, 1000) // Limit length
  }

  // XSS Protection
  escapeHtml(input: string): string {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  }

  // Enhanced Security Headers
  getSecurityHeaders(): Record<string, string> {
    return {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'same-origin',
      'X-DNS-Prefetch-Control': 'off',
      'X-Download-Options': 'noopen',
      'X-Permitted-Cross-Domain-Policies': 'none'
    }
  }

  // CORS Headers
  getCORSHeaders(config: SecurityConfig['cors']): Record<string, string> {
    return {
      'Access-Control-Allow-Origin': config.origin.join(', '),
      'Access-Control-Allow-Methods': config.methods.join(', '),
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': config.credentials.toString(),
      'Access-Control-Max-Age': '86400'
    }
  }

  // Data Encryption
  encryptData(data: string, secretKey: string): string {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipher('aes-256-cbc', secretKey)
    let encrypted = cipher.update(data, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return iv.toString('hex') + ':' + encrypted
  }

  decryptData(encryptedData: string, secretKey: string): string {
    const [ivHex, encrypted] = encryptedData.split(':')
    const iv = Buffer.from(ivHex, 'hex')
    const decipher = crypto.createDecipher('aes-256-cbc', secretKey)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  }

  // Security Event Logging
  logSecurityEvent(event: SecurityEvent): void {
    this.securityEvents.push(event)
    
    // Keep only last 1000 events
    if (this.securityEvents.length > 1000) {
      this.securityEvents = this.securityEvents.slice(-1000)
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Security Event:', event)
    }
  }

  // Get Security Events
  getSecurityEvents(limit: number = 100): SecurityEvent[] {
    return this.securityEvents.slice(-limit)
  }

  // Get Client IP with Enhanced Detection
  getClientIP(request: NextRequest): string {
    const headers = request.headers
    const forwarded = headers.get('x-forwarded-for')
    const realIP = headers.get('x-real-ip')
    const cfConnectingIP = headers.get('cf-connecting-ip')
    const xClientIP = headers.get('x-client-ip')
    
    // Priority order for IP detection
    if (cfConnectingIP) return cfConnectingIP
    if (realIP) return realIP
    if (xClientIP) return xClientIP
    if (forwarded) return forwarded.split(',')[0].trim()
    
    return request.ip || 'unknown'
  }

  // Request Validation
  validateRequest(request: NextRequest): { isValid: boolean; reason?: string } {
    const userAgent = request.headers.get('user-agent') || ''
    const contentType = request.headers.get('content-type') || ''
    
    // Check for suspicious user agents
    const suspiciousUserAgents = [
      /bot/i, /crawler/i, /spider/i, /scraper/i, /curl/i, /wget/i,
      /python/i, /java/i, /php/i, /perl/i, /ruby/i
    ]
    
    if (suspiciousUserAgents.some(pattern => pattern.test(userAgent))) {
      this.logSecurityEvent({
        type: 'SUSPICIOUS_ACTIVITY',
        ip: this.getClientIP(request),
        userAgent,
        timestamp: Date.now(),
        details: { reason: 'Suspicious user agent' }
      })
    }

    // Check content type
    if (contentType && !contentType.includes('application/json') && !contentType.includes('application/x-www-form-urlencoded')) {
      return { isValid: false, reason: 'Invalid content type' }
    }

    return { isValid: true }
  }

  // Cleanup Methods
  cleanupRateLimit(): void {
    const now = Date.now()
    for (const [key, record] of Array.from(this.rateLimitStore.entries())) {
      if (now > record.resetTime) {
        this.rateLimitStore.delete(key)
      }
    }
  }

  cleanupBlockedIPs(): void {
    const now = Date.now()
    for (const [ip, blocked] of Array.from(this.blockedIPs.entries())) {
      if (now > blocked.expiresAt) {
        this.blockedIPs.delete(ip)
      }
    }
  }

  // Security Health Check
  getSecurityStatus(): {
    activeBlocks: number
    rateLimitEntries: number
    recentEvents: number
    health: 'good' | 'warning' | 'critical'
  } {
    const now = Date.now()
    const recentEvents = this.securityEvents.filter(
      event => now - event.timestamp < 3600000 // Last hour
    ).length

    let health: 'good' | 'warning' | 'critical' = 'good'
    if (recentEvents > 50) health = 'warning'
    if (recentEvents > 100) health = 'critical'

    return {
      activeBlocks: this.blockedIPs.size,
      rateLimitEntries: this.rateLimitStore.size,
      recentEvents,
      health
    }
  }
}

export const enhancedSecurityService = EnhancedSecurityService.getInstance()

// Cleanup tasks
setInterval(() => {
  enhancedSecurityService.cleanupRateLimit()
  enhancedSecurityService.cleanupBlockedIPs()
}, 5 * 60 * 1000) // Every 5 minutes

// Security configuration
export const securityConfig: SecurityConfig = {
  rateLimit: {
    max: 10, // requests per window
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDuration: 60 * 60 * 1000 // 1 hour
  },
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:4000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  },
  validation: {
    maxNameLength: 100,
    maxEmailLength: 255,
    maxPhoneLength: 20,
    maxQueryLength: 2000
  },
  encryption: {
    algorithm: 'aes-256-cbc',
    keyLength: 32
  },
  monitoring: {
    enableLogging: true,
    alertThreshold: 10
  }
}
