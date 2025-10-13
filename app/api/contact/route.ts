import { NextRequest, NextResponse } from 'next/server'
import { automationService } from '@/lib/automationTriggers'
import { mongoDB } from '@/lib/mongodb'
import { whatsappService } from '@/lib/whatsapp'
import { emailService } from '@/lib/email-service'
import { securityService } from '@/lib/security'
import { validateContact, sanitizeInput, detectInjection, validateRequestSize } from '@/lib/validation'
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

    const { name, email, phone, query, category } = body

    // Enhanced validation with context
    const validation = validateContact(body, {
      ip: clientIP,
      userAgent,
      requestId
    })

    if (!validation.isValid) {
      logSecurity('Invalid contact data', 'medium', {
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
    const hasInjection = [name, email, phone, query].some(field => 
      field && detectInjection(field)
    )

    if (hasInjection) {
      logSecurity('Injection attempt detected', 'high', {
        ip: clientIP,
        userAgent,
        requestId,
        data: { name, email, phone, query: query?.substring(0, 100) }
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
      phone: phone ? sanitizeInput(phone) : '',
      query: sanitizeInput(query),
      category: category || 'general'
    }

    // Create contact entry with MongoDB
    const contactEntry = await mongoDB.addContactEntry({
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      query: sanitizedData.query,
      category: sanitizedData.category,
      status: 'new',
      source: 'website'
    })

    logBusiness('Contact query submitted', {
      email: sanitizedData.email,
      name: sanitizedData.name,
      category: sanitizedData.category,
      queryLength: sanitizedData.query.length
    }, {
      ip: clientIP,
      userAgent,
      requestId
    })

    // Send acknowledgment email (async, don't block)
    emailService.sendContactAcknowledgment({
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone
    }).catch(emailError => {
      logError('Contact acknowledgment email failed', {
        error: emailError,
        email: sanitizedData.email,
        ip: clientIP,
        requestId
      })
    })

    // Trigger automation (async, don't block)
    automationService.handleQuery({
      customerEmail: sanitizedData.email,
      customerName: sanitizedData.name,
      customerPhone: sanitizedData.phone,
      query: sanitizedData.query,
      category: sanitizedData.category,
      priority: 'medium'
    }).catch(automationError => {
      logError('Contact automation failed', {
        error: automationError,
        email: sanitizedData.email,
        ip: clientIP,
        requestId
      })
    })

    // Send WhatsApp notification (async, don't block)
    whatsappService.sendNotification({
      type: 'contact',
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone || 'Not provided',
      query: sanitizedData.query,
      category: sanitizedData.category
    }).catch(whatsappError => {
      logError('WhatsApp notification failed', {
        error: whatsappError,
        email: sanitizedData.email,
        ip: clientIP,
        requestId
      })
    })

    const responseTime = Date.now() - startTime
    logRequest('POST', '/api/contact', 200, responseTime, {
      ip: clientIP,
      userAgent,
      requestId
    })

    return NextResponse.json({
      success: true,
      message: 'Query submitted successfully! We\'ll get back to you within 24 hours.',
      data: {
        id: contactEntry._id,
        email: contactEntry.email,
        name: contactEntry.name,
        category: contactEntry.category
      }
    })

  } catch (error) {
    const responseTime = Date.now() - startTime
    
    logError('Contact submission error', {
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

