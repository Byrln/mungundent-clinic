import { NextRequest, NextResponse } from 'next/server';
import { prisma, executeDbOperation } from '@/lib/db';

// GET /api/orders/[id] - Get a specific order
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const order = await executeDbOperation(async () => {
      return prisma.order.findUnique({
        where: { id },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    });
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(order);
  } catch (error: any) {
    console.error(`Error fetching order ${params.id}:`, error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

// PUT /api/orders/[id] - Update an order
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();
    
    // Check if order exists
    const orderExists = await executeDbOperation(async () => {
      return prisma.order.findUnique({
        where: { id },
      });
    });
    
    if (!orderExists) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Update the order
    const updatedOrder = await executeDbOperation(async () => {
      return prisma.order.update({
        where: { id },
        data: {
          customerName: data.customerName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
          totalAmount: data.totalAmount,
          paymentMethod: data.paymentMethod,
          status: data.status,
        },
        include: {
          items: true,
        },
      });
    });
    
    // If status changed to "completed", create a notification
    if (data.status === 'completed' && orderExists.status !== 'completed') {
      await executeDbOperation(async () => {
        return prisma.notification.create({
          data: {
            type: 'ORDER',
            title: 'Order Completed',
            message: `Order #${id.substring(0, 8)} has been marked as completed`,
            data: {
              orderId: id,
            },
          },
        });
      });
    }
    
    return NextResponse.json(updatedOrder);
  } catch (error: any) {
    console.error(`Error updating order ${params.id}:`, error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to update order' },
      { status: 500 }
    );
  }
}

// DELETE /api/orders/[id] - Delete an order
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Check if order exists
    const orderExists = await executeDbOperation(async () => {
      return prisma.order.findUnique({
        where: { id },
      });
    });
    
    if (!orderExists) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Delete the order (this will cascade delete order items)
    await executeDbOperation(async () => {
      return prisma.order.delete({
        where: { id },
      });
    });
    
    return NextResponse.json(
      { message: 'Order deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Error deleting order ${params.id}:`, error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to delete order' },
      { status: 500 }
    );
  }
}