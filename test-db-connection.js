require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  console.log('Testing connection to Neon DB...');
  
  // Mask the database URL for logging
  const dbUrl = process.env.DATABASE_URL || '';
  const maskedUrl = dbUrl ? 
    dbUrl.substring(0, dbUrl.indexOf('@') + 1) + '***' : 
    'DATABASE_URL not set';
  
  console.log('Database URL:', maskedUrl);
  
  // Create a new Prisma client
  const prisma = new PrismaClient();
  
  try {
    // Connect to the database
    console.log('Connecting to database...');
    await prisma.$connect();
    console.log('Connection successful!');
    
    // Test a simple query to get all bookings
    console.log('Fetching bookings...');
    const bookings = await prisma.booking.findMany();
    console.log(`Found ${bookings.length} bookings`);
    
    // Test a simple query to get all orders
    console.log('Fetching orders...');
    const orders = await prisma.order.findMany();
    console.log(`Found ${orders.length} orders`);
    
    // Test a simple query to get all products
    console.log('Fetching products...');
    const products = await prisma.product.findMany();
    console.log(`Found ${products.length} products`);
    
    console.log('All tests passed successfully!');
  } catch (error) {
    console.error('Error testing connection:', error);
  } finally {
    // Always disconnect
    await prisma.$disconnect();
    console.log('Disconnected from database');
  }
}

// Run the test
testConnection()
  .catch(console.error);