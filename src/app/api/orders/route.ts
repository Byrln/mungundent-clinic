import { NextRequest, NextResponse } from 'next/server';
import { prisma, executeDbOperation } from '@/lib/db';

// GET /api/orders - Get all orders
export async function GET(request: NextRequest) {
  try {
    console.log('Fetching orders...');
    
    const orders = await executeDbOperation(async () => {
      return prisma.order.findMany({
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    });
    
    console.log(`Found ${orders.length} orders`);
    
    return NextResponse.json(orders);
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch orders',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.customerName || !data.email || !data.phone || !data.items || !data.totalAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create the order with items
    const order = await executeDbOperation(async () => {
      return prisma.order.create({
        data: {
          customerName: data.customerName,
          email: data.email,
          phone: data.phone,
          address: data.address || '',
          city: data.city || '',
          postalCode: data.postalCode,
          totalAmount: data.totalAmount,
          paymentMethod: data.paymentMethod || 'cash',
          status: data.status || 'pending',
          items: {
            create: data.items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: true,
        },
      });
    });
    
    // Create a notification for the new order
    await executeDbOperation(async () => {
      return prisma.notification.create({
        data: {
          type: 'ORDER',
          title: 'New Order Received',
          message: `New order from ${data.customerName} for ₮${data.totalAmount.toLocaleString()}`,
          data: {
            orderId: order.id,
          },
        },
      });
    });
    
    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error('Error creating order:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}