// Script to set up the database and create test data
const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');

async function main() {
  console.log('Setting up database...');
  
  try {
    // Run Prisma migrations
    console.log('\n1. Running Prisma migrations...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    
    // Generate Prisma client
    console.log('\n2. Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    // Create test data
    console.log('\n3. Creating test notifications...');
    const prisma = new PrismaClient();
    
    try {
      // Check if notifications exist
      const notificationCount = await prisma.notification.count();
      console.log(`Found ${notificationCount} existing notifications`);
      
      if (notificationCount === 0) {
        // Create test notifications
        const testNotifications = [
          {
            type: 'SYSTEM',
            title: 'Welcome to Admin Dashboard',
            message: 'This is a test notification to verify the notifications system is working.',
            isRead: false,
            data: {},
          },
          {
            type: 'BOOKING',
            title: 'New Booking Request',
            message: 'You have received a new booking request from a customer.',
            isRead: false,
            data: { bookingId: `BKG-${Math.floor(Math.random() * 10000)}` },
          },
          {
            type: 'ORDER',
            title: 'New Order Received',
            message: 'A new order has been placed and is waiting for processing.',
            isRead: false,
            data: { orderId: `ORD-${Math.floor(Math.random() * 10000)}` },
          }
        ];
        
        for (const notification of testNotifications) {
          await prisma.notification.create({ data: notification });
          console.log(`Created test notification: ${notification.title}`);
        }
      }
    } catch (error) {
      console.error('Error creating test notifications:', error);
    } finally {
      await prisma.$disconnect();
    }
    
    console.log('\nDatabase setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

main();