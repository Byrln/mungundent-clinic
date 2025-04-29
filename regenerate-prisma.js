const { execSync } = require('child_process');

console.log('Regenerating Prisma client...');

try {
  // Generate Prisma client
  console.log('Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  console.log('Prisma client regenerated successfully!');
} catch (error) {
  console.error('Error regenerating Prisma client:', error.message);
  process.exit(1);
}