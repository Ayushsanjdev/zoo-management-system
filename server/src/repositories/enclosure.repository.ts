import { PrismaClient, Enclosure } from '../generated/prisma/client';

const prisma = new PrismaClient();

export class EnclosureRepository {
  async create(data: any): Promise<Enclosure> {
    return prisma.enclosure.create({ data });
  }

  async findAll(filters: any = {}): Promise<Enclosure[]> {
    return prisma.enclosure.findMany({ where: filters });
  }

  async findById(id: string): Promise<Enclosure | null> {
    return prisma.enclosure.findUnique({ where: { id } });
  }

  async update(id: string, data: any): Promise<Enclosure> {
    return prisma.enclosure.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Enclosure> {
    return prisma.enclosure.delete({ where: { id } });
  }
}
