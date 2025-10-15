import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

export async function POST(request: NextRequest) {
  let client: MongoClient | null = null
  
  try {
    const data = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'query']
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
    const collection = db.collection('contacts')

    // Create new contact entry
    const newEntry = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      query: data.query,
      category: data.category || 'general',
      createdAt: new Date(),
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      status: 'active'
    }

    const result = await collection.insertOne(newEntry)

    console.log('New contact entry saved to database:', {
      id: result.insertedId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      query: data.query,
      category: data.category,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
        id: result.insertedId.toString()
      },
      { status: 201 }
    )

  } catch (error: any) {
    console.error('Error processing contact submission:', error)
    
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
