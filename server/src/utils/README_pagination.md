# Pagination & Filtering System

This directory contains utilities for implementing consistent pagination and filtering across all APIs in the Zoo Management System.

## Features

- **Pagination**: Page-based pagination with configurable limits
- **Filtering**: Multi-field filtering with search capabilities
- **Sorting**: Configurable sorting by any field
- **Search**: Full-text search across multiple fields
- **Consistent Response Format**: Standardized pagination response structure

## Usage

### Basic Pagination

```typescript
// GET /api/animals?page=1&limit=10&sortBy=name&sortOrder=asc
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "totalPages": 15,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Filtering Examples

#### Animal Filters
```bash
# Filter by Species
GET /api/animals?species=Lion

# Filter by Health Status
GET /api/animals?healthStatus=Healthy

# Filter by Age Range
GET /api/animals?ageMin=5&ageMax=15

# Search Across Multiple Fields
GET /api/animals?search=leo
# Searches in: name, species, scientificName
```

#### Enclosure Filters
```bash
# Filter by Type
GET /api/enclosures?type=Savanna

# Filter by Capacity Range
GET /api/enclosures?capacityMin=10&capacityMax=50

# Filter by Status
GET /api/enclosures?status=Active

# Search
GET /api/enclosures?search=lion
# Searches in: name, type
```

#### Enclosure Staff Filters
```bash
# Filter by Staff Member
GET /api/enclosure-staff?staffId=staff123

# Filter by Enclosure
GET /api/enclosure-staff?enclosureId=enclosure456

# Filter by Assignment Date Range
GET /api/enclosure-staff?assignedAtStart=2024-01-01&assignedAtEnd=2024-12-31

# Filter by Active Status
GET /api/enclosure-staff?isActive=true

# Search
GET /api/enclosure-staff?search=john
# Searches in: staff name, staff email, enclosure name, enclosure type
```

#### Feeding Record Filters
```bash
# Filter by Animal
GET /api/feeding-records?animalId=animal123

# Filter by Staff Member
GET /api/feeding-records?staffId=staff456

# Filter by Food Type
GET /api/feeding-records?foodType=Meat

# Filter by Feeding Time Range
GET /api/feeding-records?feedingTimeStart=2024-01-01&feedingTimeEnd=2024-12-31

# Filter by Quantity Range
GET /api/feeding-records?quantityMin=1&quantityMax=5

# Search
GET /api/feeding-records?search=meat
# Searches in: food type, staff name, animal name, animal species
```

#### Health Record Filters
```bash
# Filter by Animal
GET /api/health-records?animalId=animal123

# Filter by Veterinarian
GET /api/health-records?vetId=vet456

# Filter by Checkup Date Range
GET /api/health-records?checkupDateStart=2024-01-01&checkupDateEnd=2024-12-31

# Filter by Medication
GET /api/health-records?medication=antibiotics

# Filter by Notes
GET /api/health-records?notes=checkup

# Search
GET /api/health-records?search=checkup
# Searches in: medication, notes, vet name, animal name, animal species
```

#### Multiple Filters Combined
```bash
GET /api/animals?species=Lion&healthStatus=Healthy&gender=Male&page=1&limit=20
GET /api/enclosures?type=Savanna&capacityMin=10&status=Active&page=1&limit=15
GET /api/enclosure-staff?staffId=staff123&isActive=true&page=1&limit=10
GET /api/feeding-records?animalId=animal123&foodType=Meat&page=1&limit=10
GET /api/health-records?vetId=vet456&checkupDateStart=2024-01-01&page=1&limit=10
```

### Available Query Parameters

#### Pagination Parameters
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 100)
- `sortBy` (string): Field to sort by (default: 'createdAt')
- `sortOrder` (string): 'asc' or 'desc' (default: 'desc')

#### Animal Filter Parameters
- `species` (string): Filter by animal species
- `healthStatus` (string): Filter by health status
- `gender` (string): Filter by gender
- `enclosureId` (string): Filter by enclosure
- `ageMin` (number): Minimum age filter
- `ageMax` (number): Maximum age filter

#### Enclosure Filter Parameters
- `type` (string): Filter by enclosure type
- `capacityMin` (number): Minimum capacity filter
- `capacityMax` (number): Maximum capacity filter
- `status` (string): Filter by enclosure status

#### Enclosure Staff Filter Parameters
- `staffId` (string): Filter by staff member
- `enclosureId` (string): Filter by enclosure
- `assignedAtStart` (string): Start date for assignment filter
- `assignedAtEnd` (string): End date for assignment filter
- `isActive` (boolean): Filter by active status

#### Feeding Record Filter Parameters
- `animalId` (string): Filter by animal
- `staffId` (string): Filter by staff member
- `foodType` (string): Filter by food type
- `feedingTimeStart` (string): Start date for feeding time filter
- `feedingTimeEnd` (string): End date for feeding time filter
- `quantityMin` (number): Minimum quantity filter
- `quantityMax` (number): Maximum quantity filter

#### Health Record Filter Parameters
- `animalId` (string): Filter by animal
- `vetId` (string): Filter by veterinarian
- `checkupDateStart` (string): Start date for checkup filter
- `checkupDateEnd` (string): End date for checkup filter
- `medication` (string): Filter by medication
- `notes` (string): Filter by notes content

#### Common Filter Parameters
- `search` (string): Search across multiple fields

## API Endpoints

### Animal Endpoints

#### Get Animals with Pagination & Filtering
```bash
GET /api/animals
GET /api/animals?page=1&limit=20&species=Lion&healthStatus=Healthy
```

#### Get Filter Options
```bash
GET /api/animals/filters/options
# Returns: { species: [...], healthStatuses: [...], genders: [...] }
```

#### Get Species List
```bash
GET /api/animals/filters/species
# Returns: ["Lion", "Tiger", "Elephant", ...]
```

#### Get Health Status List
```bash
GET /api/animals/filters/health-status
# Returns: ["Healthy", "Sick", "Recovering", ...]
```

### Enclosure Endpoints

#### Get Enclosures with Pagination & Filtering
```bash
GET /api/enclosures
GET /api/enclosures?page=1&limit=15&type=Savanna&capacityMin=10
```

#### Get Filter Options
```bash
GET /api/enclosures/filters/options
# Returns: { types: [...], statuses: [...], capacityRanges: [...] }
```

#### Get Type List
```bash
GET /api/enclosures/filters/type
# Returns: ["Savanna", "Aquarium", "Aviary", ...]
```

#### Get Status List
```bash
GET /api/enclosures/filters/status
# Returns: ["Active", "Maintenance", "Closed", ...]
```

### Enclosure Staff Endpoints

#### Get Enclosure Staff with Pagination & Filtering
```bash
GET /api/enclosure-staff
GET /api/enclosure-staff?page=1&limit=10&staffId=staff123&isActive=true
```

#### Get Filter Options
```bash
GET /api/enclosure-staff/filters/options
# Returns: { staffIds: [...], enclosureIds: [...], statusOptions: [...], dateRanges: [...] }
```

#### Get Staff List
```bash
GET /api/enclosure-staff/filters/staff
# Returns: ["staff123", "staff456", ...]
```

#### Get Enclosure List
```bash
GET /api/enclosure-staff/filters/enclosures
# Returns: ["enclosure123", "enclosure456", ...]
```

### Feeding Record Endpoints

#### Get Feeding Records with Pagination & Filtering
```bash
GET /api/feeding-records
GET /api/feeding-records?page=1&limit=10&animalId=animal123&foodType=Meat
```

### Health Record Endpoints

#### Get Health Records with Pagination & Filtering
```bash
GET /api/health-records
GET /api/health-records?page=1&limit=10&vetId=vet456&checkupDateStart=2024-01-01
```

## Implementation

### Controller Example
```typescript
import { parsePaginationParams, parseFilterParams } from '../utils/pagination';

async getAll(req: Request, res: Response) {
  const pagination = parsePaginationParams(req.query);
  const filters = parseFilterParams(req.query);
  
  const result = await animalService.getAllAnimals(filters, pagination);
  res.json(result);
}
```

### Service Example
```typescript
async getAllAnimals(filters: FilterParams, pagination: PaginationParams) {
  return animalRepository.findAll(filters, pagination);
}
```

### Repository Example
```typescript
export class AnimalRepository extends BaseRepository<Animal> {
  protected buildWhereClause(filters: FilterParams): any {
    const where: any = {};
    
    if (filters.species) {
      where.species = { contains: filters.species, mode: 'insensitive' };
    }
    
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { species: { contains: filters.search, mode: 'insensitive' } },
      ];
    }
    
    return where;
  }
}
```

## Response Format

### Success Response
```json
{
  "data": [
    {
      "id": "1",
      "name": "Leo",
      "species": "Lion",
      "healthStatus": "Healthy",
      "enclosure": {
        "id": "1",
        "name": "Lion Enclosure",
        "type": "Savanna"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "totalPages": 15,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Error Response
```json
{
  "error": "Invalid pagination parameters",
  "status": 400
}
```