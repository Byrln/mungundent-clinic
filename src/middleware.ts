import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This is a simple middleware example that could be expanded with proper authentication
// For a production app, you would want to use a more robust auth solution

export function middleware(request: NextRequest) {
  // Define admin routes that should be protected
  const adminRoutes = [
    '/api/posts',
    '/api/services',
    '/api/products',
  ];
  
  // Define routes that need authentication for specific methods
  // For orders, we allow POST without auth so customers can place orders,
  // but protect other methods (PUT, DELETE, PATCH) for admin use only
  const methodProtectedRoutes = [
    {
      path: '/api/orders',
      methods: ['PUT', 'DELETE', 'PATCH', 'GET'] // Allow POST without auth for customer orders
    }
  ];
  
  // Check if the current path is an admin route
  const isAdminRoute = adminRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route) && 
    (request.method === 'POST' || 
     request.method === 'PUT' || 
     request.method === 'DELETE' || 
     request.method === 'PATCH')
  );
  
  // Check if the current path is a method-protected route
  const isMethodProtectedRoute = methodProtectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route.path) && 
    route.methods.includes(request.method as string)
  );
  
  if (isAdminRoute || isMethodProtectedRoute) {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    console.log(`Auth header for ${request.method} ${request.nextUrl.pathname}:`, authHeader);
    
    // For demo purposes, we're temporarily bypassing auth for GET /api/orders
    // This is just for debugging - remove in production
    if (request.nextUrl.pathname === '/api/orders' && request.method === 'GET') {
      console.log('Bypassing auth for GET /api/orders');
      return NextResponse.next();
    }
    
    // In a real app, you would validate the token properly
    // This is just a placeholder for demonstration
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Missing or invalid auth header format');
      return NextResponse.json(
        { error: 'Unauthorized - Missing or invalid auth header' },
        { status: 401 }
      );
    }
    
    // For demo purposes, we're using a simple API key check
    // In a real app, you would validate JWT tokens or session cookies
    const apiKey = authHeader.split(' ')[1];
    console.log('API Key:', apiKey);
    console.log('Expected API Key:', process.env.ADMIN_API_KEY);
    
    // Accept either the environment variable or a hardcoded demo key
    if (apiKey !== process.env.ADMIN_API_KEY && apiKey !== 'demo-api-key') {
      console.log('Invalid API key');
      return NextResponse.json(
        { error: 'Unauthorized - Invalid API key' },
        { status: 401 }
      );
    }
    
    console.log('Authentication successful');
  }
  
  return NextResponse.next();
}

// Configure the middleware to run only for API routes
export const config = {
  matcher: '/api/:path*',
};