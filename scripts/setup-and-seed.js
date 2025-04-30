// Script to set up the database and seed it with sample data
require('dotenv').config();
const { execSync } = require('child_process');
const path = require('path');

async function setupAndSeed() {
  try {
    console.log('Setting up database and seeding data...');
    
    // Generate Prisma client
    console.log('\n1. Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    // Create migrations
    console.log('\n2. Creating migrations...');
    execSync('npx prisma migrate dev --name add_order_models', { stdio: 'inherit' });
    
    // Seed the database with sample data
    console.log('\n3. Seeding database with sample data...');
    
    // Import the PrismaClient after it's been generated
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    try {
      // Create sample products
      console.log('Creating sample products...');
      const products = await Promise.all([
        prisma.product.create({
          data: {
            title: 'Dental Cleaning Kit',
            description: 'Professional dental cleaning kit for home use',
            price: 29.99,
            imageUrl: 'https://example.com/images/cleaning-kit.jpg',
            category: 'Dental Care',
          }
        }),
        prisma.product.create({
          data: {
            title: 'Electric Toothbrush',
            description: 'Advanced electric toothbrush with multiple settings',
            price: 89.99,
            imageUrl: 'https://example.com/images/toothbrush.jpg',
            category: 'Dental Care',
          }
        }),
        prisma.product.create({
          data: {
            title: 'Teeth Whitening Kit',
            description: 'Professional-grade teeth whitening kit',
            price: 49.99,
            imageUrl: 'https://example.com/images/whitening-kit.jpg',
            category: 'Cosmetic',
          }
        })
      ]);
      
      console.log(`Created ${products.length} sample products`);
      
      // Create sample orders
      console.log('Creating sample orders...');
      const orders = await Promise.all([
        prisma.order.create({
          data: {
            customerName: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            address: '123 Main St',
            city: 'Anytown',
            postalCode: '12345',
            totalAmount: 119.98,
            paymentMethod: 'Credit Card',
            status: 'completed',
            items: {
              create: [
                {
                  productId: products[0].id,
                  quantity: 1,
                  price: products[0].price
                },
                {
                  productId: products[1].id,
                  quantity: 1,
                  price: products[1].price
                }
              ]
            }
          }
        }),
        prisma.order.create({
          data: {
            customerName: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+0987654321',
            address: '456 Oak Ave',
            city: 'Othertown',
            postalCode: '54321',
            totalAmount: 49.99,
            paymentMethod: 'PayPal',
            status: 'pending',
            items: {
              create: [
                {
                  productId: products[2].id,
                  quantity: 1,
                  price: products[2].price
                }
              ]
            }
          }
        })
      ]);
      
      console.log(`Created ${orders.length} sample orders`);
      
      // Create sample bookings
      console.log('Creating sample bookings...');
      const bookings = await Promise.all([
        prisma.booking.create({
          data: {
            name: 'Alice Johnson',
            phone: '+1234567890',
            serviceType: 'Dental Checkup',
            date: new Date(Date.now() + 86400000), // Tomorrow
            time: '10:00 AM',
            message: 'First time patient',
          }
        }),
        prisma.booking.create({
          data: {
            name: 'Bob Smith',
            phone: '+0987654321',
            serviceType: 'Teeth Cleaning',
            date: new Date(Date.now() + 172800000), // Day after tomorrow
            time: '2:30 PM',
            message: null,
          }
        }),
        prisma.booking.create({
          data: {
            name: 'Carol White',
            phone: '+1122334455',
            serviceType: 'Root Canal',
            date: new Date(Date.now() + 259200000), // 3 days from now
            time: '11:15 AM',
            message: 'Please call to confirm',
          }
        })
      ]);
      
      console.log(`Created ${bookings.length} sample bookings`);
      
    } catch (error) {
      console.error('Error seeding data:', error);
    } finally {
      await prisma.$disconnect();
    }
    
    console.log('\nDatabase setup and seeding completed successfully!');
    
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupAndSeed();