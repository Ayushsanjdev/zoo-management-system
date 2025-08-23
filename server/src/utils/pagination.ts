export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface FilterParams {
  // Animal filters
  species?: string;
  healthStatus?: string;
  gender?: string;
  enclosureId?: string;
  ageMin?: number;
  ageMax?: number;
  
  // Enclosure filters
  type?: string;
  capacityMin?: number;
  capacityMax?: number;
  status?: string;
  
  // Enclosure Staff filters
  staffId?: string;
  assignedAtStart?: string;
  assignedAtEnd?: string;
  isActive?: boolean;
  
  // Feeding Record filters
  animalId?: string;
  foodType?: string;
  feedingTimeStart?: string;
  feedingTimeEnd?: string;
  quantityMin?: number;
  quantityMax?: number;
  
  // Health Record filters
  vetId?: string;
  checkupDateStart?: string;
  checkupDateEnd?: string;
  medication?: string;
  notes?: string;
  
  // Common filters
  search?: string;
}

export function parsePaginationParams(query: any): PaginationParams {
  const page = Math.max(1, parseInt(query.page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit as string) || 10));
  const sortBy = query.sortBy as string || 'createdAt';
  const sortOrder = (query.sortOrder as string || 'desc').toLowerCase() === 'asc' ? 'asc' : 'desc';

  return { page, limit, sortBy, sortOrder };
}

export function parseFilterParams(query: any): FilterParams {
  return {
    // Animal filters
    species: query.species as string,
    healthStatus: query.healthStatus as string,
    gender: query.gender as string,
    enclosureId: query.enclosureId as string,
    ageMin: query.ageMin ? parseInt(query.ageMin as string) : undefined,
    ageMax: query.ageMax ? parseInt(query.ageMax as string) : undefined,
    
    // Enclosure filters
    type: query.type as string,
    capacityMin: query.capacityMin ? parseInt(query.capacityMin as string) : undefined,
    capacityMax: query.capacityMax ? parseInt(query.capacityMax as string) : undefined,
    status: query.status as string,
    
    // Enclosure Staff filters
    staffId: query.staffId as string,
    assignedAtStart: query.assignedAtStart as string,
    assignedAtEnd: query.assignedAtEnd as string,
    isActive: query.isActive as boolean,
    
    // Feeding Record filters
    animalId: query.animalId as string,
    foodType: query.foodType as string,
    feedingTimeStart: query.feedingTimeStart as string,
    feedingTimeEnd: query.feedingTimeEnd as string,
    quantityMin: query.quantityMin ? parseInt(query.quantityMin as string) : undefined,
    quantityMax: query.quantityMax ? parseInt(query.quantityMax as string) : undefined,
    
    // Health Record filters
    vetId: query.vetId as string,
    checkupDateStart: query.checkupDateStart as string,
    checkupDateEnd: query.checkupDateEnd as string,
    medication: query.medication as string,
    notes: query.notes as string,
    
    // Common filters
    search: query.search as string,
  };
}

export function buildPrismaFilters(filters: FilterParams): any {
  const where: any = {};

  // Animal filters
  if (filters.species) {
    where.species = { contains: filters.species, mode: 'insensitive' };
  }

  if (filters.healthStatus) {
    where.healthStatus = { contains: filters.healthStatus, mode: 'insensitive' };
  }

  if (filters.gender) {
    where.gender = filters.gender;
  }

  if (filters.enclosureId) {
    where.enclosureId = filters.enclosureId;
  }

  if (filters.ageMin !== undefined || filters.ageMax !== undefined) {
    where.age = {};
    if (filters.ageMin !== undefined) where.age.gte = filters.ageMin;
    if (filters.ageMax !== undefined) where.age.lte = filters.ageMax;
  }

  // Enclosure filters
  if (filters.type) {
    where.type = { contains: filters.type, mode: 'insensitive' };
  }

  if (filters.capacityMin !== undefined || filters.capacityMax !== undefined) {
    where.capacity = {};
    if (filters.capacityMin !== undefined) where.capacity.gte = filters.capacityMin;
    if (filters.capacityMax !== undefined) where.capacity.lte = filters.capacityMax;
  }

  if (filters.status) {
    where.status = { contains: filters.status, mode: 'insensitive' };
  }

  // Enclosure Staff filters
  if (filters.staffId) {
    where.staffId = filters.staffId;
  }

  if (filters.assignedAtStart || filters.assignedAtEnd) {
    where.assignedAt = {};
    if (filters.assignedAtStart) where.assignedAt.gte = new Date(filters.assignedAtStart);
    if (filters.assignedAtEnd) where.assignedAt.lte = new Date(filters.assignedAtEnd);
  }

  if (filters.isActive !== undefined) {
    where.isActive = filters.isActive;
  }

  // Feeding Record filters
  if (filters.animalId) {
    where.animalId = filters.animalId;
  }

  if (filters.foodType) {
    where.foodType = { contains: filters.foodType, mode: 'insensitive' };
  }

  if (filters.feedingTimeStart || filters.feedingTimeEnd) {
    where.feedingTime = {};
    if (filters.feedingTimeStart) where.feedingTime.gte = new Date(filters.feedingTimeStart);
    if (filters.feedingTimeEnd) where.feedingTime.lte = new Date(filters.feedingTimeEnd);
  }

  if (filters.quantityMin !== undefined || filters.quantityMax !== undefined) {
    where.quantity = {};
    if (filters.quantityMin !== undefined) where.quantity.gte = filters.quantityMin;
    if (filters.quantityMax !== undefined) where.quantity.lte = filters.quantityMax;
  }

  // Health Record filters
  if (filters.vetId) {
    where.vetId = filters.vetId;
  }

  if (filters.checkupDateStart || filters.checkupDateEnd) {
    where.checkupDate = {};
    if (filters.checkupDateStart) where.checkupDate.gte = new Date(filters.checkupDateStart);
    if (filters.checkupDateEnd) where.checkupDate.lte = new Date(filters.checkupDateEnd);
  }

  if (filters.medication) {
    where.medication = { contains: filters.medication, mode: 'insensitive' };
  }

  if (filters.notes) {
    where.notes = { contains: filters.notes, mode: 'insensitive' };
  }

  // Common search filter
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { type: { contains: filters.search, mode: 'insensitive' } },
      { species: { contains: filters.search, mode: 'insensitive' } },
      { scientificName: { contains: filters.search, mode: 'insensitive' } },
      { staff: { name: { contains: filters.search, mode: 'insensitive' } } },
      { enclosure: { name: { contains: filters.search, mode: 'insensitive' } } },
    ];
  }

  return where;
}

export function buildPrismaPagination(pagination: PaginationParams) {
  const page = pagination.page || 1;
  const limit = pagination.limit || 10;
  const skip = (page - 1) * limit;
  
  return {
    skip,
    take: limit,
    orderBy: { [pagination.sortBy || 'createdAt']: pagination.sortOrder || 'desc' },
  };
}

export function createPaginationResponse<T>(
  data: T[],
  total: number,
  pagination: PaginationParams
): PaginationResponse<T> {
  const page = pagination.page || 1;
  const limit = pagination.limit || 10;
  const totalPages = Math.ceil(total / limit);
  
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}
