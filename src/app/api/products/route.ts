import { NextRequest, NextResponse } from 'next/server';
import { prisma, executeDbOperation } from '@/lib/db';

// GET /api/products - Get all products
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const inStockOnly = searchParams.get('inStock') === 'true';
    
    // Build filter conditions
    const where = inStockOnly ? { inStock: true } : {};
    
    // Use executeDbOperation for better error handling and connection retry
    const products = await executeDbOperation(async () => {
      return await prisma.product.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
      });
    });
    
    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    console.log('Starting product creation process');
    
    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log('Received product data:', JSON.stringify(body));
    } catch (parseError) {
      console.error('Error parsing request JSON:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    const { name, description, imageUrl, price, inStock } = body;
    
    // Validate required fields
    if (!name || !description || price === undefined) {
      console.error('Validation error: Missing required fields');
      return NextResponse.json(
        { error: 'Title, description, and price are required' },
        { status: 400 }
      );
    }
    
    console.log('Attempting to create product in database');
    
    // Ensure price is a valid number
    let numericPrice;
    try {
      numericPrice = typeof price === 'string' ? parseFloat(price) : price;
      
      if (isNaN(numericPrice)) {
        throw new Error(`Invalid price value: ${price}`);
      }
    } catch (priceError) {
      console.error('Price validation error:', priceError);
      return NextResponse.json(
        { error: 'Price must be a valid number' },
        { status: 400 }
      );
    }
    
    console.log('Creating product with data:', {
      title: name,
      description: description.substring(0, 20) + '...',
      imageUrl: imageUrl || 'none',
      price: numericPrice,
      inStock: inStock !== undefined ? inStock : true
    });
    
    try {
      // Create the product directly without using executeDbOperation
      const product = await prisma.product.create({
        data: {
          title: name, // Schema uses 'title' instead of 'name'
          description,
          imageUrl,
          price: numericPrice,
          inStock: inStock !== undefined ? inStock : true,
        },
      });
      
      console.log('Product created successfully:', product.id);
      return NextResponse.json(product, { status: 201 });
    } catch (dbError: any) {
      console.error('Database error creating product:', dbError);
      
      // Check for specific Prisma errors
      if (dbError.code) {
        console.error('Prisma error code:', dbError.code);
        
        // Handle specific Prisma error codes
        if (dbError.code === 'P2002') {
          return NextResponse.json(
            { error: 'A product with this title already exists' },
            { status: 409 }
          );
        }
      }
      
      throw dbError; // Re-throw to be caught by the outer catch block
    }
  } catch (error: any) {
    console.error('Error creating product:', error);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Failed to create product', 
        details: error.message,
        code: error.code || 'UNKNOWN_ERROR'
      },
      { status: 500 }
    );
  }
}