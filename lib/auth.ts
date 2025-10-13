// Production authentication and authorization service
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { logSecurity, logError } from './logger'

export interface User {
  id: string
  email: string
  role: 'admin' | 'user'
  isActive: boolean
  createdAt: Date
  lastLogin?: Date
}

export interface AuthToken {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  role?: 'admin' | 'user'
}

class AuthService {
  private static instance: AuthService
  private jwtSecret: string
  private refreshSecret: string
  private accessTokenExpiry: string
  private refreshTokenExpiry: string

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key'
    this.refreshSecret = process.env.REFRESH_SECRET || 'fallback-refresh-secret'
    this.accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || '15m'
    this.refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY || '7d'
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  // Hash password
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12
    return await bcrypt.hash(password, saltRounds)
  }

  // Verify password
  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }

  // Generate access token
  generateAccessToken(user: User): string {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      type: 'access'
    }

    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.accessTokenExpiry,
      issuer: 'upcapto-api',
      audience: 'upcapto-client'
    } as jwt.SignOptions)
  }

  // Generate refresh token
  generateRefreshToken(user: User): string {
    const payload = {
      userId: user.id,
      email: user.email,
      type: 'refresh'
    }

    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshTokenExpiry,
      issuer: 'upcapto-api',
      audience: 'upcapto-client'
    } as jwt.SignOptions)
  }

  // Generate token pair
  generateTokens(user: User): AuthToken {
    const accessToken = this.generateAccessToken(user)
    const refreshToken = this.generateRefreshToken(user)
    
    // Calculate expiry time
    const expiresIn = this.parseExpiry(this.accessTokenExpiry)

    return {
      accessToken,
      refreshToken,
      expiresIn
    }
  }

  // Verify access token
  verifyAccessToken(token: string): { valid: boolean; payload?: any; error?: string } {
    try {
      const payload = jwt.verify(token, this.jwtSecret, {
        issuer: 'upcapto-api',
        audience: 'upcapto-client'
      }) as any

      if (payload.type !== 'access') {
        return { valid: false, error: 'Invalid token type' }
      }

      return { valid: true, payload }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return { valid: false, error: 'Token expired' }
      } else if (error instanceof jwt.JsonWebTokenError) {
        return { valid: false, error: 'Invalid token' }
      }
      return { valid: false, error: 'Token verification failed' }
    }
  }

  // Verify refresh token
  verifyRefreshToken(token: string): { valid: boolean; payload?: any; error?: string } {
    try {
      const payload = jwt.verify(token, this.refreshSecret, {
        issuer: 'upcapto-api',
        audience: 'upcapto-client'
      }) as any

      if (payload.type !== 'refresh') {
        return { valid: false, error: 'Invalid token type' }
      }

      return { valid: true, payload }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return { valid: false, error: 'Refresh token expired' }
      } else if (error instanceof jwt.JsonWebTokenError) {
        return { valid: false, error: 'Invalid refresh token' }
      }
      return { valid: false, error: 'Refresh token verification failed' }
    }
  }

  // Extract token from Authorization header
  extractToken(authHeader: string | null): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }
    return authHeader.substring(7)
  }

  // Validate user permissions
  validatePermission(userRole: string, requiredRole: string): boolean {
    const roleHierarchy = {
      'user': 1,
      'admin': 2
    }

    const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0
    const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0

    return userLevel >= requiredLevel
  }

  // Check if user has admin access
  isAdmin(userRole: string): boolean {
    return userRole === 'admin'
  }

  // Parse expiry string to seconds
  private parseExpiry(expiry: string): number {
    const match = expiry.match(/^(\d+)([smhd])$/)
    if (!match) return 900 // Default 15 minutes

    const value = parseInt(match[1])
    const unit = match[2]

    switch (unit) {
      case 's': return value
      case 'm': return value * 60
      case 'h': return value * 60 * 60
      case 'd': return value * 60 * 60 * 24
      default: return 900
    }
  }

  // Log authentication events
  logAuthEvent(event: string, userId: string, ip: string, success: boolean, details?: any): void {
    const severity = success ? 'low' : 'medium'
    logSecurity(`Auth: ${event}`, severity, {
      userId,
      ip,
      success,
      event,
      details
    })
  }

  // Generate secure random string
  generateSecureToken(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  // Validate email format
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validate password strength
  validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number')
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character')
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }
}

export const authService = AuthService.getInstance()

// Export convenience functions
export const hashPassword = (password: string) => authService.hashPassword(password)
export const verifyPassword = (password: string, hashed: string) => authService.verifyPassword(password, hashed)
export const generateTokens = (user: User) => authService.generateTokens(user)
export const verifyAccessToken = (token: string) => authService.verifyAccessToken(token)
export const verifyRefreshToken = (token: string) => authService.verifyRefreshToken(token)
export const extractToken = (header: string | null) => authService.extractToken(header)
export const validatePermission = (userRole: string, requiredRole: string) => authService.validatePermission(userRole, requiredRole)
export const isAdmin = (userRole: string) => authService.isAdmin(userRole)
export const isValidEmail = (email: string) => authService.isValidEmail(email)
export const validatePasswordStrength = (password: string) => authService.validatePasswordStrength(password)
