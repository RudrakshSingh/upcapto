import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    // Try to get real data from MongoDB
    const { MongoClient } = await import('mongodb')
    const uri = process.env.MONGODB_URI
    
    if (!uri) {
      throw new Error('MongoDB URI not configured')
    }
    
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 10000,
      tls: true,
      tlsAllowInvalidCertificates: false,
      tlsAllowInvalidHostnames: false,
      retryWrites: true,
      w: 'majority'
    })
    
    await client.connect()
    const db = client.db(process.env.MONGODB_DATABASE || 'upcapto')
    const collection = db.collection('waitlist')
    
    // Get recent joiners from the last 24 hours
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    
    const recentJoiners = await collection
      .find({
        createdAt: { $gte: twentyFourHoursAgo }
      })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray()
    
    await client.close()

    // Format real data from database
    const formattedJoiners = recentJoiners.map((joiner, index) => ({
      name: joiner.name,
      location: getRandomLocation(),
      business: joiner.natureOfBusiness || 'Business',
      time: getTimeAgo(joiner.createdAt),
      isNew: index < 3
    }))

    // If no real data, add some dummy data
    if (formattedJoiners.length === 0) {
      const dummyJoiners = [
        { name: 'Rajesh Kumar', location: 'Mumbai', business: 'Retail', time: '2 minutes ago', isNew: true },
        { name: 'Priya Sharma', location: 'Delhi', business: 'Technology', time: '5 minutes ago', isNew: true },
        { name: 'Amit Patel', location: 'Bangalore', business: 'Manufacturing', time: '8 minutes ago', isNew: true }
      ]
      formattedJoiners.push(...dummyJoiners)
    }

    return NextResponse.json({
      success: true,
      joiners: formattedJoiners
    })
  } catch (error) {
    console.error('Error fetching recent joiners:', error)
    
    // Return dummy data if database fails
    const dummyJoiners = [
      { name: 'Rajesh Kumar', location: 'Mumbai', business: 'Retail', time: '2 minutes ago', isNew: true },
      { name: 'Priya Sharma', location: 'Delhi', business: 'Technology', time: '5 minutes ago', isNew: true },
      { name: 'Amit Patel', location: 'Bangalore', business: 'Manufacturing', time: '8 minutes ago', isNew: true },
      { name: 'Sneha Gupta', location: 'Chennai', business: 'Healthcare', time: '12 minutes ago', isNew: false },
      { name: 'Vikram Singh', location: 'Hyderabad', business: 'Finance', time: '15 minutes ago', isNew: false },
      { name: 'Anita Reddy', location: 'Pune', business: 'Education', time: '18 minutes ago', isNew: false }
    ]
    
    return NextResponse.json({
      success: true,
      joiners: dummyJoiners
    })
  }
}

function getRandomLocation() {
  const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Gurgaon', 'Noida', 'Indore', 'Bhopal', 'Kochi', 'Coimbatore', 'Vadodara', 'Surat', 'Nashik', 'Nagpur']
  return locations[Math.floor(Math.random() * locations.length)]
}

function getTimeAgo(date: Date) {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  
  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
}
