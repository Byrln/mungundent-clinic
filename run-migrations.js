const { execSync } = require('child_process');

console.log('Running database migrations...');

try {
  // Run migrations
  console.log('Running Prisma migrations...');
  execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
  
  console.log('Database migrations completed successfully!');
} catch (error) {
  console.error('Error running database migrations:', error.message);
  process.exit(1);
}