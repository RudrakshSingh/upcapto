import { NextRequest, NextResponse } from 'next/server'
import { mongoDB } from '@/lib/mongodb'
import { securityService } from '@/lib/security'
import { logInfo, logError, logSecurity, logRequest } from '@/lib/logger'

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  const requestId = Math.random().toString(36).substr(2, 9)
  const clientIP = securityService.getClientIP(request)
  const userAgent = request.headers.get('user-agent') || 'unknown'

  try {
    // Basic security check (in production, add proper authentication)
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logSecurity('Unauthorized admin access attempt', 'high', {
        ip: clientIP,
        userAgent,
        requestId
      })
      
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Rate limiting for admin endpoints
    const isRateLimited = securityService.isRateLimited(clientIP, {
      max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000')
    })

    if (isRateLimited) {
      logSecurity('Admin rate limit exceeded', 'medium', {
        ip: clientIP,
        userAgent,
        requestId
      })
      
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '100')
    const skip = parseInt(searchParams.get('skip') || '0')

    // Validate parameters
    if (limit > 1000 || limit < 1) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 1000' },
        { status: 400 }
      )
    }

    if (skip < 0) {
      return NextResponse.json(
        { error: 'Skip must be non-negative' },
        { status: 400 }
      )
    }

    // Get contact entries from MongoDB
    const entries = await mongoDB.getContactEntries(limit, skip)
    const stats = await mongoDB.getDatabaseStats()

    const responseTime = Date.now() - startTime
    logRequest('GET', '/api/admin/contacts', 200, responseTime, {
      ip: clientIP,
      userAgent,
      requestId
    })

    return NextResponse.json({
      success: true,
      entries,
      stats: stats.contacts,
      pagination: {
        limit,
        skip,
        total: stats.contacts.total
      }
    })

  } catch (error) {
    const responseTime = Date.now() - startTime
    
    logError('Admin contacts fetch error', {
      error: error as Error,
      ip: clientIP,
      userAgent,
      requestId,
      responseTime
    })

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}