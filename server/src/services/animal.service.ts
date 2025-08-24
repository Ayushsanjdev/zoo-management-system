import { AnimalRepository } from '../repositories/animal.repository';
import { AnimalDTO } from '../models/animal.model';
import { PaginationParams, FilterParams, PaginationResponse } from '../utils/pagination';

const animalRepository = new AnimalRepository();

export class AnimalService {
  async createAnimal(data: AnimalDTO) {
    return animalRepository.create({
      name: data.name,
      species: data.species,
      scientificName: data.scientific_name,
      age: data.age,
      gender: data.gender,
      healthStatus: data.health_status,
      enclosureId: data.enclosure_id,
    });
  }

  async getAllAnimals(
    filters: FilterParams = {},
    pagination: PaginationParams = { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' }
  ): Promise<PaginationResponse<any>> {
    return animalRepository.findAll(filters, pagination);
  }

  async getAnimalCount() {
    return animalRepository.count();
  }

  async getAnimalById(id: string) {
    return animalRepository.findById(id);
  }

  async updateAnimal(id: string, data: AnimalDTO) {
    return animalRepository.update(id, {
      name: data.name,
      species: data.species,
      scientificName: data.scientific_name,
      age: data.age,
      gender: data.gender,
      healthStatus: data.health_status,
      enclosureId: data.enclosure_id,
    });
  }

  async deleteAnimal(id: string) {
    return animalRepository.delete(id);
  }

  async getSpeciesList(): Promise<string[]> {
    return animalRepository.getSpeciesList();
  }

  async getHealthStatusList(): Promise<string[]> {
    return animalRepository.getHealthStatusList();
  }

  async getFilterOptions() {
    const [species, healthStatuses] = await Promise.all([
      this.getSpeciesList(),
      this.getHealthStatusList(),
    ]);

    return {
      species,
      healthStatuses,
      genders: ['Male', 'Female', 'Unknown'],
    };
  }
}
