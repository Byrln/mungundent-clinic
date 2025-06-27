import { NextRequest, NextResponse } from 'next/server';
import { prisma, executeDbOperation } from '@/lib/db';

// GET /api/products/[id] - Get a specific product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const product = await executeDbOperation(async () => {
      return prisma.product.findUnique({
        where: { id },
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
    console.error(`Error fetching product ${params.id}:`, error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to fetch product' },
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
    const { id } = params;
    const data = await request.json();
    
    // Check if product exists
    const productExists = await executeDbOperation(async () => {
      return prisma.product.findUnique({
        where: { id },
      });
    });
    
    if (!productExists) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Update the product
    const updatedProduct = await executeDbOperation(async () => {
      return prisma.product.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          price: data.price,
          imageUrl: data.imageUrl,
          inStock: data.inStock,
          category: data.category,
        },
      });
    });
    
    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    console.error(`Error updating product ${params.id}:`, error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to update product' },
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
    const { id } = params;
    
    // Check if product exists
    const productExists = await executeDbOperation(async () => {
      return prisma.product.findUnique({
        where: { id },
      });
    });
    
    if (!productExists) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Check if product is used in any orders
    const orderItems = await executeDbOperation(async () => {
      return prisma.orderItem.findMany({
        where: { productId: id },
        take: 1,
      });
    });
    
    if (orderItems.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete product that is used in orders' },
        { status: 400 }
      );
    }
    
    // Delete the product
    await executeDbOperation(async () => {
      return prisma.product.delete({
        where: { id },
      });
    });
    
    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Error deleting product ${params.id}:`, error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to delete product' },
      { status: 500 }
    );
  }
}