import { PrismaClient, FeedingRecord } from '../generated/prisma/client';

const prisma = new PrismaClient();

export class FeedingRecordRepository {
  async create(data: any): Promise<FeedingRecord> {
    return prisma.feedingRecord.create({ data });
  }

  async findAll(filters: any = {}): Promise<FeedingRecord[]> {
    return prisma.feedingRecord.findMany({ where: filters });
  }

  async findById(id: string): Promise<FeedingRecord | null> {
    return prisma.feedingRecord.findUnique({ where: { id } });
  }

  async update(id: string, data: any): Promise<FeedingRecord> {
    return prisma.feedingRecord.update({ where: { id }, data });
  }

  async delete(id: string): Promise<FeedingRecord> {
    return prisma.feedingRecord.delete({ where: { id } });
  }
}
