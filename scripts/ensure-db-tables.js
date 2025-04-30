// Script to ensure database tables are created
const { execSync } = require('child_process');
const path = require('path');

console.log('Ensuring database tables are created...');

try {
  // Run Prisma migrate to ensure tables are created
  console.log('Running prisma migrate deploy...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  
  // Generate Prisma client
  console.log('Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  console.log('Database tables ensured successfully!');
} catch (error) {
  console.error('Error ensuring database tables:', error);
}