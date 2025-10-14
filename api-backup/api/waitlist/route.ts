import { NextRequest, NextResponse } from 'next/server'
import { automationService } from '@/lib/automationTriggers'
import { mongoDB } from '@/lib/mongodb'
import { whatsappService } from '@/lib/whatsapp'
import { emailService } from '@/lib/email-service'
import { securityService } from '@/lib/security'
import { validateWaitlist, sanitizeInput, detectInjection, validateRequestSize } from '@/lib/validation'
import { logInfo, logError, logSecurity, logRequest, logBusiness } from '@/lib/logger'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const requestId = Math.random().toString(36).substr(2, 9)
  const clientIP = securityService.getClientIP(request)
  const userAgent = request.headers.get('user-agent') || 'unknown'

  try {
    // Security: Rate limiting
    const isRateLimited = securityService.isRateLimited(clientIP, {
      max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000')
    })

    if (isRateLimited) {
      logSecurity('Rate limit exceeded', 'medium', {
        ip: clientIP,
        userAgent,
        requestId
      })
      
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    
    // Validate request size
    if (!validateRequestSize(body, parseInt(process.env.MAX_REQUEST_SIZE || '1048576'))) {
      logSecurity('Request too large', 'medium', {
        ip: clientIP,
        userAgent,
        requestId,
        bodySize: JSON.stringify(body).length
      })
      
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 }
      )
    }

    const { name, email, phone } = body

    // Enhanced validation with context
    const validation = validateWaitlist(body, {
      ip: clientIP,
      userAgent,
      requestId
    })

    if (!validation.isValid) {
      logSecurity('Invalid waitlist data', 'medium', {
        ip: clientIP,
        userAgent,
        requestId,
        errors: validation.errors
      })
      
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      )
    }

    // Check for injection attempts
    const hasInjection = [name, email, phone].some(field => 
      field && detectInjection(field)
    )

    if (hasInjection) {
      logSecurity('Injection attempt detected', 'high', {
        ip: clientIP,
        userAgent,
        requestId,
        data: { name, email, phone }
      })
      
      return NextResponse.json(
        { error: 'Invalid input detected' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : ''
    }

    // Create waitlist entry with MongoDB
    const waitlistEntry = await mongoDB.addWaitlistEntry({
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      status: 'active',
      source: 'website'
    })

    logBusiness('Waitlist signup', {
      email: sanitizedData.email,
      name: sanitizedData.name,
      hasPhone: !!sanitizedData.phone
    }, {
      ip: clientIP,
      userAgent,
      requestId
    })

    // Send welcome email (async, don't block)
    emailService.sendWelcomeEmail({
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone
    }).catch(emailError => {
      logError('Email sending failed', {
        error: emailError as Error,
        email: sanitizedData.email,
        ip: clientIP,
        requestId
      })
    })

    // Trigger automation (async, don't block)
    automationService.handleSignup({
      email: sanitizedData.email,
      firstName: sanitizedData.name.split(' ')[0] || sanitizedData.name,
      lastName: sanitizedData.name.split(' ').slice(1).join(' ') || undefined,
      phone: sanitizedData.phone
    }).catch(automationError => {
      logError('Automation failed', {
        error: automationError as Error,
        email: sanitizedData.email,
        ip: clientIP,
        requestId
      })
    })

    // Send WhatsApp notification (async, don't block)
    whatsappService.sendNotification({
      type: 'waitlist',
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone || 'Not provided'
    }).catch(whatsappError => {
      logError('WhatsApp notification failed', {
        error: whatsappError as Error,
        email: sanitizedData.email,
        ip: clientIP,
        requestId
      })
    })

    const responseTime = Date.now() - startTime
    logRequest('POST', '/api/waitlist', 200, responseTime, {
      ip: clientIP,
      userAgent,
      requestId
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully joined waitlist!',
      data: {
        id: waitlistEntry._id,
        email: waitlistEntry.email,
        name: waitlistEntry.name
      }
    })

  } catch (error) {
    const responseTime = Date.now() - startTime
    
    logError('Waitlist submission error', {
      error: error as Error,
      ip: clientIP,
      userAgent,
      requestId,
      responseTime
    })

    // Don't expose internal errors to client
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

