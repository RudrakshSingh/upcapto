// Production validation service with Joi
import Joi from 'joi'
import { logError, logSecurity } from './logger'

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  data?: any
}

export interface ValidationContext {
  ip?: string
  userAgent?: string
  requestId?: string
}

class ValidationService {
  private static instance: ValidationService

  static getInstance(): ValidationService {
    if (!ValidationService.instance) {
      ValidationService.instance = new ValidationService()
    }
    return ValidationService.instance
  }

  // Waitlist validation schema
  private waitlistSchema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(100)
      .pattern(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name must not exceed 100 characters',
        'string.pattern.base': 'Name can only contain letters and spaces',
        'any.required': 'Name is required'
      }),
    email: Joi.string()
      .email()
      .max(255)
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'string.max': 'Email must not exceed 255 characters',
        'any.required': 'Email is required'
      }),
    phone: Joi.string()
      .pattern(/^[\+]?[1-9][\d]{0,15}$/)
      .max(20)
      .optional()
      .allow('')
      .messages({
        'string.pattern.base': 'Please provide a valid phone number',
        'string.max': 'Phone number must not exceed 20 characters'
      })
  })

  // Contact validation schema
  private contactSchema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(100)
      .pattern(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name must not exceed 100 characters',
        'string.pattern.base': 'Name can only contain letters and spaces',
        'any.required': 'Name is required'
      }),
    email: Joi.string()
      .email()
      .max(255)
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'string.max': 'Email must not exceed 255 characters',
        'any.required': 'Email is required'
      }),
    phone: Joi.string()
      .pattern(/^[\+]?[1-9][\d]{0,15}$/)
      .max(20)
      .optional()
      .allow('')
      .messages({
        'string.pattern.base': 'Please provide a valid phone number',
        'string.max': 'Phone number must not exceed 20 characters'
      }),
    query: Joi.string()
      .min(10)
      .max(2000)
      .required()
      .messages({
        'string.min': 'Query must be at least 10 characters',
        'string.max': 'Query must not exceed 2000 characters',
        'any.required': 'Query is required'
      }),
    category: Joi.string()
      .valid('general', 'technical', 'billing', 'support')
      .default('general')
      .messages({
        'any.only': 'Category must be one of: general, technical, billing, support'
      })
  })

  // Admin validation schema
  private adminSchema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid admin email',
        'any.required': 'Admin email is required'
      }),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      })
  })

  // Validate waitlist data
  validateWaitlist(data: any, context?: ValidationContext): ValidationResult {
    try {
      const { error, value } = this.waitlistSchema.validate(data, {
        abortEarly: false,
        stripUnknown: true
      })

      if (error) {
        const errors = error.details.map(detail => detail.message)
        
        logSecurity('Invalid waitlist data submitted', 'medium', {
          ip: context?.ip,
          userAgent: context?.userAgent,
          requestId: context?.requestId,
          errors
        })

        return {
          isValid: false,
          errors
        }
      }

      return {
        isValid: true,
        data: value,
        errors: []
      }
    } catch (err) {
      logError('Validation error in waitlist', {
        error: err as Error,
        ip: context?.ip,
        requestId: context?.requestId
      })

      return {
        isValid: false,
        errors: ['Validation failed due to internal error']
      }
    }
  }

  // Validate contact data
  validateContact(data: any, context?: ValidationContext): ValidationResult {
    try {
      const { error, value } = this.contactSchema.validate(data, {
        abortEarly: false,
        stripUnknown: true
      })

      if (error) {
        const errors = error.details.map(detail => detail.message)
        
        logSecurity('Invalid contact data submitted', 'medium', {
          ip: context?.ip,
          userAgent: context?.userAgent,
          requestId: context?.requestId,
          errors
        })

        return {
          isValid: false,
          errors
        }
      }

      return {
        isValid: true,
        data: value,
        errors: []
      }
    } catch (err) {
      logError('Validation error in contact', {
        error: err as Error,
        ip: context?.ip,
        requestId: context?.requestId
      })

      return {
        isValid: false,
        errors: ['Validation failed due to internal error']
      }
    }
  }

  // Validate admin data
  validateAdmin(data: any, context?: ValidationContext): ValidationResult {
    try {
      const { error, value } = this.adminSchema.validate(data, {
        abortEarly: false,
        stripUnknown: true
      })

      if (error) {
        const errors = error.details.map(detail => detail.message)
        
        logSecurity('Invalid admin data submitted', 'high', {
          ip: context?.ip,
          userAgent: context?.userAgent,
          requestId: context?.requestId,
          errors
        })

        return {
          isValid: false,
          errors
        }
      }

      return {
        isValid: true,
        data: value,
        errors: []
      }
    } catch (err) {
      logError('Validation error in admin', {
        error: err as Error,
        ip: context?.ip,
        requestId: context?.requestId
      })

      return {
        isValid: false,
        errors: ['Validation failed due to internal error']
      }
    }
  }

  // Sanitize input data
  sanitizeInput(input: string): string {
    if (typeof input !== 'string') return input

    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .replace(/['"]/g, '') // Remove quotes
      .substring(0, 1000) // Limit length
  }

  // Validate email format
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) && email.length <= 255
  }

  // Validate phone format
  validatePhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone) && phone.length <= 20
  }

  // Check for potential SQL injection (for MongoDB, this is NoSQL injection)
  detectInjection(input: string): boolean {
    const dangerousPatterns = [
      /\$where/i,
      /\$ne/i,
      /\$gt/i,
      /\$lt/i,
      /\$regex/i,
      /\$exists/i,
      /\$in/i,
      /\$nin/i,
      /\$or/i,
      /\$and/i,
      /javascript:/i,
      /<script/i,
      /on\w+\s*=/i,
      /eval\s*\(/i,
      /function\s*\(/i
    ]

    return dangerousPatterns.some(pattern => pattern.test(input))
  }

  // Validate request size
  validateRequestSize(body: any, maxSize: number = 1048576): boolean {
    const bodySize = JSON.stringify(body).length
    return bodySize <= maxSize
  }

  // Validate rate limit data
  validateRateLimit(ip: string, userAgent?: string): boolean {
    // Basic IP validation
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
    
    return ipRegex.test(ip) || ipv6Regex.test(ip) || ip === 'unknown'
  }

  // Get validation schema for a specific type
  getSchema(type: 'waitlist' | 'contact' | 'admin') {
    switch (type) {
      case 'waitlist':
        return this.waitlistSchema
      case 'contact':
        return this.contactSchema
      case 'admin':
        return this.adminSchema
      default:
        throw new Error('Invalid schema type')
    }
  }
}

export const validationService = ValidationService.getInstance()

// Export convenience functions
export const validateWaitlist = (data: any, context?: ValidationContext) => 
  validationService.validateWaitlist(data, context)
export const validateContact = (data: any, context?: ValidationContext) => 
  validationService.validateContact(data, context)
export const validateAdmin = (data: any, context?: ValidationContext) => 
  validationService.validateAdmin(data, context)
export const sanitizeInput = (input: string) => validationService.sanitizeInput(input)
export const detectInjection = (input: string) => validationService.detectInjection(input)
export const validateRequestSize = (body: any, maxSize?: number) => 
  validationService.validateRequestSize(body, maxSize)
