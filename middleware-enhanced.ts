// Enhanced Security Middleware - Bulletproof Implementation
import { NextRequest, NextResponse } from 'next/server'
import { enhancedSecurityService, securityConfig } from './lib/security-enhanced'

export async function middleware(request: NextRequest) {
  const startTime = Date.now()
  const clientIP = enhancedSecurityService.getClientIP(request)
  const userAgent = request.headers.get('user-agent') || 'unknown'
  const path = request.nextUrl.pathname

  // Security Headers
  const securityHeaders = enhancedSecurityService.getSecurityHeaders()
  const corsHeaders = enhancedSecurityService.getCORSHeaders(securityConfig.cors)

  // Request Validation
  const requestValidation = enhancedSecurityService.validateRequest(request)
  if (!requestValidation.isValid) {
    enhancedSecurityService.logSecurityEvent({
      type: 'SUSPICIOUS_ACTIVITY',
      ip: clientIP,
      userAgent,
      timestamp: Date.now(),
      details: { reason: requestValidation.reason, path }
    })
    
    return new NextResponse('Invalid Request', { 
      status: 400,
      headers: securityHeaders
    })
  }

  // Rate Limiting
  const rateLimitCheck = enhancedSecurityService.isRateLimited(clientIP, securityConfig.rateLimit)
  if (rateLimitCheck.blocked) {
    enhancedSecurityService.logSecurityEvent({
      type: 'RATE_LIMIT',
      ip: clientIP,
      userAgent,
      timestamp: Date.now(),
      details: { reason: rateLimitCheck.reason, path }
    })

    return new NextResponse('Too Many Requests', { 
      status: 429,
      headers: {
        ...securityHeaders,
        'Retry-After': '900' // 15 minutes
      }
    })
  }

  // API Route Protection
  if (path.startsWith('/api/')) {
    // Additional API security checks
    const contentType = request.headers.get('content-type')
    const contentLength = request.headers.get('content-length')
    
    // Check content length
    if (contentLength && parseInt(contentLength) > 1024 * 1024) { // 1MB limit
      return new NextResponse('Payload Too Large', { 
        status: 413,
        headers: securityHeaders
      })
    }

    // Check for suspicious patterns in URL
    const suspiciousPatterns = [
      /\.\./, // Directory traversal
      /<script/i, // XSS attempts
      /javascript:/i,
      /on\w+=/i,
      /union\s+select/i, // SQL injection
      /drop\s+table/i,
      /exec\s*\(/i,
      /system\s*\(/i
    ]

    if (suspiciousPatterns.some(pattern => pattern.test(path))) {
      enhancedSecurityService.logSecurityEvent({
        type: 'SUSPICIOUS_ACTIVITY',
        ip: clientIP,
        userAgent,
        timestamp: Date.now(),
        details: { reason: 'Suspicious URL pattern', path }
      })

      return new NextResponse('Forbidden', { 
        status: 403,
        headers: securityHeaders
      })
    }
  }

  // Create response with security headers
  const response = NextResponse.next()
  
  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Apply CORS headers for API routes
  if (path.startsWith('/api/')) {
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
  }

  // Add custom security headers
  response.headers.set('X-Request-ID', crypto.randomUUID())
  response.headers.set('X-Response-Time', `${Date.now() - startTime}ms`)
  
  // Cache control for security
  if (path.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
