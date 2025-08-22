import { PrismaClient, Animal } from '../generated/prisma/client';

const prisma = new PrismaClient();

export class AnimalRepository {
  async create(data: any): Promise<Animal> {
    return prisma.animal.create({ data });
  }

  async findAll(filters: any = {}): Promise<Animal[]> {
    return prisma.animal.findMany({ where: filters });
  }

  async findById(id: string): Promise<Animal | null> {
    return prisma.animal.findUnique({ where: { id } });
  }

  async update(id: string, data: any): Promise<Animal> {
    return prisma.animal.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Animal> {
    return prisma.animal.delete({ where: { id } });
  }
}
