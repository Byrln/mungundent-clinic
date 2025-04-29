import { NextRequest, NextResponse } from 'next/server';

// Simple test endpoint to check if API is working
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'API is working',
    timestamp: new Date().toISOString()
  });
}

// Test endpoint for POST requests
export async function POST(request: NextRequest) {
  try {
    // Try to parse the request body
    const body = await request.json();
    
    // Return the body as part of the response
    return NextResponse.json({
      success: true,
      message: 'POST request received successfully',
      receivedData: body,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    // Handle parsing errors
    return NextResponse.json({
      success: false,
      error: 'Failed to parse request body',
      message: error.message,
      timestamp: new Date().toISOString()
    }, { status: 400 });
  }
}