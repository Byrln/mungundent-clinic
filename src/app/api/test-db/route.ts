import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    console.log('Testing database connection and product creation...');
    
    // Try a simple query to test the connection
    const count = await prisma.product.count();
    console.log('Current product count:', count);
    
    // Try to create a test product
    console.log('Attempting to create a test product...');
    const testProduct = await prisma.product.create({
      data: {
        name: 'Test Product ' + new Date().toISOString(),
        description: 'This is a test product created to verify database connectivity',
        price: 99.99,
        inStock: true,
      },
    });
    console.log('Test product created successfully:', testProduct.id);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection and product creation successful',
      count,
      testProduct,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Database test failed:', error);
    console.error('Error stack:', error.stack);
    
    if (error.code) {
      console.error('Prisma error code:', error.code);
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Database test failed', 
        error: error.message,
        stack: error.stack,
        code: error.code,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
    } catch (e) {
      console.error('Error disconnecting from database:', e);
    }
  }
}