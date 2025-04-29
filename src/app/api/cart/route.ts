import { NextRequest, NextResponse } from 'next/server';
import { prisma, executeDbOperation } from '@/lib/db';

// This is a simple cart API that could be expanded with a Cart model in the database
// For now, it just validates products and returns them with updated information

// POST /api/cart - Validate cart items and get updated product information
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body;
    
    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Items array is required' },
        { status: 400 }
      );
    }
    
    // Extract product IDs from cart items
    const productIds = items.map(item => item.id);
    
    // Fetch current product data for all items in the cart
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds
        }
      }
    });
    
    // Map of product ID to product data
    const productMap = products.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {} as Record<string, any>);
    
    // Process cart items with current product data
    const processedItems = items.map(item => {
      const product = productMap[item.id];
      
      // If product doesn't exist or is out of stock
      if (!product) {
        return {
          ...item,
          valid: false,
          error: 'Product not found'
        };
      }
      
      if (!product.inStock) {
        return {
          ...item,
          valid: false,
          error: 'Product is out of stock',
          currentPrice: product.price
        };
      }
      
      // Return valid item with current price
      return {
        ...item,
        valid: true,
        name: product.name,
        currentPrice: product.price,
        // If the price has changed, flag it
        priceChanged: item.price !== product.price
      };
    });
    
    return NextResponse.json({
      items: processedItems,
      summary: {
        totalItems: processedItems.length,
        validItems: processedItems.filter(item => item.valid).length,
        subtotal: processedItems
          .filter(item => item.valid)
          .reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0)
      }
    });
  } catch (error) {
    console.error('Error processing cart:', error);
    return NextResponse.json(
      { error: 'Failed to process cart' },
      { status: 500 }
    );
  }
}