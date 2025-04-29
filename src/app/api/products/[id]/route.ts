import { NextRequest, NextResponse } from 'next/server';
import { prisma, executeDbOperation } from '@/lib/db';

// GET /api/products/[id] - Get a single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Use executeDbOperation for better error handling and connection retry
    const product = await executeDbOperation(async () => {
      return await prisma.product.findUnique({
        where: { id },
        include: {
          images: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      });
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product', details: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { name, description, imageUrl, price, inStock } = body;
    
    if (!name || !description || price === undefined) {
      return NextResponse.json(
        { error: 'Name, description, and price are required' },
        { status: 400 }
      );
    }
    
    // Use executeDbOperation for better error handling and connection retry
    const existingProduct = await executeDbOperation(async () => {
      return await prisma.product.findUnique({
        where: { id },
      });
    });
    
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Update product with executeDbOperation
    const updatedProduct = await executeDbOperation(async () => {
      return await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          imageUrl,
          price: parseFloat(price.toString()),
          inStock: inStock !== undefined ? inStock : existingProduct.inStock,
        },
      });
    });
    
    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if product exists with executeDbOperation
    const existingProduct = await executeDbOperation(async () => {
      return await prisma.product.findUnique({
        where: { id },
      });
    });
    
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Delete product with executeDbOperation
    await executeDbOperation(async () => {
      return await prisma.product.delete({
        where: { id },
      });
    });
    
    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product', details: error.message },
      { status: 500 }
    );
  }
}