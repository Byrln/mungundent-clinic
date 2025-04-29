// Direct database connection test using pg
const { Client } = require('pg');
require('dotenv').config();

async function main() {
  console.log('Testing direct PostgreSQL connection...');
  
  // Parse the DATABASE_URL
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL is not set in environment variables');
    process.exit(1);
  }
  
  // Create a new client
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected successfully!');
    
    console.log('Running a simple query...');
    const result = await client.query('SELECT NOW() as time');
    console.log(`Current database time: ${result.rows[0].time}`);
    
    console.log('All tests passed!');
  } catch (error) {
    console.error('Database connection test failed:');
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
    console.log('Disconnected from database.');
  }
}

main();