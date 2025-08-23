import { AnimalService } from '../services/animal.service';
import { Request, Response } from 'express';
import { parsePaginationParams, parseFilterParams } from '../utils/pagination';

const animalService = new AnimalService();

export class AnimalController {
  async create(req: Request, res: Response) {
    try {
      const animal = await animalService.createAnimal(req.body);
      res.status(201).json(animal);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const pagination = parsePaginationParams(req.query);
      const filters = parseFilterParams(req.query);
      
      const result = await animalService.getAllAnimals(filters, pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const animal = await animalService.getAnimalById(req.params.id);
      if (!animal) return res.status(404).json({ error: 'Animal not found' });
      res.json(animal);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const animal = await animalService.updateAnimal(req.params.id, req.body);
      res.json(animal);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const animal = await animalService.deleteAnimal(req.params.id);
      res.json(animal);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getFilterOptions(req: Request, res: Response) {
    try {
      const options = await animalService.getFilterOptions();
      res.json(options);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getSpeciesList(req: Request, res: Response) {
    try {
      const species = await animalService.getSpeciesList();
      res.json(species);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getHealthStatusList(req: Request, res: Response) {
    try {
      const healthStatuses = await animalService.getHealthStatusList();
      res.json(healthStatuses);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }
}
