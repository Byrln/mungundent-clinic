import { NextResponse } from 'next/server';
import { prisma, executeDbOperation } from '@/lib/db';

export async function GET() {
  try {
    // Use the executeDbOperation helper which includes retry logic
    const productCount = await executeDbOperation(async () => {
      return await prisma.product.count();
    });
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      productCount,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Database test failed:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  } finally {
    // Ensure we disconnect properly
    try {
      await prisma.$disconnect();
    } catch (e) {
      console.error('Error disconnecting from database:', e);
    }
  }
}