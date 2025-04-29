import { NextRequest, NextResponse } from 'next/server';
import { prisma, executeDbOperation } from '@/lib/db';

// GET /api/orders - Get all orders
export async function GET(request: NextRequest) {
  try {
    const orders = await executeDbOperation(async () => {
      return prisma.order.findMany({
        include: {
          items: {
            include: {
              product: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    });
    
    return NextResponse.json(orders);
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    console.log('Processing order request with Neon PostgreSQL');
    
    // Parse request body with error handling
    let body;
    try {
      body = await request.json();
      console.log('Received order request:', JSON.stringify(body));
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid JSON in request body' 
        },
        { status: 400 }
      );
    }
    
    const { 
      customerName, 
      email, 
      phone, 
      address, 
      city, 
      postalCode, 
      items, 
      paymentMethod 
    } = body;
    
    // Validate required fields
    if (!customerName || !email || !phone || !address || !city || !items || !items.length || !paymentMethod) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields' 
        },
        { status: 400 }
      );
    }
    
    // Execute the order creation process with proper error handling and connection management
    const order = await executeDbOperation(async () => {
      // Fetch current product data to verify prices and availability
      const productIds = items.map((item: any) => item.productId);
      const products = await prisma.product.findMany({
        where: {
          id: {
            in: productIds
          }
        }
      });
      
      // Create a map of products for easy lookup
      const productMap = products.reduce((acc, product) => {
        acc[product.id] = product;
        return acc;
      }, {} as Record<string, any>);
      
      // Validate all products exist and are in stock
      const invalidItems = items.filter((item: any) => {
        const product = productMap[item.productId];
        return !product || !product.inStock;
      });
      
      if (invalidItems.length > 0) {
        throw new Error('Some items are unavailable or out of stock');
      }
      
      // Calculate total amount
      const totalAmount = items.reduce((sum: number, item: any) => {
        const product = productMap[item.productId];
        return sum + (product.price * item.quantity);
      }, 0);
      
      // Create order with items in a transaction
      // Note: For Neon DB, we need to be careful with transactions as they can be more prone to connection issues
      try {
        return await prisma.$transaction(async (tx) => {
          // Create the order
          const newOrder = await tx.order.create({
            data: {
              customerName,
              email,
              phone,
              address,
              city,
              postalCode: postalCode || '',
              totalAmount,
              paymentMethod,
              items: {
                create: items.map((item: any) => ({
                  productId: item.productId,
                  quantity: item.quantity,
                  price: productMap[item.productId].price
                }))
              }
            },
            include: {
              items: true
            }
          });
          
          // Update product stock (optional)
          for (const item of items) {
            await tx.product.update({
              where: { id: item.productId },
              data: { 
                // Decrement stock count if you're tracking inventory
                // inStock: remaining > 0 
              }
            });
          }
          
          return newOrder;
        });
      } catch (txError: any) {
        console.error('Transaction error:', txError);
        
        // For transaction errors, we'll try a non-transactional approach as fallback
        if (txError.message && txError.message.includes('closed')) {
          console.log('Transaction failed due to connection issues, trying non-transactional approach');
          
          // Create order without transaction
          const newOrder = await prisma.order.create({
            data: {
              customerName,
              email,
              phone,
              address,
              city,
              postalCode: postalCode || '',
              totalAmount,
              paymentMethod,
            },
            include: {
              items: true
            }
          });
          
          // Create order items
          for (const item of items) {
            await prisma.orderItem.create({
              data: {
                orderId: newOrder.id,
                productId: item.productId,
                quantity: item.quantity,
                price: productMap[item.productId].price
              }
            });
          }
          
          return newOrder;
        }
        
        throw txError;
      }
    });
    
    console.log('Order created successfully:', order.id);
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      data: order
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating order:', error);
    console.error('Error stack:', error.stack);
    
    // Log more details about the error
    if (error.code) {
      console.error('Error code:', error.code);
    }
    
    // Return appropriate error response
    if (error.message && error.message.includes('unavailable')) {
      return NextResponse.json(
        { 
          success: false,
          error: error.message 
        },
        { status: 400 }
      );
    }
    
    // Handle database connection errors
    if (error.code === 'P1001' || error.code === 'P1002' || 
        (error.message && (
          error.message.includes('connection') || 
          error.message.includes('database') ||
          error.message.includes('timeout')
        ))
    ) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Database connection error. Please try again later.' 
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to create order. Please try again later.',
        errorCode: error.code || 'UNKNOWN_ERROR'
      },
      { status: 500 }
    );
  }
}