// Simple script to check database connection
const { PrismaClient } = require('@prisma/client');

async function main() {
  console.log('Testing database connection...');
  
  const prisma = new PrismaClient({
    log: ['error', 'warn', 'info'],
  });
  
  try {
    console.log('Connecting to database...');
    await prisma.$connect();
    console.log('Connected successfully!');
    
    console.log('Running a simple query...');
    const productCount = await prisma.product.count();
    console.log(`Database has ${productCount} products.`);
    
    console.log('All tests passed!');
  } catch (error) {
    console.error('Database connection test failed:');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('Disconnected from database.');
  }
}

main();