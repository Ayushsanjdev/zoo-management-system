import { EnclosureStaffRepository } from '../repositories/enclosureStaff.repository';
import { EnclosureStaffDTO } from '../models/enclosureStaff.model';

const enclosureStaffRepository = new EnclosureStaffRepository();

export class EnclosureStaffService {
  async createEnclosureStaff(data: EnclosureStaffDTO) {
    return enclosureStaffRepository.create({
      staffId: data.staffId,
      enclosureId: data.enclosureId,
      assignedAt: data.assignedAt,
    });
  }

  async getAllEnclosureStaff(filters: any) {
    const prismaFilters: any = {};
    if (filters.staffId) prismaFilters.staffId = filters.staffId;
    if (filters.enclosureId) prismaFilters.enclosureId = filters.enclosureId;
    return enclosureStaffRepository.findAll(prismaFilters);
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
}
