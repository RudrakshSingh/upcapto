// Production logging service with Winston
import winston from 'winston'

export interface LogContext {
  userId?: string
  requestId?: string
  ip?: string
  userAgent?: string
  method?: string
  url?: string
  statusCode?: number
  responseTime?: number
  error?: Error
  metadata?: Record<string, any>
  type?: string
  operation?: string
  event?: string
  errors?: string[]
  duration?: number
  data?: Record<string, any>
  bodySize?: number
  email?: string
  dbHealth?: boolean
  envCheck?: Record<string, any>
  success?: boolean
  details?: string
}

class LoggerService {
  private static instance: LoggerService
  private logger: winston.Logger

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.prettyPrint()
      ),
      defaultMeta: {
        service: 'upcapto-api',
        environment: process.env.NODE_ENV || 'development'
      },
      transports: [
        // Console transport for development
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        }),
        // File transport for errors
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          maxsize: 5242880, // 5MB
          maxFiles: 5
        }),
        // File transport for all logs
        new winston.transports.File({
          filename: 'logs/combined.log',
          maxsize: 5242880, // 5MB
          maxFiles: 5
        })
      ],
      exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log' })
      ],
      rejectionHandlers: [
        new winston.transports.File({ filename: 'logs/rejections.log' })
      ]
    })

    // Add Sentry transport in production
    if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
      this.addSentryTransport()
    }
  }

  static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService()
    }
    return LoggerService.instance
  }

  private addSentryTransport(): void {
    // Sentry transport would be added here
    // This requires @sentry/winston package
    console.log('Sentry transport would be configured here')
  }

  private formatContext(context: LogContext = {}): Record<string, any> {
    return {
      ...context,
      timestamp: new Date().toISOString(),
      pid: process.pid,
      hostname: require('os').hostname()
    }
  }

  // Info logging
  info(message: string, context: LogContext = {}): void {
    this.logger.info(message, this.formatContext(context))
  }

  // Warning logging
  warn(message: string, context: LogContext = {}): void {
    this.logger.warn(message, this.formatContext(context))
  }

  // Error logging
  error(message: string, context: LogContext = {}): void {
    this.logger.error(message, this.formatContext(context))
  }

  // Debug logging
  debug(message: string, context: LogContext = {}): void {
    this.logger.debug(message, this.formatContext(context))
  }

  // HTTP request logging
  logRequest(method: string, url: string, statusCode: number, responseTime: number, context: LogContext = {}): void {
    this.info('HTTP Request', {
      ...context,
      method,
      url,
      statusCode,
      responseTime,
      type: 'http_request'
    })
  }

  // Database operation logging
  logDatabaseOperation(operation: string, collection: string, duration: number, success: boolean, context: LogContext = {}): void {
    const level = success ? 'info' : 'error'
    this.logger[level](`Database ${operation}`, {
      ...context,
      operation,
      collection,
      duration,
      success,
      type: 'database_operation'
    })
  }

  // Security event logging
  logSecurityEvent(event: string, severity: 'low' | 'medium' | 'high' | 'critical', context: LogContext = {}): void {
    const level = severity === 'critical' || severity === 'high' ? 'error' : 'warn'
    this.logger[level](`Security Event: ${event}`, {
      ...context,
      event,
      severity,
      type: 'security_event'
    })
  }

  // Performance logging
  logPerformance(operation: string, duration: number, context: LogContext = {}): void {
    this.info(`Performance: ${operation}`, {
      ...context,
      operation,
      duration,
      type: 'performance'
    })
  }

  // Business logic logging
  logBusinessEvent(event: string, data: Record<string, any>, context: LogContext = {}): void {
    this.info(`Business Event: ${event}`, {
      ...context,
      event,
      data,
      type: 'business_event'
    })
  }

  // API response logging
  logApiResponse(endpoint: string, statusCode: number, responseTime: number, context: LogContext = {}): void {
    const level = statusCode >= 400 ? 'error' : 'info'
    this.logger[level](`API Response: ${endpoint}`, {
      ...context,
      endpoint,
      statusCode,
      responseTime,
      type: 'api_response'
    })
  }

  // Get logger instance for custom usage
  getLogger(): winston.Logger {
    return this.logger
  }
}

export const logger = LoggerService.getInstance()

// Export convenience functions
export const logInfo = (message: string, context?: LogContext) => logger.info(message, context)
export const logWarn = (message: string, context?: LogContext) => logger.warn(message, context)
export const logError = (message: string, context?: LogContext) => logger.error(message, context)
export const logDebug = (message: string, context?: LogContext) => logger.debug(message, context)
export const logRequest = (method: string, url: string, statusCode: number, responseTime: number, context?: LogContext) => 
  logger.logRequest(method, url, statusCode, responseTime, context)
export const logDatabase = (operation: string, collection: string, duration: number, success: boolean, context?: LogContext) => 
  logger.logDatabaseOperation(operation, collection, duration, success, context)
export const logSecurity = (event: string, severity: 'low' | 'medium' | 'high' | 'critical', context?: LogContext) => 
  logger.logSecurityEvent(event, severity, context)
export const logPerformance = (operation: string, duration: number, context?: LogContext) => 
  logger.logPerformance(operation, duration, context)
export const logBusiness = (event: string, data: Record<string, any>, context?: LogContext) => 
  logger.logBusinessEvent(event, data, context)
export const logApi = (endpoint: string, statusCode: number, responseTime: number, context?: LogContext) => 
  logger.logApiResponse(endpoint, statusCode, responseTime, context)
