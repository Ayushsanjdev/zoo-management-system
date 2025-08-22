import { FeedingRecordService } from '../services/feedingRecord.service';
import { Request, Response } from 'express';

const feedingRecordService = new FeedingRecordService();

export class FeedingRecordController {
  async create(req: Request, res: Response) {
    try {
      const feedingRecord = await feedingRecordService.createFeedingRecord(req.body);
      res.status(201).json(feedingRecord);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const feedingRecords = await feedingRecordService.getAllFeedingRecords(req.query);
      res.json(feedingRecords);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const feedingRecord = await feedingRecordService.getFeedingRecordById(req.params.id);
      if (!feedingRecord) return res.status(404).json({ error: 'FeedingRecord not found' });
      res.json(feedingRecord);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const feedingRecord = await feedingRecordService.updateFeedingRecord(req.params.id, req.body);
      res.json(feedingRecord);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const feedingRecord = await feedingRecordService.deleteFeedingRecord(req.params.id);
      res.json(feedingRecord);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }
}
