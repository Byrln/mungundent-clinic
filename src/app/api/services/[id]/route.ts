import { NextRequest, NextResponse } from 'next/server';
import { prisma, executeDbOperation } from '@/lib/db';

// GET /api/services/[id] - Get a single service by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const service = await prisma.service.findUnique({
      where: { id },
    });
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}

// PUT /api/services/[id] - Update a service
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { title, description, imageUrl, price } = body;
    
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }
    
    // Check if service exists
    const existingService = await prisma.service.findUnique({
      where: { id },
    });
    
    if (!existingService) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    // Update service
    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        price: price ? parseFloat(price) : null,
      },
    });
    
    return NextResponse.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

// DELETE /api/services/[id] - Delete a service
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if service exists
    const existingService = await prisma.service.findUnique({
      where: { id },
    });
    
    if (!existingService) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    // Delete service
    await prisma.service.delete({
      where: { id },
    });
    
    return NextResponse.json(
      { message: 'Service deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}