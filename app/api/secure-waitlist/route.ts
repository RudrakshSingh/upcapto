// Enhanced Secure Waitlist API - Bulletproof Implementation
import { NextRequest, NextResponse } from 'next/server'
import { enhancedSecurityService, securityConfig } from '../../../lib/security-enhanced'
import { mongoDB } from '../../../lib/mongodb'
import { randomUUID } from 'crypto'

// Enhanced validation schema
const validateWaitlistData = (data: any) => {
  const errors: string[] = []
  
  // Required fields
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required')
  }
  
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required')
  }
  
  if (!data.phone || typeof data.phone !== 'string') {
    errors.push('Phone is required')
  }
  
  if (!data.businessSize || typeof data.businessSize !== 'string') {
    errors.push('Business size is required')
  }
  
  if (!data.natureOfBusiness || typeof data.natureOfBusiness !== 'string') {
    errors.push('Nature of business is required')
  }

  // Validate business size
  const validBusinessSizes = ['1-10', '11-20', '21-50', '51-100', '100+']
  if (data.businessSize && !validBusinessSizes.includes(data.businessSize)) {
    errors.push('Invalid business size')
  }

  // Validate nature of business
  const validBusinessTypes = [
    'retail', 'restaurant', 'healthcare', 'education', 'finance',
    'real-estate', 'manufacturing', 'logistics', 'technology', 'consulting',
    'hospitality', 'automotive', 'beauty', 'fitness', 'entertainment',
    'agriculture', 'construction', 'legal', 'marketing', 'non-profit', 'other'
  ]
  if (data.natureOfBusiness && !validBusinessTypes.includes(data.natureOfBusiness)) {
    errors.push('Invalid nature of business')
  }

  return errors
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const clientIP = enhancedSecurityService.getClientIP(request)
  const userAgent = request.headers.get('user-agent') || 'unknown'

  try {
    // Parse and validate request body
    const body = await request.json()
    
    // Enhanced input validation and sanitization
    const validation = enhancedSecurityService.validateAndSanitize(body, 'waitlist')
    if (!validation.isValid) {
      enhancedSecurityService.logSecurityEvent({
        type: 'INVALID_INPUT',
        ip: clientIP,
        userAgent,
        timestamp: Date.now(),
        details: { errors: validation.errors, path: '/api/secure-waitlist' }
      })

      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid input data',
          details: validation.errors 
        },
        { status: 400 }
      )
    }

    // Additional business logic validation
    const businessErrors = validateWaitlistData(validation.sanitized)
    if (businessErrors.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: businessErrors 
        },
        { status: 400 }
      )
    }

    // Note: Duplicate email check would require a custom query
    // For now, we'll proceed with creating the entry

    // Create secure entry with additional metadata
    const secureEntry = {
      ...validation.sanitized,
      id: randomUUID(),
      ipAddress: clientIP,
      userAgent: userAgent.substring(0, 500), // Limit length
      timestamp: new Date(),
      source: 'website',
      status: 'active',
      verificationToken: randomUUID(),
      securityHash: randomUUID()
    }

    // Save to database
    const result = await mongoDB.addWaitlistEntry(secureEntry)

    // Log successful registration
    console.log(`Waitlist registration successful: ${validation.sanitized.email} from ${clientIP}`)

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist',
      id: secureEntry.id,
      timestamp: secureEntry.timestamp
    }, {
      status: 201,
      headers: {
        'X-Response-Time': `${Date.now() - startTime}ms`,
        'X-Request-ID': randomUUID()
      }
    })

  } catch (error) {
    console.error('Waitlist registration error:', error)
    
    // Log security event for errors
    enhancedSecurityService.logSecurityEvent({
      type: 'SUSPICIOUS_ACTIVITY',
      ip: clientIP,
      userAgent,
      timestamp: Date.now(),
      details: { 
        error: error instanceof Error ? error.message : 'Unknown error',
        path: '/api/secure-waitlist'
      }
    })

    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Unable to process request at this time' 
      },
      { status: 500 }
    )
  }
}

// GET method for health check
export async function GET(request: NextRequest) {
  const clientIP = enhancedSecurityService.getClientIP(request)
  
  // Security status check
  const securityStatus = enhancedSecurityService.getSecurityStatus()
  
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    security: securityStatus,
    version: '1.0.0'
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-Request-ID': crypto.randomUUID()
    }
  })
}
