const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.error('Error: .env file not found. Please create one based on .env.example');
  process.exit(1);
}

console.log('Setting up database...');

try {
  // Generate Prisma client
  console.log('Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Create migrations
  console.log('Creating migrations...');
  execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
  
  console.log('Database setup completed successfully!');
} catch (error) {
  console.error('Error setting up database:', error.message);
  process.exit(1);
}