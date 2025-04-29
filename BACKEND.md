# Dental Clinic Backend

This document provides information about the backend API for the Dental Clinic project.

## Setup

1. Create a `.env` file in the root directory based on `.env.example`:

```
DATABASE_URL="postgresql://neondb_owner:npg_7WFl5Jswfkhz@ep-black-band-a1b5t44i-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
ADMIN_API_KEY="your-secure-api-key-here"
NODE_ENV="development"
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database:

```bash
npm run setup-db
```

This will generate the Prisma client and apply migrations.

## Database Management

- Generate Prisma client: `npm run prisma:generate`
- Create migrations: `npm run prisma:migrate`
- Open Prisma Studio: `npm run prisma:studio`

## API Endpoints

### Posts

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post (protected)
- `GET /api/posts/:id` - Get a post by ID
- `PUT /api/posts/:id` - Update a post (protected)
- `DELETE /api/posts/:id` - Delete a post (protected)

### Services

- `GET /api/services` - Get all services
- `POST /api/services` - Create a new service (protected)
- `GET /api/services/:id` - Get a service by ID
- `PUT /api/services/:id` - Update a service (protected)
- `DELETE /api/services/:id` - Delete a service (protected)

### Bookings

- `GET /api/bookings` - Get all bookings (protected)
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:id` - Get a booking by ID (protected)
- `PUT /api/bookings/:id` - Update a booking (protected)
- `DELETE /api/bookings/:id` - Delete a booking (protected)

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product (protected)
- `GET /api/products/:id` - Get a product by ID
- `PUT /api/products/:id` - Update a product (protected)
- `DELETE /api/products/:id` - Delete a product (protected)

### Cart

- `POST /api/cart` - Validate cart items and get updated product information

### Orders

- `GET /api/orders` - Get all orders (protected)
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get an order by ID
- `PATCH /api/orders/:id` - Update order status (protected)
- `DELETE /api/orders/:id` - Cancel an order (protected)

## Authentication

Protected routes require authentication. Include an Authorization header with a Bearer token:

```
Authorization: Bearer your-api-key-here
```

The API key should match the `ADMIN_API_KEY` environment variable.

## Models

The database schema includes the following models:

- **Post**: Blog posts
- **Service**: Dental services
- **Booking**: Appointment bookings
- **Product**: Shop products
- **Order**: Customer orders
- **OrderItem**: Items within an order

## Error Handling

All API endpoints return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

Error responses include an `error` field with a descriptive message.