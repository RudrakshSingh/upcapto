// Debug endpoint to check environment and MongoDB
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const envVars = {
      MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set',
      MONGODB_DATABASE: process.env.MONGODB_DATABASE || 'Not set',
      NODE_ENV: process.env.NODE_ENV || 'Not set',
      PORT: process.env.PORT || 'Not set'
    }

    // Check if MongoDB URI is accessible
    const mongoUri = process.env.MONGODB_URI
    const hasMongoUri = !!mongoUri

    return NextResponse.json({
      success: true,
      environment: envVars,
      mongoUri: hasMongoUri ? 'Available' : 'Missing',
      timestamp: new Date().toISOString(),
      server: 'Running'
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
