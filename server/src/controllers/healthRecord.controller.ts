import { HealthRecordService } from '../services/healthRecord.service';
import { Request, Response } from 'express';
import { parsePaginationParams, parseFilterParams } from '../utils/pagination';

const healthRecordService = new HealthRecordService();

export class HealthRecordController {
  async create(req: Request, res: Response) {
    try {
      const healthRecord = await healthRecordService.createHealthRecord(req.body);
      res.status(201).json(healthRecord);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const pagination = parsePaginationParams(req.query);
      const filters = parseFilterParams(req.query);
      
      const result = await healthRecordService.getAllHealthRecords(filters, pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const healthRecord = await healthRecordService.getHealthRecordById(req.params.id);
      if (!healthRecord) return res.status(404).json({ error: 'HealthRecord not found' });
      res.json(healthRecord);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const healthRecord = await healthRecordService.updateHealthRecord(req.params.id, req.body);
      res.json(healthRecord);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const healthRecord = await healthRecordService.deleteHealthRecord(req.params.id);
      res.json(healthRecord);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getFilterOptions(req: Request, res: Response) {
    try {
      const options = await healthRecordService.getFilterOptions();
      res.json(options);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getVetList(req: Request, res: Response) {
    try {
      const vets = await healthRecordService.getVetList();
      res.json(vets);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getAnimalList(req: Request, res: Response) {
    try {
      const animals = await healthRecordService.getAnimalList();
      res.json(animals);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }
}
