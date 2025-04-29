import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create a new PrismaClient instance with improved connection handling
export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['error', 'warn'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  }
});

// Save client reference in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

/**
 * Helper function to handle database operations with retry logic
 * This is especially useful for serverless PostgreSQL services like Neon
 * which may terminate idle connections
 */
export async function executeDbOperation<T>(operation: () => Promise<T>): Promise<T> {
  let retries = 0;
  const maxRetries = 3;
  
  try {
    while (retries < maxRetries) {
      try {
        console.log(`Executing database operation (attempt ${retries + 1}/${maxRetries})`);
        
        // Execute the operation
        const result = await operation();
        console.log('Database operation completed successfully');
        return result;
      } catch (error: any) {
        // Check if this is a connection error that we should retry
        const isConnectionError = 
          error.message?.includes('terminating connection') ||
          error.message?.includes('Connection terminated') ||
          error.message?.includes('Connection refused') ||
          error.message?.includes('ECONNRESET') ||
          error.message?.includes('ETIMEDOUT') ||
          error.code === 'P1001' || // Prisma can't reach database server
          error.code === 'P1002'; // Database server terminated the connection
          
        console.error(`Database operation failed (attempt ${retries + 1}/${maxRetries}):`, error);
        console.error('Error details:', error.message);
        
        if (error.code) {
          console.error('Prisma error code:', error.code);
        }
        
        // If we've reached max retries or it's not a connection error, throw
        if (retries >= maxRetries - 1 || !isConnectionError) {
          console.error('Max retries reached or non-connection error, throwing error');
          throw error;
        }
        
        // Wait before retrying (exponential backoff)
        const backoffTime = 1000 * Math.pow(2, retries);
        console.log(`Retrying in ${backoffTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, backoffTime));
        
        // Try to reconnect explicitly before the next attempt
        try {
          console.log('Attempting to reconnect to database...');
          await prisma.$disconnect();
          await prisma.$connect();
          console.log('Reconnected to database successfully');
        } catch (reconnectError) {
          console.error('Failed to reconnect to database:', reconnectError);
        }
        
        retries++;
      }
    }
    
    // This should never be reached due to the throw in the loop
    console.error('Failed to execute database operation after multiple retries');
    throw new Error('Failed to execute database operation after multiple retries');
  } catch (error: any) {
    // Catch any errors that might occur outside the retry loop
    console.error('Database operation failed completely:', error);
    console.error('Error stack:', error.stack);
    throw error;
  }
}

export default prisma;