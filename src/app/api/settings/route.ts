import { NextRequest, NextResponse } from 'next/server';

// This would typically be stored in a database
// For demo purposes, we'll use in-memory storage
let siteSettings = {
  siteName: "Мөнгөндент",
  siteDescription: "Мөнгөндент шүдний эмнэлэг - Таны инээмсэглэлийн төлөө",
  contactEmail: "info@mongondent.mn",
  contactPhone: "+976 9911-2233",
  address: "Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Их сургуулийн гудамж",
  logoUrl: "",
};

// GET /api/settings - Get site settings
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(siteSettings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// POST /api/settings - Update site settings
export async function POST(request: NextRequest) {
  try {
    // Check authorization
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const apiKey = authHeader.split(' ')[1];
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.siteName) {
      return NextResponse.json(
        { error: 'Site name is required' },
        { status: 400 }
      );
    }
    
    // Update settings
    siteSettings = {
      ...siteSettings,
      ...body,
    };
    
    return NextResponse.json(siteSettings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}