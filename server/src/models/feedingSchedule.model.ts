export interface FeedingScheduleDTO {
  name?: string;
  foodType: string;
  quantity?: string;
  feedingTime?: Date;
  frequency?: string;
  daysOfWeek: string;
  isActive?: string;
  startDate?: Date;
  endDate?: Date;
  assignedStaffId: string;
  animalId: string;
}
