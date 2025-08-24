# Zoo Management System API Endpoints

## Overview

This document lists all available API endpoints for the Zoo Management System. All endpoints require authentication unless otherwise specified.

## Authentication

All endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Base URL

```
http://localhost:3000
```

## API Endpoints

### 🦁 Animals

#### Main CRUD Operations
- `GET /api/animals` - Get all animals (with pagination and filtering)
- `GET /api/animals/:id` - Get animal by ID
- `POST /api/animals` - Create new animal (STAFF+)
- `PUT /api/animals/:id` - Update animal (STAFF+)
- `DELETE /api/animals/:id` - Delete animal (ADMIN only)

#### Filter Options
- `GET /api/animals/filter-options` - Get all filter options
- `GET /api/animals/species` - Get list of species
- `GET /api/animals/health-status` - Get list of health statuses

#### Query Parameters
- `species` - Filter by species
- `healthStatus` - Filter by health status
- `gender` - Filter by gender
- `enclosureId` - Filter by enclosure
- `ageMin` / `ageMax` - Filter by age range
- `search` - Text search across name, species, scientific name
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction (asc/desc, default: desc)

### 🏠 Enclosures

#### Main CRUD Operations
- `GET /api/enclosures` - Get all enclosures (with pagination and filtering)
- `GET /api/enclosures/:id` - Get enclosure by ID
- `POST /api/enclosures` - Create new enclosure (STAFF+)
- `PUT /api/enclosures/:id` - Update enclosure (STAFF+)
- `DELETE /api/enclosures/:id` - Delete enclosure (ADMIN only)

#### Filter Options
- `GET /api/enclosures/filter-options` - Get all filter options
- `GET /api/enclosures/types` - Get list of enclosure types

#### Query Parameters
- `type` - Filter by enclosure type
- `capacityMin` / `capacityMax` - Filter by capacity range
- `search` - Text search across name and type
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction (asc/desc, default: desc)

### 🍽️ Feeding Records

#### Main CRUD Operations
- `GET /api/feeding-records` - Get all feeding records (with pagination and filtering)
- `GET /api/feeding-records/:id` - Get feeding record by ID
- `POST /api/feeding-records` - Create new feeding record (STAFF+)
- `PUT /api/feeding-records/:id` - Update feeding record (STAFF+)
- `DELETE /api/feeding-records/:id` - Delete feeding record (ADMIN only)

#### Filter Options
- `GET /api/feeding-records/filter-options` - Get all filter options
- `GET /api/feeding-records/food-types` - Get list of food types
- `GET /api/feeding-records/staff` - Get list of staff members
- `GET /api/feeding-records/animals` - Get list of animals

#### Query Parameters
- `staffId` - Filter by staff member
- `animalId` - Filter by animal
- `foodType` - Filter by food type
- `feedingTimeStart` / `feedingTimeEnd` - Filter by date range
- `quantityMin` / `quantityMax` - Filter by quantity range
- `search` - Text search across food type, staff name, animal name, species
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction (asc/desc, default: desc)

### 🏥 Health Records

#### Main CRUD Operations
- `GET /api/health-records` - Get all health records (with pagination and filtering)
- `GET /api/health-records/:id` - Get health record by ID
- `POST /api/health-records` - Create new health record (STAFF+)
- `PUT /api/health-records/:id` - Update health record (STAFF+)
- `DELETE /api/health-records/:id` - Delete health record (ADMIN only)

#### Filter Options
- `GET /api/health-records/filter-options` - Get all filter options
- `GET /api/health-records/vets` - Get list of veterinarians
- `GET /api/health-records/animals` - Get list of animals

#### Query Parameters
- `animalId` - Filter by animal
- `vetId` - Filter by veterinarian
- `checkupDateStart` / `checkupDateEnd` - Filter by date range
- `medication` - Filter by medication
- `notes` - Filter by notes content
- `search` - Text search across medication, notes, vet name, animal name, species
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction (asc/desc, default: desc)

### 👥 Enclosure Staff

#### Main CRUD Operations
- `GET /api/enclosure-staff` - Get all enclosure staff (with pagination and filtering)
- `GET /api/enclosure-staff/:id` - Get enclosure staff by ID
- `POST /api/enclosure-staff` - Create new enclosure staff (ADMIN only)
- `PUT /api/enclosure-staff/:id` - Update enclosure staff (ADMIN only)
- `DELETE /api/enclosure-staff/:id` - Delete enclosure staff (ADMIN only)

#### Filter Options
- `GET /api/enclosure-staff/filter-options` - Get all filter options
- `GET /api/enclosure-staff/staff` - Get list of staff members
- `GET /api/enclosure-staff/enclosures` - Get list of enclosures

#### Query Parameters
- `staffId` - Filter by staff member
- `enclosureId` - Filter by enclosure
- `assignedAtStart` / `assignedAtEnd` - Filter by assignment date range
- `isActive` - Filter by active status
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction (asc/desc, default: desc)

### 👤 Users

#### Main CRUD Operations
- `GET /api/users` - Get all users (with pagination and filtering)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user (ADMIN only)
- `PUT /api/users/:id` - Update user (ADMIN only)
- `DELETE /api/users/:id` - Delete user (ADMIN only)

#### Query Parameters
- `role` - Filter by user role (ADMIN, STAFF, VET, USER)
- `search` - Text search across name and email
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction (asc/desc, default: desc)

## Response Format

### Success Response
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

## Filter Options Response Format

### Animal Filter Options
```json
{
  "species": ["Lion", "Elephant", "Tiger"],
  "healthStatus": ["Healthy", "Sick", "Recovering"],
  "gender": ["Male", "Female"],
  "enclosures": [
    { "id": "uuid", "name": "Lion Safari" }
  ]
}
```

### Enclosure Filter Options
```json
{
  "types": ["Safari", "Aquarium", "Aviary"],
  "capacityRanges": [
    { "label": "Small (1-5)", "min": 1, "max": 5 },
    { "label": "Medium (6-15)", "min": 6, "max": 15 },
    { "label": "Large (16-30)", "min": 16, "max": 30 },
    { "label": "Extra Large (31+)", "min": 31, "max": null }
  ]
}
```

### Feeding Record Filter Options
```json
{
  "foodTypes": ["Meat", "Vegetables", "Fruits"],
  "staff": [
    { "id": "uuid", "name": "John Doe", "email": "john@zoo.com" }
  ],
  "animals": [
    { "id": "uuid", "name": "Leo", "species": "Lion" }
  ]
}
```

### Health Record Filter Options
```json
{
  "vets": [
    { "id": "uuid", "name": "Dr. Smith", "email": "smith@zoo.com" }
  ],
  "animals": [
    { "id": "uuid", "name": "Leo", "species": "Lion" }
  ]
}
```

### Enclosure Staff Filter Options
```json
{
  "staff": [
    { "id": "uuid", "name": "John Doe", "email": "john@zoo.com" }
  ],
  "enclosures": [
    { "id": "uuid", "name": "Lion Safari" }
  ]
}
```

## Rate Limiting

All endpoints are rate limited to 200 requests per 15 minutes per IP address.

## Testing

Use the provided test script to verify all endpoints:

```bash
npm run test-all-apis
```

This will test all endpoints, filters, and filter options to ensure they're working correctly.
