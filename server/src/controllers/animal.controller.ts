import { AnimalService } from '../services/animal.service';
import { Request, Response } from 'express';

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
      const animals = await animalService.getAllAnimals(req.query);
      res.json(animals);
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
}
