// Test form submission endpoint
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Form submission received:', body)
    
    // Simulate database save (without actual MongoDB for now)
    const mockResult = {
      success: true,
      message: 'Form data received successfully',
      data: {
        id: Math.random().toString(36).substr(2, 9),
        ...body,
        timestamp: new Date().toISOString()
      }
    }
    
    console.log('Mock database save result:', mockResult)
    
    return NextResponse.json(mockResult, { status: 201 })
    
  } catch (error) {
    console.error('Form submission error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Form submission failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
