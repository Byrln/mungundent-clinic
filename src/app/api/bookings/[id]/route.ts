import { NextRequest, NextResponse } from 'next/server';
import { prisma, executeDbOperation } from '@/lib/db';

// GET /api/bookings/[id] - Get a single booking by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const booking = await prisma.booking.findUnique({
      where: { id },
    });
    
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

// PUT /api/bookings/[id] - Update a booking
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { name, phone, serviceType, date, time, message } = body;
    
    if (!name || !phone || !serviceType || !date || !time) {
      return NextResponse.json(
        { error: 'Name, phone, service type, date and time are required' },
        { status: 400 }
      );
    }
    
    // Check if booking exists
    const existingBooking = await prisma.booking.findUnique({
      where: { id },
    });
    
    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    // Parse date string to Date object
    const bookingDate = new Date(date);
    
    // Update booking
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        name,
        phone,
        serviceType,
        date: bookingDate,
        time,
        message,
      },
    });
    
    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

// DELETE /api/bookings/[id] - Delete a booking
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if booking exists
    const existingBooking = await prisma.booking.findUnique({
      where: { id },
    });
    
    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    // Delete booking
    await prisma.booking.delete({
      where: { id },
    });
    
    return NextResponse.json(
      { message: 'Booking deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}