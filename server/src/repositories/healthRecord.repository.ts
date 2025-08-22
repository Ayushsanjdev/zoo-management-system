import { PrismaClient, HealthRecord } from '../generated/prisma/client';

const prisma = new PrismaClient();

export class HealthRecordRepository {
  async create(data: any): Promise<HealthRecord> {
    return prisma.healthRecord.create({ data });
  }

  async findAll(filters: any = {}): Promise<HealthRecord[]> {
    return prisma.healthRecord.findMany({ where: filters });
  }

  async findById(id: string): Promise<HealthRecord | null> {
    return prisma.healthRecord.findUnique({ where: { id } });
  }

  async update(id: string, data: any): Promise<HealthRecord> {
    return prisma.healthRecord.update({ where: { id }, data });
  }

  async delete(id: string): Promise<HealthRecord> {
    return prisma.healthRecord.delete({ where: { id } });
  }
}
