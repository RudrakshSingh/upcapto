// Security Status API - Real-time Security Monitoring
import { NextRequest, NextResponse } from 'next/server'
import { enhancedSecurityService } from '../../../../lib/security-enhanced'
import crypto from 'crypto'

export async function GET(request: NextRequest) {
  const clientIP = enhancedSecurityService.getClientIP(request)
  const userAgent = request.headers.get('user-agent') || 'unknown'

  try {
    // Get security status
    const securityStatus = enhancedSecurityService.getSecurityStatus()
    const recentEvents = enhancedSecurityService.getSecurityEvents(50)
    
    // Calculate security metrics
    const now = Date.now()
    const lastHour = now - 3600000
    const last24Hours = now - 86400000
    
    const eventsLastHour = recentEvents.filter(event => event.timestamp > lastHour)
    const eventsLast24Hours = recentEvents.filter(event => event.timestamp > last24Hours)
    
    const eventTypes = {
      RATE_LIMIT: eventsLastHour.filter(e => e.type === 'RATE_LIMIT').length,
      SUSPICIOUS_ACTIVITY: eventsLastHour.filter(e => e.type === 'SUSPICIOUS_ACTIVITY').length,
      INVALID_INPUT: eventsLastHour.filter(e => e.type === 'INVALID_INPUT').length,
      BLOCKED_IP: eventsLastHour.filter(e => e.type === 'BLOCKED_IP').length
    }

    // Security recommendations
    const recommendations: string[] = []
    
    if (securityStatus.health === 'critical') {
      recommendations.push('CRITICAL: High security event volume detected')
    }
    
    if (eventTypes.RATE_LIMIT > 20) {
      recommendations.push('Consider tightening rate limits')
    }
    
    if (eventTypes.SUSPICIOUS_ACTIVITY > 10) {
      recommendations.push('Review suspicious activity patterns')
    }
    
    if (securityStatus.activeBlocks > 50) {
      recommendations.push('High number of blocked IPs - consider reviewing blocking rules')
    }

    const response = {
      status: 'operational',
      timestamp: new Date().toISOString(),
      security: {
        health: securityStatus.health,
        activeBlocks: securityStatus.activeBlocks,
        rateLimitEntries: securityStatus.rateLimitEntries,
        recentEvents: securityStatus.recentEvents
      },
      metrics: {
        eventsLastHour: eventsLastHour.length,
        eventsLast24Hours: eventsLast24Hours.length,
        eventTypes,
        topSuspiciousIPs: getTopSuspiciousIPs(recentEvents),
        topUserAgents: getTopUserAgents(recentEvents)
      },
      recommendations,
      version: '1.0.0'
    }

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-Request-ID': crypto.randomUUID(),
        'X-Security-Status': securityStatus.health
      }
    })

  } catch (error) {
    console.error('Security status error:', error)
    
    return NextResponse.json(
      { 
        status: 'error',
        error: 'Unable to retrieve security status',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// Helper functions
function getTopSuspiciousIPs(events: any[]): Array<{ip: string, count: number}> {
  const ipCounts: Record<string, number> = {}
  
  events.forEach(event => {
    if (event.type === 'SUSPICIOUS_ACTIVITY' || event.type === 'RATE_LIMIT') {
      ipCounts[event.ip] = (ipCounts[event.ip] || 0) + 1
    }
  })
  
  return Object.entries(ipCounts)
    .map(([ip, count]) => ({ ip, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
}

function getTopUserAgents(events: any[]): Array<{userAgent: string, count: number}> {
  const uaCounts: Record<string, number> = {}
  
  events.forEach(event => {
    if (event.userAgent && event.userAgent !== 'unknown') {
      uaCounts[event.userAgent] = (uaCounts[event.userAgent] || 0) + 1
    }
  })
  
  return Object.entries(uaCounts)
    .map(([userAgent, count]) => ({ userAgent, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
}
