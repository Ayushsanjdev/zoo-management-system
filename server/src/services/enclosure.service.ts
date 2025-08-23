import { EnclosureRepository } from '../repositories/enclosure.repository';
import { EnclosureDTO } from '../models/enclosure.model';
import { PaginationParams, FilterParams, PaginationResponse } from '../utils/pagination';

const enclosureRepository = new EnclosureRepository();

export class EnclosureService {
  async createEnclosure(data: EnclosureDTO) {
    return enclosureRepository.create({
      name: data.name,
      type: data.type,
      capacity: data.capacity,
    });
  }

  async getAllEnclosures(
    filters: FilterParams = {},
    pagination: PaginationParams = { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' }
  ): Promise<PaginationResponse<any>> {
    return enclosureRepository.findAll(filters, pagination);
  }

  async getEnclosureById(id: string) {
    return enclosureRepository.findById(id);
  }

  async updateEnclosure(id: string, data: EnclosureDTO) {
    return enclosureRepository.update(id, {
      name: data.name,
      type: data.type,
      capacity: data.capacity,
    });
  }

  async deleteEnclosure(id: string) {
    return enclosureRepository.delete(id);
  }

  async getTypeList(): Promise<string[]> {
    return enclosureRepository.getTypeList();
  }

  async getFilterOptions() {
    const types = await this.getTypeList();

    return {
      types,
      capacityRanges: [
        { label: 'Small (1-5)', min: 1, max: 5 },
        { label: 'Medium (6-15)', min: 6, max: 15 },
        { label: 'Large (16-30)', min: 16, max: 30 },
        { label: 'Extra Large (31+)', min: 31, max: null },
      ],
    };
  }
}
