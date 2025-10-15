import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

export async function GET(request: NextRequest) {
  let client

  try {
    const mongoUri = process.env.MONGODB_URI
    
    if (!mongoUri) {
      return NextResponse.json({
        success: false,
        error: 'MONGODB_URI not configured',
        databaseStatus: 'not_configured'
      })
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

    // Get total count
    const totalCount = await collection.countDocuments()
    
    // Get recent entries
    const recentEntries = await collection
      .find({ status: 'active' })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray()

    // Get dummy data count
    const dummyCount = await collection.countDocuments({ 
      email: { $regex: /@test\.com$/ } 
    })

    return NextResponse.json({
      success: true,
      databaseStatus: 'connected',
      totalEntries: totalCount,
      dummyEntries: dummyCount,
      realEntries: totalCount - dummyCount,
      recentEntries: recentEntries.map(entry => ({
        name: entry.name,
        email: entry.email,
        createdAt: entry.createdAt,
        isDummy: entry.email.includes('@test.com')
      })),
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Database test error:', error)
    
    return NextResponse.json({
      success: false,
      error: error?.message || 'Unknown error occurred',
      databaseStatus: 'error'
    })
  } finally {
    if (client) {
      await client.close()
    }
  }
}
