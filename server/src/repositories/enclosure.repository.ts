import { Enclosure } from '../generated/prisma/client';
import { BaseRepository } from './base.repository';
import { FilterParams } from '../utils/pagination';

export class EnclosureRepository extends BaseRepository<Enclosure> {
  constructor() {
    super('enclosure');
  }

  protected buildWhereClause(filters: FilterParams): any {
    const where: any = {};

    if (filters.type) {
      where.type = { contains: filters.type, mode: 'insensitive' };
    }

    if (filters.capacityMin !== undefined || filters.capacityMax !== undefined) {
      where.capacity = {};
      if (filters.capacityMin !== undefined) where.capacity.gte = filters.capacityMin;
      if (filters.capacityMax !== undefined) where.capacity.lte = filters.capacityMax;
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { type: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return where;
  }

  async getTypeList(): Promise<string[]> {
    const types = await this.prisma.enclosure.findMany({
      select: { type: true },
      distinct: ['type'],
      orderBy: { type: 'asc' },
    });
    return types.map(t => t.type);
  }



  // Override methods to include animal count
  async findAll(filters: FilterParams = {}, pagination: any = { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' }) {
    return super.findAll(filters, pagination, {
      _count: {
        select: {
          animals: true,
        },
      },
    });
  }

  async findById(id: string) {
    return super.findById(id, {
      animals: {
        select: {
          id: true,
          name: true,
          species: true,
          healthStatus: true,
        },
      },
      _count: {
        select: {
          animals: true,
        },
      },
    });
  }

  async update(id: string, data: any) {
    return super.update(id, data, {
      animals: {
        select: {
          id: true,
          name: true,
          species: true,
          healthStatus: true,
        },
      },
      _count: {
        select: {
          animals: true,
        },
      },
    });
  }
}
