// Test MongoDB connection directly
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Test MongoDB connection with hardcoded URI for testing
    const { MongoClient } = await import('mongodb')
    
    const uri = 'mongodb://localhost:27017/upcapto-dev'
    const client = new MongoClient(uri)
    
    await client.connect()
    console.log('MongoDB connected successfully')
    
    const db = client.db('upcapto-dev')
    const collection = db.collection('test')
    
    // Insert test document
    const result = await collection.insertOne({
      name: 'Test Document',
      timestamp: new Date(),
      source: 'api-test'
    })
    
    console.log('Test document inserted:', result.insertedId)
    
    // Read the document back
    const doc = await collection.findOne({ _id: result.insertedId })
    console.log('Test document retrieved:', doc)
    
    // Clean up
    await collection.deleteOne({ _id: result.insertedId })
    console.log('Test document cleaned up')
    
    await client.close()
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection and operations working correctly',
      testResults: {
        connection: true,
        insert: true,
        read: !!doc,
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
