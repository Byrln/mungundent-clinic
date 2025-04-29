import { NextRequest, NextResponse } from 'next/server';
import { prisma, executeDbOperation } from '@/lib/db';

// Simple product creation endpoint without any custom error handling
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { 
      name, 
      description, 
      imageUrl, 
      price, 
      inStock, 
      images = [], 
      category,
      usage,
      ingredients,
      stockQuantity
    } = body;
    
    // Validate required fields
    if (!name || !description || price === undefined) {
      return NextResponse.json(
        { error: 'Name, description, and price are required' },
        { status: 400 }
      );
    }
    
    // Convert price to number if it's a string
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    // Create the product with images using the executeDbOperation helper
    const product = await executeDbOperation(async () => {
      return prisma.product.create({
        data: {
          name,
          description,
          imageUrl, // Keep for backward compatibility
          price: numericPrice,
          inStock: inStock !== undefined ? inStock : true,
          category,
          usage,
          ingredients,
          stockQuantity: stockQuantity ? parseInt(stockQuantity.toString()) : null,
          // Create images if provided
          images: images.length > 0 ? {
            create: images.map((img: any, index: number) => ({
              url: img.url,
              alt: img.alt || name,
              order: index
            }))
          } : undefined
        },
        include: {
          images: true
        }
      });
    });
    
    // Return the created product
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    // Log the error
    console.error('Error creating product:', error);
    
    // Return an error response
    return NextResponse.json(
      { error: 'Failed to create product', details: error.message },
      { status: 500 }
    );
  }
}