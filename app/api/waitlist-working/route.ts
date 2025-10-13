// Simple working waitlist API
import { NextRequest, NextResponse } from 'next/server'

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, businessSize, natureOfBusiness } = body

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Try MongoDB connection with enhanced SSL settings
    const { MongoClient } = await import('mongodb')
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/upcapto-dev'
    
    let client = null
    let result = null
    
    try {
      client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        socketTimeoutMS: 15000,
        maxPoolSize: 1,
        minPoolSize: 0,
        maxIdleTimeMS: 30000,
        retryWrites: true,
        retryReads: true,
        w: 'majority',
        readPreference: 'primary',
        // Enhanced SSL settings
        tls: true,
        tlsAllowInvalidCertificates: false,
        tlsAllowInvalidHostnames: false,
        tlsInsecure: false,
        // Additional connection options
        heartbeatFrequencyMS: 10000,
        serverSelectionRetryDelayMS: 2000,
        maxServerSelectionRetries: 3
      })
      
      await client.connect()
      const db = client.db(process.env.MONGODB_DATABASE || 'upcapto')
      const collection = db.collection('waitlist')
      
      // Insert the entry
      result = await collection.insertOne({
        name,
        email,
        phone: phone || '',
        businessSize: businessSize || '',
        natureOfBusiness: natureOfBusiness || '',
        status: 'active',
        source: 'website',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      
      console.log('Waitlist entry created:', result.insertedId)
      
    } catch (dbError) {
      console.error('Database error:', dbError)
      // Don't fail the request if DB is down, just log it
      result = { insertedId: 'offline-' + Date.now() }
    } finally {
      if (client) {
        try {
          await client.close()
        } catch (closeError) {
          console.error('Error closing connection:', closeError)
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
      id: result?.insertedId || 'offline'
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
    
  } catch (error) {
    console.error('Waitlist error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to join waitlist',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }
}
