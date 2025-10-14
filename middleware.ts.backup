import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const startTime = Date.now()
  const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  const path = request.nextUrl.pathname

  try {
    // Basic Security Headers (Edge Runtime compatible)
    const securityHeaders = {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-DNS-Prefetch-Control': 'off',
      'X-Download-Options': 'noopen',
      'X-Permitted-Cross-Domain-Policies': 'none'
    }

    // Basic CORS headers for API routes
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'http://localhost:4000',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true'
    }

    // Basic request validation
    if (path.startsWith('/api/')) {
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
        console.warn('Suspicious URL pattern detected:', path)
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

    // Add custom headers (Edge Runtime compatible)
    response.headers.set('X-Request-ID', Math.random().toString(36).substr(2, 9))
    response.headers.set('X-Response-Time', `${Date.now() - startTime}ms`)
    
    // Cache control for security
    if (path.startsWith('/api/')) {
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      response.headers.set('Pragma', 'no-cache')
      response.headers.set('Expires', '0')
    }

    return response

  } catch (error) {
    console.error('Middleware error:', error)
    
    return new NextResponse('Internal Server Error', { 
      status: 500,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      }
    })
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
