import { FeedingRecordService } from '../services/feedingRecord.service';
import { Request, Response } from 'express';
import { parsePaginationParams, parseFilterParams } from '../utils/pagination';

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
      const pagination = parsePaginationParams(req.query);
      const filters = parseFilterParams(req.query);
      
      const result = await feedingRecordService.getAllFeedingRecords(filters, pagination);
      res.json(result);
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

  async getFilterOptions(req: Request, res: Response) {
    try {
      const options = await feedingRecordService.getFilterOptions();
      res.json(options);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getFoodTypeList(req: Request, res: Response) {
    try {
      const foodTypes = await feedingRecordService.getFoodTypeList();
      res.json(foodTypes);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getStaffList(req: Request, res: Response) {
    try {
      const staff = await feedingRecordService.getStaffList();
      res.json(staff);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getAnimalList(req: Request, res: Response) {
    try {
      const animals = await feedingRecordService.getAnimalList();
      res.json(animals);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }
}
