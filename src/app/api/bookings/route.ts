import { NextRequest, NextResponse } from 'next/server';
import { prisma, executeDbOperation } from '@/lib/db';

// GET /api/bookings - Get all bookings
export async function GET(request: NextRequest) {
  try {
    const bookings = await executeDbOperation(async () => {
      return prisma.booking.findMany({
        orderBy: {
          date: 'asc',
        },
      });
    });
    
    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    // Log database connection for debugging
    console.log('Processing booking request with Neon PostgreSQL');
    
    const body = await request.json();
    console.log('Received booking request:', JSON.stringify(body));
    
    const { name, phone, serviceType, date, time, message } = body;
    
    if (!name || !phone || !serviceType || !date || !time) {
      console.error('Validation error: Missing required fields');
      return NextResponse.json(
        { error: 'Name, phone, service type, date and time are required' },
        { status: 400 }
      );
    }
    
    // Parse date string to Date object
    const bookingDate = new Date(date);
    console.log('Parsed booking date:', bookingDate);
    
    // Create the booking with enhanced error handling and connection management
    const booking = await executeDbOperation(async () => {
      return prisma.booking.create({
        data: {
          name,
          phone,
          serviceType,
          date: bookingDate,
          time,
          message: message || '',
        },
      });
    });
    
    console.log('Booking created successfully:', booking.id);
    
    // Create a notification for the new booking
    try {
      // Check if the notification table exists by trying to access it
      const notificationTableExists = await executeDbOperation(async () => {
        try {
          await prisma.$queryRaw`SELECT 1 FROM "Notification" LIMIT 1`;
          return true;
        } catch (e) {
          return false;
        }
      });
      
      if (notificationTableExists) {
        const notification = await executeDbOperation(async () => {
          return prisma.notification.create({
            data: {
              type: 'BOOKING',
              title: 'Шинэ цаг захиалга',
              message: `Шинэ цаг захиалга ирлээ: ${name} (${phone})`,
              data: {
                bookingId: booking.id,
                serviceType: serviceType,
                date: bookingDate,
                time: time
              },
            },
          });
        });
        console.log('Notification created for booking:', notification.id);
      } else {
        console.log('Notification table does not exist yet, skipping notification creation');
      }
    } catch (notificationError) {
      // Log but don't fail the request if notification creation fails
      console.error('Failed to create notification for booking:', notificationError);
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A booking with this information already exists' },
        { status: 409 }
      );
    }
    
    // Return appropriate error response
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to create booking. Please try again later.' 
      },
      { status: 500 }
    );
  }
}