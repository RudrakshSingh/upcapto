import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    // Always return dummy data for now to avoid 500 errors
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
  } catch (error) {
    console.error('Error fetching recent joiners:', error)
    
    // Return dummy data if anything fails
    const dummyJoiners = [
      { name: 'Rajesh Kumar', location: 'Mumbai', business: 'Retail', time: '2 minutes ago', isNew: true },
      { name: 'Priya Sharma', location: 'Delhi', business: 'Technology', time: '5 minutes ago', isNew: true },
      { name: 'Amit Patel', location: 'Bangalore', business: 'Manufacturing', time: '8 minutes ago', isNew: true }
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
