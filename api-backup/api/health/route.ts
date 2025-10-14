import { NextRequest, NextResponse } from 'next/server'
import { mongoDB } from '@/lib/mongodb'
import { logInfo, logError, logRequest } from '@/lib/logger'

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  const requestId = Math.random().toString(36).substr(2, 9)
  const clientIP = request.headers.get('x-forwarded-for') || 'unknown'

  try {
    // Check database health
    const dbHealth = await mongoDB.healthCheck()
    
    // Check environment variables
    const envCheck = {
      mongodb: !!process.env.MONGODB_URI,
      sendgrid: !!process.env.SENDGRID_API_KEY,
      whatsapp: !!process.env.WHATSAPP_ACCESS_TOKEN,
      nodeEnv: process.env.NODE_ENV
    }

    // Overall health status
    const isHealthy = dbHealth && envCheck.mongodb

    const responseTime = Date.now() - startTime
    const status = isHealthy ? 200 : 503

    logRequest('GET', '/api/health', status, responseTime, {
      ip: clientIP,
      requestId,
      dbHealth,
      envCheck
    })

    return NextResponse.json({
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV,
      services: {
        database: dbHealth ? 'connected' : 'disconnected',
        mongodb: envCheck.mongodb ? 'configured' : 'not configured',
        sendgrid: envCheck.sendgrid ? 'configured' : 'not configured',
        whatsapp: envCheck.whatsapp ? 'configured' : 'not configured'
      },
      responseTime
    }, { status })

  } catch (error) {
    const responseTime = Date.now() - startTime
    
    logError('Health check failed', {
      error: error as Error,
      ip: clientIP,
      requestId,
      responseTime
    })

    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      responseTime
    }, { status: 503 })
  }
}
