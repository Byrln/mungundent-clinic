// Simple script to test product creation
const { PrismaClient } = require('@prisma/client');

async function main() {
  console.log('Starting test script...');
  
  // Create a new Prisma client
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
  
  try {
    console.log('Connecting to database...');
    
    // Test connection with a simple query
    const productCount = await prisma.product.count();
    console.log(`Current product count: ${productCount}`);
    
    // Create a test product
    console.log('Creating test product...');
    const product = await prisma.product.create({
      data: {
        name: `Test Product ${Date.now()}`,
        description: 'This is a test product created via script',
        price: 99.99,
        inStock: true,
      },
    });
    
    console.log('Product created successfully:');
    console.log(JSON.stringify(product, null, 2));
    
  } catch (error) {
    console.error('Error in test script:', error);
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
    console.log('Disconnected from database');
  }
}

// Run the main function
main()
  .then(() => console.log('Test completed'))
  .catch(e => console.error('Test failed:', e));