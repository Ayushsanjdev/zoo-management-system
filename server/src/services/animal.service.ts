import { AnimalRepository } from '../repositories/animal.repository';
import { AnimalDTO } from '../models/animal.model';

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

  async getAllAnimals(filters: any) {
    // Map query params to prisma filters
    const prismaFilters: any = {};
    if (filters.species) prismaFilters.species = filters.species;
    if (filters.health_status) prismaFilters.healthStatus = filters.health_status;
    return animalRepository.findAll(prismaFilters);
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
}
