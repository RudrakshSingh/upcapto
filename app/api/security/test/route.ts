// Security Testing API - Run Security Tests
import { NextRequest, NextResponse } from 'next/server'
import { securityTestSuite } from '../../../../lib/security-tests'
import { enhancedSecurityService } from '../../../../lib/security-enhanced'
import crypto from 'crypto'

export async function GET(request: NextRequest) {
  const clientIP = enhancedSecurityService.getClientIP(request)
  const userAgent = request.headers.get('user-agent') || 'unknown'
  const { searchParams } = new URL(request.url)
  const testName = searchParams.get('test')

  try {
    // Check if specific test requested
    if (testName) {
      const test = await securityTestSuite.runTestByName(testName)
      if (!test) {
        return NextResponse.json(
          { error: 'Test not found' },
          { status: 404 }
        )
      }

      const result = await test.test()
      return NextResponse.json({
        test: testName,
        result,
        severity: test.severity,
        timestamp: new Date().toISOString()
      })
    }

    // Run all tests
    const testResults = await securityTestSuite.runAllTests()
    
    // Log security test run
    enhancedSecurityService.logSecurityEvent({
      type: 'SUSPICIOUS_ACTIVITY',
      ip: clientIP,
      userAgent,
      timestamp: Date.now(),
      details: { 
        action: 'security_test_run',
        results: testResults
      }
    })

    return NextResponse.json({
      ...testResults,
      timestamp: new Date().toISOString(),
      recommendations: generateSecurityRecommendations(testResults)
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-Request-ID': crypto.randomUUID(),
        'X-Security-Score': testResults.securityScore.toString()
      }
    })

  } catch (error) {
    console.error('Security test error:', error)
    
    return NextResponse.json(
      { 
        error: 'Security test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// POST method to run specific security tests
export async function POST(request: NextRequest) {
  const clientIP = enhancedSecurityService.getClientIP(request)
  const userAgent = request.headers.get('user-agent') || 'unknown'

  try {
    const body = await request.json()
    const { tests, severity } = body

    let testResults
    
    if (tests && Array.isArray(tests)) {
      // Run specific tests
      const results = []
      for (const testName of tests) {
        const test = await securityTestSuite.runTestByName(testName)
        if (test) {
          const result = await test.test()
          results.push({
            name: testName,
            result,
            severity: test.severity
          })
        }
      }
      testResults = {
        total: tests.length,
        passed: results.filter(r => r.result.passed).length,
        failed: results.filter(r => !r.result.passed).length,
        results
      }
    } else if (severity) {
      // Run tests by severity
      const allTests = securityTestSuite.getAvailableTests()
      const filteredTests = allTests.filter(t => t.severity === severity)
      
      const results = []
      for (const test of filteredTests) {
        const testResult = await securityTestSuite.runTestByName(test.name)
        if (testResult) {
          const result = await testResult.test()
          results.push({
            name: test.name,
            result,
            severity: test.severity
          })
        }
      }
      
      testResults = {
        total: filteredTests.length,
        passed: results.filter(r => r.result.passed).length,
        failed: results.filter(r => !r.result.passed).length,
        results
      }
    } else {
      // Run all tests
      testResults = await securityTestSuite.runAllTests()
    }

    return NextResponse.json({
      ...testResults,
      timestamp: new Date().toISOString(),
      recommendations: generateSecurityRecommendations(testResults)
    })

  } catch (error) {
    console.error('Security test POST error:', error)
    
    return NextResponse.json(
      { 
        error: 'Security test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

function generateSecurityRecommendations(testResults: any): string[] {
  const recommendations: string[] = []
  
  if (testResults.securityScore < 80) {
    recommendations.push('CRITICAL: Security score below 80% - immediate attention required')
  }
  
  if (testResults.securityScore < 90) {
    recommendations.push('WARNING: Security score below 90% - review failed tests')
  }
  
  const failedTests = testResults.results?.filter((r: any) => !r.passed) || []
  const criticalFailures = failedTests.filter((r: any) => r.severity === 'critical')
  
  if (criticalFailures.length > 0) {
    recommendations.push(`CRITICAL: ${criticalFailures.length} critical security tests failed`)
  }
  
  const highFailures = failedTests.filter((r: any) => r.severity === 'high')
  if (highFailures.length > 0) {
    recommendations.push(`HIGH: ${highFailures.length} high-priority security tests failed`)
  }
  
  if (testResults.securityScore === 100) {
    recommendations.push('EXCELLENT: All security tests passed - system is secure')
  }
  
  return recommendations
}
