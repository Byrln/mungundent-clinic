// Script to test database connection and notifications
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  console.log('Testing database connection...');
  console.log('Database URL:', process.env.DATABASE_URL);
  
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
  
  try {
    // Try to connect
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    // Check if notifications table exists and has data
    console.log('Testing notifications...');
    const notificationsCount = await prisma.notification.count();
    console.log(`Found ${notificationsCount} notifications in the database`);
    
    if (notificationsCount > 0) {
      // List existing notifications
      const notifications = await prisma.notification.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5
      });
      console.log('Recent notifications:', JSON.stringify(notifications, null, 2));
    }
    
    // Create a test notification
    console.log('Creating a test notification...');
    const testNotification = await prisma.notification.create({
      data: {
        type: 'SYSTEM',
        title: 'Test Notification',
        message: 'This is a test notification created via script',
        isRead: false,
        data: {},
      },
    });
    console.log('✅ Test notification created:', testNotification);
    
    console.log('All database tests passed! Your database connection is working correctly.');
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    console.error('Error details:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();