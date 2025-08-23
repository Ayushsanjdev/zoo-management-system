import { HealthRecord } from '../generated/prisma/client';
import { BaseRepository } from './base.repository';
import { FilterParams } from '../utils/pagination';

export class HealthRecordRepository extends BaseRepository<HealthRecord> {
  constructor() {
    super('healthRecord');
  }

  protected buildWhereClause(filters: FilterParams): any {
    const where: any = {};

    if (filters.animalId) {
      where.animalId = filters.animalId;
    }

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

    if (filters.search) {
      where.OR = [
        { medication: { contains: filters.search, mode: 'insensitive' } },
        { notes: { contains: filters.search, mode: 'insensitive' } },
        { vet: { name: { contains: filters.search, mode: 'insensitive' } } },
        { animal: { name: { contains: filters.search, mode: 'insensitive' } } },
        { animal: { species: { contains: filters.search, mode: 'insensitive' } } },
      ];
    }

    return where;
  }

  async getVetList(): Promise<Array<{ id: string; name: string; email: string }>> {
    const vets = await this.prisma.user.findMany({
      where: { role: 'VET' },
      select: { id: true, name: true, email: true },
      orderBy: { name: 'asc' },
    });
    return vets;
  }

  async getAnimalList(): Promise<Array<{ id: string; name: string; species: string }>> {
    const animals = await this.prisma.animal.findMany({
      select: { id: true, name: true, species: true },
      orderBy: { name: 'asc' },
    });
    return animals;
  }

  // Override methods to include related data
  async findAll(filters: FilterParams = {}, pagination: any = { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' }) {
    return super.findAll(filters, pagination, {
      vet: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      animal: {
        select: {
          id: true,
          name: true,
          species: true,
          healthStatus: true,
        },
      },
    });
  }

  async findById(id: string) {
    return super.findById(id, {
      vet: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      animal: {
        select: {
          id: true,
          name: true,
          species: true,
          healthStatus: true,
        },
      },
    });
  }

  async update(id: string, data: any) {
    return super.update(id, data, {
      vet: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      animal: {
        select: {
          id: true,
          name: true,
          species: true,
          healthStatus: true,
        },
      },
    });
  }
}
