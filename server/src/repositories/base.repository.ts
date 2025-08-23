import { PrismaClient } from '../generated/prisma/client';
import { PaginationParams, PaginationResponse, FilterParams } from '../utils/pagination';

export abstract class BaseRepository<T> {
  protected prisma: PrismaClient;
  protected modelName: string;

  constructor(modelName: string) {
    this.prisma = new PrismaClient();
    this.modelName = modelName;
  }

  async findAll(
    filters: FilterParams = {},
    pagination: PaginationParams = { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' },
    include?: any
  ): Promise<PaginationResponse<T>> {
    const where = this.buildWhereClause(filters);
    const { skip, take, orderBy } = this.buildPaginationClause(pagination);

    const [data, total] = await Promise.all([
      (this.prisma as any)[this.modelName].findMany({
        where,
        skip,
        take,
        orderBy,
        include,
      }),
      (this.prisma as any)[this.modelName].count({ where }),
    ]);

    const page = pagination.page || 1;
    const limit = pagination.limit || 10;

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  async findById(id: string, include?: any): Promise<T | null> {
    return (this.prisma as any)[this.modelName].findUnique({
      where: { id },
      include,
    });
  }

  async create(data: any, include?: any): Promise<T> {
    return (this.prisma as any)[this.modelName].create({
      data,
      include,
    });
  }

  async update(id: string, data: any, include?: any): Promise<T> {
    return (this.prisma as any)[this.modelName].update({
      where: { id },
      data,
      include,
    });
  }

  async delete(id: string): Promise<T> {
    return (this.prisma as any)[this.modelName].delete({
      where: { id },
    });
  }

  protected buildWhereClause(filters: FilterParams): any {
    // Override in child classes for specific filtering logic
    return {};
  }

  protected buildPaginationClause(pagination: PaginationParams) {
    const page = pagination.page || 1;
    const limit = pagination.limit || 10;
    const sortBy = pagination.sortBy || 'createdAt';
    const sortOrder = pagination.sortOrder || 'desc';
    
    const skip = (page - 1) * limit;
    
    return {
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    };
  }
}
