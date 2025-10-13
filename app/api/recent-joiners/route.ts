import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/upcapto-dev'
    const client = new MongoClient(uri)
    
    await client.connect()
    const db = client.db('upcapto-dev')
    const collection = db.collection('waitlist')
    
    // Get recent joiners from the last 24 hours, sorted by newest first
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

    return NextResponse.json({
      success: true,
      joiners: formattedJoiners
    })
  } catch (error) {
    console.error('Error fetching recent joiners:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch recent joiners' },
      { status: 500 }
    )
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
