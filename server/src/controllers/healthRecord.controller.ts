import { HealthRecordService } from '../services/healthRecord.service';
import { Request, Response } from 'express';

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
      const healthRecords = await healthRecordService.getAllHealthRecords(req.query);
      res.json(healthRecords);
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
}
