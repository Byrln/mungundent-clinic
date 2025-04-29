// Script to test database connection
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  console.log('Testing database connection...');
  console.log('Database URL:', process.env.DATABASE_URL);
  
  const prisma = new PrismaClient();
  
  try {
    // Try to connect
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    // Try a simple query
    console.log('Testing a simple query...');
    const servicesCount = await prisma.service.count();
    console.log(`✅ Query successful! Found ${servicesCount} services in the database.`);
    
    // Try to create a test service
    console.log('Testing data creation...');
    const testService = await prisma.service.create({
      data: {
        title: 'Test Service',
        description: 'This is a test service to verify database connection',
        price: 100,
      },
    });
    console.log(`✅ Data creation successful! Created service with ID: ${testService.id}`);
    
    // Clean up the test data
    await prisma.service.delete({
      where: { id: testService.id },
    });
    console.log('✅ Test data cleaned up successfully!');
    
    console.log('All database tests passed! Your database connection is working correctly.');
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();