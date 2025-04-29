# Dental Clinic Admin Dashboard

This document provides information about the admin dashboard for the Dental Clinic project.

## Overview

The admin dashboard provides a comprehensive interface for managing the dental clinic website, including:

- Dashboard overview with key statistics
- Booking management
- Order management
- Product management
- Service management
- Blog post management
- Settings configuration

## Structure

The admin dashboard is organized as follows:

```
/src/app/admin/
├── page.tsx                # Main dashboard page
├── layout.tsx              # Admin layout with sidebar and header
├── bookings/               # Booking management
│   └── page.tsx
├── orders/                 # Order management
│   └── page.tsx
├── products/               # Product management
│   └── page.tsx
├── services/               # Service management
│   └── page.tsx
├── posts/                  # Blog post management
│   └── page.tsx
└── settings/               # Settings configuration
    └── page.tsx
```

## Components

The admin dashboard uses the following components:

```
/src/components/admin/
├── AdminHeader.tsx         # Admin header component
├── AdminSidebar.tsx        # Admin sidebar navigation
├── DashboardStats.tsx      # Dashboard statistics cards
├── RecentBookings.tsx      # Recent bookings widget
├── RecentOrders.tsx        # Recent orders widget
├── bookings/               # Booking management components
│   └── BookingsTable.tsx
├── orders/                 # Order management components
│   └── OrdersTable.tsx
├── products/               # Product management components
│   └── ProductsTable.tsx
├── services/               # Service management components
│   └── ServicesTable.tsx
├── posts/                  # Blog post management components
│   └── PostsTable.tsx
└── settings/               # Settings components
    └── SettingsForm.tsx
```

## Features

### Dashboard

- Overview of key statistics (bookings, orders, revenue, products)
- Recent bookings widget
- Recent orders widget

### Bookings Management

- View all bookings
- Search and filter bookings
- Edit and delete bookings

### Orders Management

- View all orders
- Search and filter orders by status
- View order details
- Update order status

### Products Management

- View all products
- Search and filter products
- Add, edit, and delete products
- Toggle product stock status

### Services Management

- View all services
- Search services
- Add, edit, and delete services

### Blog Posts Management

- View all blog posts
- Search posts
- Add, edit, and delete posts

### Settings

- General settings (site name, contact information, etc.)
- API settings (API key management)

## Integration with Backend

The admin dashboard is designed to work with the backend API. In the current implementation, it uses mock data for demonstration purposes, but it can be easily connected to the real API endpoints:

- `/api/bookings` - For booking management
- `/api/orders` - For order management
- `/api/products` - For product management
- `/api/services` - For service management
- `/api/posts` - For blog post management

## Authentication

The admin dashboard should be protected with authentication. Currently, it doesn't implement authentication, but it should be added before deployment to production.

## Future Improvements

- Add authentication for admin users
- Implement form validation
- Add image upload functionality
- Create detailed views for each entity
- Add analytics and reporting features
- Implement real-time notifications