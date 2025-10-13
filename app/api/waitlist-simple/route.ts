// Simple Waitlist API - Working Version
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Waitlist submission received:', body)
    
    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.businessSize || !body.natureOfBusiness) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
        required: ['name', 'email', 'phone', 'businessSize', 'natureOfBusiness']
      }, { status: 400 })
    }
    
    // Test MongoDB connection
    const { MongoClient } = await import('mongodb')
    const client = new MongoClient('mongodb://localhost:27017/upcapto-dev')
    
    await client.connect()
    console.log('MongoDB connected for waitlist')
    
    const db = client.db('upcapto-dev')
    const collection = db.collection('waitlist')
    
    // Check if email already exists
    const existing = await collection.findOne({ email: body.email })
    if (existing) {
      await client.close()
      return NextResponse.json({
        success: false,
        error: 'Email already registered',
        message: 'This email is already on our waitlist'
      }, { status: 409 })
    }
    
    // Create waitlist entry
    const waitlistEntry = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      businessSize: body.businessSize,
      natureOfBusiness: body.natureOfBusiness,
      status: 'active',
      source: 'website',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await collection.insertOne(waitlistEntry)
    console.log('Waitlist entry created:', result.insertedId)
    
    await client.close()
    
    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist',
      id: result.insertedId,
      timestamp: new Date().toISOString()
    }, { status: 201 })
    
  } catch (error) {
    console.error('Waitlist API error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to process waitlist submission',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
