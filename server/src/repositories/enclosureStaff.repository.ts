import { PrismaClient, EnclosureStaff } from '../generated/prisma/client';

const prisma = new PrismaClient();

export class EnclosureStaffRepository {
  async create(data: any): Promise<EnclosureStaff> {
    return prisma.enclosureStaff.create({ data });
  }

  async findAll(filters: any = {}): Promise<EnclosureStaff[]> {
    return prisma.enclosureStaff.findMany({ where: filters });
  }

  async findById(id: string): Promise<EnclosureStaff | null> {
    return prisma.enclosureStaff.findUnique({ where: { id } });
  }

  async update(id: string, data: any): Promise<EnclosureStaff> {
    return prisma.enclosureStaff.update({ where: { id }, data });
  }

  async delete(id: string): Promise<EnclosureStaff> {
    return prisma.enclosureStaff.delete({ where: { id } });
  }
}
