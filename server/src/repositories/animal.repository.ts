import { Animal } from '../generated/prisma/client';
import { BaseRepository } from './base.repository';
import { FilterParams } from '../utils/pagination';

export class AnimalRepository extends BaseRepository<Animal> {
  constructor() {
    super('animal');
  }

  protected buildWhereClause(filters: FilterParams): any {
    const where: any = {};

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

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { species: { contains: filters.search, mode: 'insensitive' } },
        { scientificName: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return where;
  }

  async getSpeciesList(): Promise<string[]> {
    const species = await this.prisma.animal.findMany({
      select: { species: true },
      distinct: ['species'],
      orderBy: { species: 'asc' },
    });
    return species.map(s => s.species);
  }

  async getHealthStatusList(): Promise<string[]> {
    const healthStatuses = await this.prisma.animal.findMany({
      select: { healthStatus: true },
      distinct: ['healthStatus'],
      orderBy: { healthStatus: 'asc' },
    });
    return healthStatuses.map(h => h.healthStatus).filter((status): status is string => status !== null);
  }

  // Override methods to include enclosure data
  async findAll(filters: FilterParams = {}, pagination: any = { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' }) {
    return super.findAll(filters, pagination, {
      enclosure: {
        select: {
          id: true,
          name: true,
          type: true,
        },
      },
    });
  }

  async findById(id: string) {
    return super.findById(id, {
      enclosure: {
        select: {
          id: true,
          name: true,
          type: true,
        },
      },
    });
  }
  

  async count() {
    return {
      count: await this.prisma.animal.count(),
      addedToday: await this.prisma.animal.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    };
  }

  async update(id: string, data: any) {
    return super.update(id, data, {
      enclosure: {
        select: {
          id: true,
          name: true,
          type: true,
        },
      },
    });
  }
}
