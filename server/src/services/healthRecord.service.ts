import { HealthRecordRepository } from '../repositories/healthRecord.repository';
import { HealthRecordDTO } from '../models/healthRecord.model';
import { PaginationParams, FilterParams, PaginationResponse } from '../utils/pagination';

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

  async getAllHealthRecords(
    filters: FilterParams = {},
    pagination: PaginationParams = { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' }
  ): Promise<PaginationResponse<any>> {
    return healthRecordRepository.findAll(filters, pagination);
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

  async getVetList(): Promise<Array<{ id: string; name: string; email: string }>> {
    return healthRecordRepository.getVetList();
  }

  async getAnimalList(): Promise<Array<{ id: string; name: string; species: string }>> {
    return healthRecordRepository.getAnimalList();
  }

  async getFilterOptions() {
    const [vets, animals] = await Promise.all([
      this.getVetList(),
      this.getAnimalList(),
    ]);

    return {
      vets,
      animals,
    };
  }
}
