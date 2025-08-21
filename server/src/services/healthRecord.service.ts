import { HealthRecordRepository } from '../repositories/healthRecord.repository';
import { HealthRecordDTO } from '../models/healthRecord.model';

const healthRecordRepository = new HealthRecordRepository();

export class HealthRecordService {
  async createHealthRecord(data: HealthRecordDTO) {
    return healthRecordRepository.create({
      checkupDate: data.checkupDate,
      notes: data.notes,
      medication: data.medication,
      animalId: data.animalId,
      vetId: data.vetId,
    });
  }

  async getAllHealthRecords(filters: any) {
    const prismaFilters: any = {};
    if (filters.animalId) prismaFilters.animalId = filters.animalId;
    if (filters.vetId) prismaFilters.vetId = filters.vetId;
    return healthRecordRepository.findAll(prismaFilters);
  }

  async getHealthRecordById(id: string) {
    return healthRecordRepository.findById(id);
  }

  async updateHealthRecord(id: string, data: HealthRecordDTO) {
    return healthRecordRepository.update(id, {
      checkupDate: data.checkupDate,
      notes: data.notes,
      medication: data.medication,
      animalId: data.animalId,
      vetId: data.vetId,
    });
  }

  async deleteHealthRecord(id: string) {
    return healthRecordRepository.delete(id);
  }
}
