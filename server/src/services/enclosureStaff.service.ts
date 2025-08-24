import { EnclosureStaffRepository } from '../repositories/enclosureStaff.repository';
import { EnclosureStaffDTO } from '../models/enclosureStaff.model';
import { PaginationParams, FilterParams, PaginationResponse } from '../utils/pagination';

const enclosureStaffRepository = new EnclosureStaffRepository();

export class EnclosureStaffService {
  async createEnclosureStaff(data: EnclosureStaffDTO) {
    return enclosureStaffRepository.create({
      staffId: data.staffId,
      enclosureId: data.enclosureId,
      assignedAt: data.assignedAt,
    });
  }

  async getAllEnclosureStaff(
    filters: FilterParams = {},
    pagination: PaginationParams = { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' }
  ): Promise<PaginationResponse<any>> {
    return enclosureStaffRepository.findAll(filters, pagination);
  }

  async getEnclosureStaffById(id: string) {
    return enclosureStaffRepository.findById(id);
  }

  async updateEnclosureStaff(id: string, data: EnclosureStaffDTO) {
    return enclosureStaffRepository.update(id, {
      staffId: data.staffId,
      enclosureId: data.enclosureId,
      assignedAt: data.assignedAt,
    });
  }

  async deleteEnclosureStaff(id: string) {
    return enclosureStaffRepository.delete(id);
  }

  async getStaffList(): Promise<string[]> {
    return enclosureStaffRepository.getStaffList();
  }

  async getEnclosureList(): Promise<string[]> {
    return enclosureStaffRepository.getEnclosureList();
  }

  async getEnclosureStaffCount() {
    return enclosureStaffRepository.count();
  }

  async getFilterOptions() {
    const [staffIds, enclosureIds] = await Promise.all([
      this.getStaffList(),
      this.getEnclosureList(),
    ]);

    return {
      staffIds,
      enclosureIds,
      statusOptions: [
        { label: 'Active', value: true },
        { label: 'Inactive', value: false },
      ],
      dateRanges: [
        { label: 'Last 7 days', start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
        { label: 'Last 30 days', start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
        { label: 'Last 90 days', start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString() },
      ],
    };
  }
}
