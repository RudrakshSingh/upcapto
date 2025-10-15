import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

export async function POST(request: NextRequest) {
  let client;
  
  try {
    const data = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'businessSize', 'natureOfBusiness']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Field '${field}' is required` },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate phone number (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(data.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    // Connect to MongoDB Atlas
    const mongoUri = process.env.MONGODB_URI
    
    if (!mongoUri) {
      console.error('MONGODB_URI environment variable is not set')
      return NextResponse.json(
        { error: 'Database configuration error' },
        { status: 500 }
      )
    }
    
    client = new MongoClient(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 10000,
      retryWrites: true,
      w: 'majority'
    })

    await client.connect()
    const db = client.db('upcapto-dev')
    const collection = db.collection('waitlist')

    // Check if email already exists
    const existingEntry = await collection.findOne({ email: data.email })
    if (existingEntry) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Create new entry
    const newEntry = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      businessSize: data.businessSize,
      natureOfBusiness: data.natureOfBusiness,
      createdAt: new Date(),
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      status: 'active'
    }

    // Add some dummy data for testing
    const dummyEntries = [
      {
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@test.com',
        phone: '9876543210',
        businessSize: '1-10',
        natureOfBusiness: 'retail',
        createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)',
        status: 'active'
      },
      {
        name: 'Priya Sharma',
        email: 'priya.sharma@test.com',
        phone: '9876543211',
        businessSize: '11-20',
        natureOfBusiness: 'technology',
        createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        ipAddress: '192.168.1.2',
        userAgent: 'Mozilla/5.0 (Test Browser)',
        status: 'active'
      },
      {
        name: 'Amit Patel',
        email: 'amit.patel@test.com',
        phone: '9876543212',
        businessSize: '21-50',
        natureOfBusiness: 'healthcare',
        createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        ipAddress: '192.168.1.3',
        userAgent: 'Mozilla/5.0 (Test Browser)',
        status: 'active'
      }
    ]

    // Insert dummy data first (only if collection is empty)
    const existingCount = await collection.countDocuments()
    if (existingCount === 0) {
      console.log('Adding dummy data for testing...')
      await collection.insertMany(dummyEntries)
    }

    const result = await collection.insertOne(newEntry)
    
    console.log('New waitlist entry saved to database:', {
      id: result.insertedId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      businessSize: data.businessSize,
      natureOfBusiness: data.natureOfBusiness,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist',
      id: result.insertedId.toString()
    }, { status: 201 })

  } catch (error: any) {
    console.error('Error processing waitlist submission:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  } finally {
    if (client) {
      await client.close()
    }
  }
}
