// Simple MongoDB connection test
import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const uri = process.env.MONGODB_URI
    
    if (!uri) {
      return NextResponse.json({
        success: false,
        error: 'MONGODB_URI not configured',
        environment: process.env.NODE_ENV
      })
    }
    
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 10000,
      retryWrites: true,
      w: 'majority'
    })
    
    await client.connect()
    const db = client.db(process.env.MONGODB_DATABASE || 'upcapto')
    const collection = db.collection('waitlist')
    
    // Test insert with unique email
    const testEntry = {
      name: 'Test Connection',
      email: `test-connection-${Date.now()}@example.com`,
      phone: '1234567890',
      businessSize: '1-10',
      natureOfBusiness: 'test',
      status: 'active',
      source: 'test-connection',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await collection.insertOne(testEntry)
    
    await client.close()
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      insertedId: result.insertedId,
      environment: process.env.NODE_ENV,
      database: process.env.MONGODB_DATABASE || 'upcapto'
    })
    
  } catch (error) {
    console.error('MongoDB connection test failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: process.env.NODE_ENV,
      mongoUri: process.env.MONGODB_URI ? 'Set' : 'Not set'
    }, { status: 500 })
  }
}
