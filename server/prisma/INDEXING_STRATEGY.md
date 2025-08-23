# Database Indexing Strategy for Zoo Management System

## Overview

This document outlines the database indexing strategy implemented for the Zoo Management System to optimize query performance and improve overall system responsiveness.

## Index Types Implemented

### 1. Single-Column Indexes

These indexes optimize queries that filter on individual columns:

#### User Table
- `role` - For filtering users by role (ADMIN, STAFF, VET, USER)
- `createdAt` - For sorting and filtering by user creation date

#### Animal Table
- `species` - For filtering animals by species
- `healthStatus` - For filtering by health status
- `gender` - For filtering by gender
- `enclosureId` - For finding animals in specific enclosures
- `age` - For age-based filtering and sorting
- `createdAt` - For sorting by creation date
- `name` - For name-based searches
- `scientificName` - For scientific name searches

#### Enclosure Table
- `type` - For filtering enclosures by type
- `capacity` - For capacity-based queries
- `createdAt` - For sorting by creation date
- `name` - For name-based searches

#### EnclosureStaff Table
- `staffId` - For finding staff assignments
- `enclosureId` - For finding enclosure assignments
- `assignedAt` - For assignment date queries
- `createdAt` - For sorting by creation date

#### FeedingRecord Table
- `staffId` - For finding feeding records by staff member
- `animalId` - For finding feeding records by animal
- `foodType` - For filtering by food type
- `feedingTime` - For time-based queries
- `createdAt` - For sorting by creation date

#### HealthRecord Table
- `animalId` - For finding health records by animal
- `vetId` - For finding health records by veterinarian
- `checkupDate` - For date-based queries
- `createdAt` - For sorting by creation date

### 2. Composite Indexes

These indexes optimize queries that filter on multiple columns simultaneously:

#### Animal Table
- `[species, healthStatus]` - For queries filtering by both species and health status
- `[enclosureId, species]` - For finding animals of specific species in specific enclosures

#### EnclosureStaff Table
- `[staffId, enclosureId]` - For finding specific staff-enclosure assignments
- `[enclosureId, assignedAt]` - For finding assignments in enclosures by date

#### FeedingRecord Table
- `[animalId, feedingTime]` - For finding feeding records for animals by time
- `[staffId, feedingTime]` - For finding feeding records by staff member and time
- `[animalId, foodType]` - For finding specific food types for specific animals

#### HealthRecord Table
- `[animalId, checkupDate]` - For finding health records for animals by date
- `[vetId, checkupDate]` - For finding health records by veterinarian and date
- `[animalId, vetId]` - For finding health records for specific animal-vet combinations

## Query Performance Benefits

### 1. Text Search Optimization
- Indexes on `name`, `species`, `scientificName` fields improve text search performance
- Case-insensitive searches using `contains` and `mode: 'insensitive'` benefit from these indexes

### 2. Date Range Queries
- Indexes on date fields (`createdAt`, `feedingTime`, `checkupDate`, `assignedAt`) optimize range queries
- Composite indexes with dates improve queries filtering by both entity and time

### 3. Foreign Key Relationships
- Indexes on foreign key fields (`enclosureId`, `staffId`, `animalId`, `vetId`) improve JOIN performance
- These are essential for efficient relationship queries

### 4. Filtering and Sorting
- Single-column indexes improve WHERE clause performance
- Date indexes improve ORDER BY performance on time-based sorting

## Monitoring and Maintenance

### 1. Index Usage Monitoring
Monitor index usage with PostgreSQL queries:
```sql
-- Check index usage statistics
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

### 2. Query Performance Analysis
Use `EXPLAIN ANALYZE` to verify index usage:
```sql
EXPLAIN ANALYZE SELECT * FROM "Animal" WHERE species = 'Lion' AND healthStatus = 'Healthy';
```

### 3. Index Maintenance
- PostgreSQL automatically maintains indexes
- Monitor index size and rebuild if necessary:
```sql
-- Rebuild an index
REINDEX INDEX "Animal_species_idx";
```

## Best Practices Applied

### 1. Selective Indexing
- Only indexed columns that are frequently used in WHERE, ORDER BY, or JOIN clauses
- Avoided over-indexing to prevent write performance degradation

### 2. Composite Index Order
- Placed most selective columns first in composite indexes
- Considered query patterns when ordering composite index columns

### 3. Foreign Key Indexing
- All foreign key columns are indexed for optimal JOIN performance
- Essential for maintaining referential integrity efficiently

### 4. Date Field Indexing
- Indexed all date fields for time-based queries and sorting
- Composite indexes with dates optimize common time-range queries

## Future Considerations

### 1. Full-Text Search
If text search requirements grow, consider implementing:
- PostgreSQL full-text search with GIN indexes
- Trigram indexes for fuzzy matching

### 2. Partitioning
For large datasets, consider table partitioning:
- Partition by date for time-series data (feeding records, health records)
- Partition by species for animal data

### 3. Additional Indexes
Monitor query patterns and consider adding:
- Partial indexes for specific conditions
- Expression indexes for computed columns
- Unique indexes where appropriate

## Migration Commands

To apply these indexes:
```bash
# Generate and apply migration
npx prisma migrate dev --name add_database_indexes

# Reset database (development only)
npx prisma migrate reset

# Deploy to production
npx prisma migrate deploy
```

## Performance Testing

After implementing indexes, test performance improvements:
1. Run common queries with `EXPLAIN ANALYZE`
2. Compare query execution times before and after indexing
3. Monitor application response times
4. Test with realistic data volumes

## Conclusion

This indexing strategy provides a solid foundation for optimal query performance in the Zoo Management System. Regular monitoring and maintenance will ensure continued performance benefits as the system scales.
