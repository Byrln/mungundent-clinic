import { NextRequest, NextResponse } from 'next/server';
import { prisma, executeDbOperation } from '@/lib/db';

// GET /api/services - Get all services
export async function GET(request: NextRequest) {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST /api/services - Create a new service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, imageUrl, price } = body;
    
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }
    
    const service = await prisma.service.create({
      data: {
        title,
        description,
        imageUrl,
        price: price ? parseFloat(price) : null,
      },
    });
    
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}