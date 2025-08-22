export interface HealthRecordDTO {
  checkupDate: Date;
  notes: string;
  medication?: string;
  animalId: string;
  vetId: string;
}
