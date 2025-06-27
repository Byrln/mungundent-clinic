import { NextRequest, NextResponse } from 'next/server';
import { prisma, executeDbOperation } from '@/lib/db';

// GET /api/products - Get all products
export async function GET(request: NextRequest) {
  try {
    console.log('Fetching products...');
    
    const products = await executeDbOperation(async () => {
      return prisma.product.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    });
    
    console.log(`Found ${products.length} products`);
    
    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch products',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || data.price === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create the product
    const product = await executeDbOperation(async () => {
      return prisma.product.create({
        data: {
          title: data.title,
          description: data.description || '',
          price: data.price,
          imageUrl: data.imageUrl || '',
          inStock: data.inStock !== undefined ? data.inStock : true,
          category: data.category || 'uncategorized',
        },
      });
    });
    
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}