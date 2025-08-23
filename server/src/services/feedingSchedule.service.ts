import { FeedingScheduleDTO } from "../models/feedingSchedule.model";
import { FeedingScheduleRepository } from "../repositories/feedingSchedule.repository";
import {
  FilterParams,
  PaginationParams,
  PaginationResponse,
} from "../utils/pagination";

const feedingScheduleRepository = new FeedingScheduleRepository();

export class FeedingScheduleService {
  async createFeedingSchedule(data: FeedingScheduleDTO) {
    return feedingScheduleRepository.create({
      foodType: data.foodType,
      quantity: data.quantity,
      feedingTime: data.feedingTime,
      assignedStaffId: data.assignedStaffId,
      animalId: data.animalId,
      frequency: data.frequency,
      daysOfWeek: data.daysOfWeek,
      isActive: data.isActive,
      startDate: data.startDate,
      endDate: data.endDate,
    });
  }

  async getAllFeedingSchedule(
    filters: FilterParams = {},
    pagination: PaginationParams = {
      page: 1,
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "desc",
    }
  ): Promise<PaginationResponse<any>> {
    return feedingScheduleRepository.findAll(filters, pagination);
  }

  async getFeedingScheduleById(id: string) {
    return feedingScheduleRepository.findById(id);
  }

  async updateFeedingSchedule(id: string, data: FeedingScheduleDTO) {
    return feedingScheduleRepository.update(id, {
      foodType: data.foodType,
      quantity: data.quantity,
      feedingTime: data.feedingTime,
      assignedStaffId: data.assignedStaffId,
      animalId: data.animalId,
      frequency: data.frequency,
      daysOfWeek: data.daysOfWeek,
      isActive: data.isActive,
      startDate: data.startDate,
      endDate: data.endDate,
    });
  }

  async deleteFeedingSchedule(id: string) {
    return feedingScheduleRepository.delete(id);
  }

  async getFoodTypeList(): Promise<string[]> {
    return feedingScheduleRepository.getFoodTypeList();
  }

  async getStaffList(): Promise<
    Array<{ id: string; name: string; email: string }>
  > {
    return feedingScheduleRepository.getStaffList();
  }

  async getAnimalList(): Promise<
    Array<{ id: string; name: string; species: string }>
  > {
    return feedingScheduleRepository.getAnimalList();
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
