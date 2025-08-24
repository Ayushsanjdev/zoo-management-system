import { EnclosureStaff } from '../generated/prisma/client';
import { BaseRepository } from './base.repository';
import { FilterParams } from '../utils/pagination';

export class EnclosureStaffRepository extends BaseRepository<EnclosureStaff> {
  constructor() {
    super('enclosureStaff');
  }

  protected buildWhereClause(filters: FilterParams): any {
    const where: any = {};

    if (filters.staffId) {
      where.staffId = filters.staffId;
    }

    if (filters.enclosureId) {
      where.enclosureId = filters.enclosureId;
    }

    if (filters.assignedAtStart || filters.assignedAtEnd) {
      where.assignedAt = {};
      if (filters.assignedAtStart) where.assignedAt.gte = new Date(filters.assignedAtStart);
      if (filters.assignedAtEnd) where.assignedAt.lte = new Date(filters.assignedAtEnd);
    }

    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    if (filters.search) {
      where.OR = [
        { staff: { name: { contains: filters.search, mode: 'insensitive' } } },
        { staff: { email: { contains: filters.search, mode: 'insensitive' } } },
        { enclosure: { name: { contains: filters.search, mode: 'insensitive' } } },
        { enclosure: { type: { contains: filters.search, mode: 'insensitive' } } },
      ];
    }

    return where;
  }

  async getStaffList(): Promise<string[]> {
    const staffIds = await this.prisma.enclosureStaff.findMany({
      select: { staffId: true },
      distinct: ['staffId'],
      orderBy: { staffId: 'asc' },
    });
    return staffIds.map(s => s.staffId);
  }

  async count() {
    return {
      count: await this.prisma.enclosureStaff.count(),
      addedToday: await this.prisma.enclosureStaff.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    };
  }

  async getEnclosureList(): Promise<string[]> {
    const enclosureIds = await this.prisma.enclosureStaff.findMany({
      select: { enclosureId: true },
      distinct: ['enclosureId'],
      orderBy: { enclosureId: 'asc' },
    });
    return enclosureIds.map(e => e.enclosureId);
  }

  // Override methods to include related data
  async findAll(filters: FilterParams = {}, pagination: any = { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' }) {
    return super.findAll(filters, pagination, {
      staff: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      enclosure: {
        select: {
          id: true,
          name: true,
          type: true,
          capacity: true,
        },
      },
    });
  }

  async findById(id: string) {
    return super.findById(id, {
      staff: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      enclosure: {
        select: {
          id: true,
          name: true,
          type: true,
          capacity: true,
        },
      },
    });
  }

  async update(id: string, data: any) {
    return super.update(id, data, {
      staff: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      enclosure: {
        select: {
          id: true,
          name: true,
          type: true,
          capacity: true,
        },
      },
    });
  }
}
