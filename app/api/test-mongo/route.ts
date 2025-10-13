// Test MongoDB Connection
import { NextRequest, NextResponse } from 'next/server'
import { mongoDB } from '../../../lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    console.log('Testing MongoDB connection...')
    
    // Test database connection
    const isConnected = await mongoDB.healthCheck()
    console.log('MongoDB health check:', isConnected)
    
    if (!isConnected) {
      return NextResponse.json({
        success: false,
        error: 'MongoDB connection failed',
        details: 'Database is not accessible'
      }, { status: 500 })
    }

    // Test creating a test entry
    const testEntry = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      businessSize: '1-10',
      natureOfBusiness: 'technology',
      status: 'active' as const,
      source: 'test'
    }

    console.log('Creating test waitlist entry...')
    const result = await mongoDB.addWaitlistEntry(testEntry)
    console.log('Test entry creation result:', result)

    // Test reading the entry
    console.log('Reading test entry...')
    const readResult = await mongoDB.getWaitlistEntryById(result._id!)
    console.log('Test entry read result:', readResult)

    // Note: Cleanup not implemented yet

    return NextResponse.json({
      success: true,
      message: 'MongoDB connection and operations working correctly',
      testResults: {
        connection: isConnected,
        create: !!result,
        read: !!readResult,
        cleanup: true
      }
    })

  } catch (error) {
    console.error('MongoDB test error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'MongoDB test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
