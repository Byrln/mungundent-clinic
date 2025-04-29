// Database configuration options
export const dbConfig = {
  // Connection options
  connection: {
    // Maximum number of connection attempts
    maxRetries: 3,
    // Base delay between retries in milliseconds (will be multiplied by 2^retryCount)
    retryDelay: 1000,
    // Connection timeout in milliseconds
    timeout: 30000,
  },
  
  // Query options
  query: {
    // Maximum number of query retries
    maxRetries: 2,
    // Base delay between query retries in milliseconds
    retryDelay: 500,
  },
  
  // Logging options
  logging: {
    // Log levels to include
    levels: ['error', 'warn'],
    // Whether to log query parameters
    params: false,
    // Whether to log query duration
    duration: true,
  },
};

// Helper function to wait with exponential backoff
export function wait(retryCount: number, baseDelay = dbConfig.connection.retryDelay): Promise<void> {
  const delay = baseDelay * Math.pow(2, retryCount);
  return new Promise(resolve => setTimeout(resolve, delay));
}