import { EnclosureRepository } from '../repositories/enclosure.repository';
import { EnclosureDTO } from '../models/enclosure.model';

const enclosureRepository = new EnclosureRepository();

export class EnclosureService {
  async createEnclosure(data: EnclosureDTO) {
    return enclosureRepository.create({
      name: data.name,
      type: data.type,
      capacity: data.capacity,
    });
  }

  async getAllEnclosures(filters: any) {
    const prismaFilters: any = {};
    if (filters.type) prismaFilters.type = filters.type;
    return enclosureRepository.findAll(prismaFilters);
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
}
