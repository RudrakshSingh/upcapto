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

    // Test MongoDB connection
    const { MongoClient } = await import('mongodb')
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/upcapto-dev'
    const client = new MongoClient(uri)
    
    await client.connect()
    const db = client.db(process.env.MONGODB_DATABASE || 'upcapto')
    const collection = db.collection('waitlist')
    
    // Insert the entry
    const result = await collection.insertOne({
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
    
    await client.close()
    
    console.log('Waitlist entry created:', result.insertedId)
    
    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
      id: result.insertedId
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
