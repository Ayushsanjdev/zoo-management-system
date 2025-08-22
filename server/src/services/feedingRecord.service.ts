import { FeedingRecordRepository } from '../repositories/feedingRecord.repository';
import { FeedingRecordDTO } from '../models/feedingRecord.model';

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

  async getAllFeedingRecords(filters: any) {
    const prismaFilters: any = {};
    if (filters.staffId) prismaFilters.staffId = filters.staffId;
    if (filters.animalId) prismaFilters.animalId = filters.animalId;
    return feedingRecordRepository.findAll(prismaFilters);
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
}
