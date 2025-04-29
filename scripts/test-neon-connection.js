// Script to test Neon DB connection with the enhanced configuration
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
  
  // Create a new Prisma client with the enhanced configuration
  const prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
  
  try {
    // Connect to the database
    console.log('Connecting to database...');
    await prisma.$connect();
    console.log('Connection successful!');
    
    // Test a simple query
    console.log('Testing a simple query...');
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Query result:', result);
    
    // Test a more complex query
    console.log('Testing database tables...');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('Available tables:', tables);
    
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