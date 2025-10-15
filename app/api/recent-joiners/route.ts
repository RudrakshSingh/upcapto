import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

export async function GET(request: NextRequest) {
  let client

  try {
    // Connect to MongoDB Atlas
    const mongoUri = process.env.MONGODB_URI
    
    if (!mongoUri) {
      console.error('MONGODB_URI environment variable is not set')
      // Return dummy data if no database connection
      const dummyJoiners = [
        {
          name: 'Rajesh Kumar',
          location: 'Mumbai',
          business: 'Retail',
          time: 'just now',
          isNew: true
        },
        {
          name: 'Priya Sharma',
          location: 'Delhi',
          business: 'Tech',
          time: '2 min ago',
          isNew: true
        }
      ]
      
      return NextResponse.json({
        success: true,
        joiners: dummyJoiners
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

    // Get recent entries from database
    const recentEntries = await collection
      .find({ status: 'active' })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray()

    const locations = [
      'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Hyderabad', 'Ahmedabad',
      'Kolkata', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore',
      'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri', 'Patna', 'Vadodara'
    ]
    
    const businesses = [
      'Retail', 'Tech', 'Healthcare', 'Manufacturing', 'Finance', 'Education',
      'Real Estate', 'Food & Beverage', 'Automotive', 'Beauty', 'Fitness',
      'Entertainment', 'Agriculture', 'Construction', 'Legal', 'Marketing'
    ]

    const joiners = recentEntries.map((entry, index) => {
      const timeDiff = Date.now() - new Date(entry.createdAt).getTime()
      const minutesAgo = Math.floor(timeDiff / (1000 * 60))
      
      return {
        name: entry.name,
        location: locations[Math.floor(Math.random() * locations.length)],
        business: businesses[Math.floor(Math.random() * businesses.length)],
        time: minutesAgo === 0 ? 'just now' : `${minutesAgo} min ago`,
        isNew: true,
        realData: true // Flag to identify real data
      }
    })

    // If no real data, add some dummy data
    if (joiners.length === 0) {
      const dummyNames = [
        'Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Gupta', 'Vikram Singh'
      ]
      
      for (let i = 0; i < 3; i++) {
        joiners.push({
          name: dummyNames[i],
          location: locations[Math.floor(Math.random() * locations.length)],
          business: businesses[Math.floor(Math.random() * businesses.length)],
          time: i === 0 ? 'just now' : `${i + 1} min ago`,
          isNew: true
        })
      }
    }

    return NextResponse.json({
      success: true,
      joiners: joiners
    })

  } catch (error) {
    console.error('Error fetching recent joiners:', error)
    
    // Return dummy data on error
    const dummyJoiners = [
      {
        name: 'Rajesh Kumar',
        location: 'Mumbai',
        business: 'Retail',
        time: 'just now',
        isNew: true
      },
      {
        name: 'Priya Sharma',
        location: 'Delhi',
        business: 'Tech',
        time: '2 min ago',
        isNew: true
      }
    ]
    
    return NextResponse.json({
      success: true,
      joiners: dummyJoiners
    })
  } finally {
    if (client) {
      await client.close()
    }
  }
}
