import { FeedingRecordRepository } from '../repositories/feedingRecord.repository';
import { FeedingRecordDTO } from '../models/feedingRecord.model';
import { PaginationParams, FilterParams, PaginationResponse } from '../utils/pagination';

const feedingRecordRepository = new FeedingRecordRepository();

export class FeedingRecordService {
  async createFeedingRecord(data: FeedingRecordDTO) {
    return feedingRecordRepository.create({
      foodType: data.foodType,
      quantity: data.quantity,
      feedingTime: data.feedingTime,
      staffId: data.staffId,
      animalId: data.animalId,
    });
  }

  async getAllFeedingRecords(
    filters: FilterParams = {},
    pagination: PaginationParams = { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' }
  ): Promise<PaginationResponse<any>> {
    return feedingRecordRepository.findAll(filters, pagination);
  }

  async getFeedingRecordById(id: string) {
    return feedingRecordRepository.findById(id);
  }

  async updateFeedingRecord(id: string, data: FeedingRecordDTO) {
    return feedingRecordRepository.update(id, {
      foodType: data.foodType,
      quantity: data.quantity,
      feedingTime: data.feedingTime,
      staffId: data.staffId,
      animalId: data.animalId,
    });
  }

  async deleteFeedingRecord(id: string) {
    return feedingRecordRepository.delete(id);
  }

  async getFoodTypeList(): Promise<string[]> {
    return feedingRecordRepository.getFoodTypeList();
  }

  async getStaffList(): Promise<Array<{ id: string; name: string; email: string }>> {
    return feedingRecordRepository.getStaffList();
  }

  async getAnimalList(): Promise<Array<{ id: string; name: string; species: string }>> {
    return feedingRecordRepository.getAnimalList();
  }

  async getFilterOptions() {
    const [foodTypes, staff, animals] = await Promise.all([
      this.getFoodTypeList(),
      this.getStaffList(),
      this.getAnimalList(),
    ]);

    return {
      foodTypes,
      staff,
      animals,
    };
  }
}
