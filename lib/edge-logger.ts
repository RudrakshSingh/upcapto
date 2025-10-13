// Simple logger for Edge Runtime (middleware)
// This logger doesn't use Node.js APIs and is compatible with Edge Runtime

export interface EdgeLogContext {
  ip?: string
  userAgent?: string
  requestId?: string
  error?: Error
  method?: string
  url?: string
  statusCode?: number
  responseTime?: number
}

export function logSecurity(message: string, level: 'low' | 'medium' | 'high', context: EdgeLogContext): void {
  const logData = {
    timestamp: new Date().toISOString(),
    level: 'security',
    message,
    severity: level,
    ...context
  }
  
  if (level === 'high') {
    console.error('🚨 SECURITY ALERT:', logData)
  } else if (level === 'medium') {
    console.warn('⚠️ SECURITY WARNING:', logData)
  } else {
    console.log('🔒 SECURITY LOG:', logData)
  }
}

export function logRequest(method: string, url: string, statusCode: number, responseTime: number, context: EdgeLogContext): void {
  const logData = {
    timestamp: new Date().toISOString(),
    level: 'request',
    method,
    url,
    statusCode,
    responseTime,
    ...context
  }
  
  console.log('📝 REQUEST:', logData)
}

export function logError(message: string, context: EdgeLogContext): void {
  const logData = {
    timestamp: new Date().toISOString(),
    level: 'error',
    message,
    ...context
  }
  
  console.error('❌ ERROR:', logData)
}
