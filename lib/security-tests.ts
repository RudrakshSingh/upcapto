// Security Testing Suite - Automated Vulnerability Testing
import { enhancedSecurityService } from './security-enhanced'

export interface SecurityTest {
  name: string
  description: string
  test: () => Promise<{ passed: boolean; details: string }>
  severity: 'low' | 'medium' | 'high' | 'critical'
}

export class SecurityTestSuite {
  private tests: SecurityTest[] = []

  constructor() {
    this.initializeTests()
  }

  private initializeTests() {
    // XSS Protection Tests
    this.tests.push({
      name: 'XSS Script Injection',
      description: 'Test protection against script injection attacks',
      severity: 'high',
      test: async () => {
        const maliciousInput = '<script>alert("XSS")</script>'
        const result = enhancedSecurityService.validateAndSanitize(
          { test: maliciousInput }, 
          'test'
        )
        return {
          passed: !result.sanitized.test.includes('<script>'),
          details: result.sanitized.test
        }
      }
    })

    // SQL Injection Tests
    this.tests.push({
      name: 'SQL Injection Protection',
      description: 'Test protection against SQL injection attacks',
      severity: 'critical',
      test: async () => {
        const maliciousInput = "'; DROP TABLE users; --"
        const result = enhancedSecurityService.validateAndSanitize(
          { test: maliciousInput }, 
          'test'
        )
        return {
          passed: !result.sanitized.test.includes('DROP TABLE'),
          details: result.sanitized.test
        }
      }
    })

    // Rate Limiting Tests
    this.tests.push({
      name: 'Rate Limiting',
      description: 'Test rate limiting functionality',
      severity: 'medium',
      test: async () => {
        const testIP = '192.168.1.100'
        const config = { max: 5, windowMs: 60000, blockDuration: 300000 }
        
        // Simulate multiple requests
        for (let i = 0; i < 6; i++) {
          const result = enhancedSecurityService.isRateLimited(testIP, config)
          if (i >= 5 && !result.blocked) {
            return { passed: false, details: 'Rate limiting not working' }
          }
        }
        
        return { passed: true, details: 'Rate limiting working correctly' }
      }
    })

    // Input Validation Tests
    this.tests.push({
      name: 'Email Validation',
      description: 'Test email validation against malicious inputs',
      severity: 'medium',
      test: async () => {
        const maliciousEmails = [
          'test@evil.com<script>alert("xss")</script>',
          'test@evil.com"onclick="alert(1)',
          'test@evil.com\'; DROP TABLE users; --'
        ]
        
        for (const email of maliciousEmails) {
          const isValid = enhancedSecurityService.validateEmail(email)
          if (isValid) {
            return { passed: false, details: `Malicious email passed validation: ${email}` }
          }
        }
        
        return { passed: true, details: 'Email validation working correctly' }
      }
    })

    // Suspicious Pattern Detection
    this.tests.push({
      name: 'Suspicious Pattern Detection',
      description: 'Test detection of suspicious patterns',
      severity: 'high',
      test: async () => {
        const suspiciousInputs = [
          'javascript:alert("xss")',
          'onclick="alert(1)"',
          'eval(atob("YWxlcnQoMSk="))',
          'document.cookie',
          'window.location="http://evil.com"'
        ]
        
        for (const input of suspiciousInputs) {
          const result = enhancedSecurityService.validateAndSanitize(
            { test: input }, 
            'test'
          )
          if (result.isValid) {
            return { passed: false, details: `Suspicious pattern not detected: ${input}` }
          }
        }
        
        return { passed: true, details: 'Suspicious pattern detection working' }
      }
    })

    // Data Sanitization
    this.tests.push({
      name: 'Data Sanitization',
      description: 'Test data sanitization effectiveness',
      severity: 'medium',
      test: async () => {
        const maliciousInput = '<img src="x" onerror="alert(1)">'
        const result = enhancedSecurityService.validateAndSanitize(
          { test: maliciousInput }, 
          'test'
        )
        
        const sanitized = result.sanitized.test
        const hasHtmlTags = /<[^>]*>/.test(sanitized)
        const hasEventHandlers = /on\w+=/i.test(sanitized)
        
        return {
          passed: !hasHtmlTags && !hasEventHandlers,
          details: `Sanitized: ${sanitized}`
        }
      }
    })

    // IP Blocking Tests
    this.tests.push({
      name: 'IP Blocking',
      description: 'Test IP blocking functionality',
      severity: 'high',
      test: async () => {
        const testIP = '192.168.1.200'
        
        // Block IP
        enhancedSecurityService.blockIP(testIP, 'Test block', 60000)
        
        // Check if blocked
        const isBlocked = enhancedSecurityService.isIPBlocked(testIP)
        
        return {
          passed: isBlocked,
          details: isBlocked ? 'IP blocking working' : 'IP blocking failed'
        }
      }
    })

    // Encryption Tests
    this.tests.push({
      name: 'Data Encryption',
      description: 'Test data encryption functionality',
      severity: 'high',
      test: async () => {
        const testData = 'sensitive information'
        const secretKey = 'test-secret-key-32-chars-long'
        
        const encrypted = enhancedSecurityService.encryptData(testData, secretKey)
        const decrypted = enhancedSecurityService.decryptData(encrypted, secretKey)
        
        return {
          passed: decrypted === testData,
          details: `Encrypted: ${encrypted.substring(0, 20)}...`
        }
      }
    })
  }

  async runAllTests(): Promise<{
    total: number
    passed: number
    failed: number
    results: Array<{
      name: string
      passed: boolean
      details: string
      severity: string
    }>
    securityScore: number
  }> {
    const results = []
    let passed = 0
    let failed = 0

    for (const test of this.tests) {
      try {
        const result = await test.test()
        results.push({
          name: test.name,
          passed: result.passed,
          details: result.details,
          severity: test.severity
        })

        if (result.passed) {
          passed++
        } else {
          failed++
        }
      } catch (error) {
        results.push({
          name: test.name,
          passed: false,
          details: `Test error: ${error}`,
          severity: test.severity
        })
        failed++
      }
    }

    const securityScore = Math.round((passed / this.tests.length) * 100)

    return {
      total: this.tests.length,
      passed,
      failed,
      results,
      securityScore
    }
  }

  async runTestByName(name: string): Promise<SecurityTest | null> {
    const test = this.tests.find(t => t.name === name)
    if (!test) return null

    try {
      const result = await test.test()
      return {
        ...test,
        test: async () => result
      }
    } catch (error) {
      return {
        ...test,
        test: async () => ({ passed: false, details: `Error: ${error}` })
      }
    }
  }

  getAvailableTests(): Array<{ name: string; description: string; severity: string }> {
    return this.tests.map(test => ({
      name: test.name,
      description: test.description,
      severity: test.severity
    }))
  }
}

export const securityTestSuite = new SecurityTestSuite()
