import { Request, Response } from "express";
import { FeedingScheduleService } from "../services/feedingSchedule.service";
import { parseFilterParams, parsePaginationParams } from "../utils/pagination";

const feedingScheduleService = new FeedingScheduleService();

export class FeedingScheduleController {
  async create(req: Request, res: Response) {
    try {
      const feedingSchedule =
        await feedingScheduleService.createFeedingSchedule(req.body);
      res.status(201).json(feedingSchedule);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const pagination = parsePaginationParams(req.query);
      const filters = parseFilterParams(req.query);

      const result = await feedingScheduleService.getAllFeedingSchedule(
        filters,
        pagination
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const feedingSchedule =
        await feedingScheduleService.getFeedingScheduleById(req.params.id);
      if (!feedingSchedule)
        return res.status(404).json({ error: "FeedingSchedule not found" });
      res.json(feedingSchedule);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const feedingSchedule =
        await feedingScheduleService.updateFeedingSchedule(
          req.params.id,
          req.body
        );
      res.json(feedingSchedule);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const feedingSchedule =
        await feedingScheduleService.deleteFeedingSchedule(req.params.id);
      res.json(feedingSchedule);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async getFilterOptions(req: Request, res: Response) {
    try {
      const options = await feedingScheduleService.getFilterOptions();
      res.json(options);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async getFoodTypeList(req: Request, res: Response) {
    try {
      const foodTypes = await feedingScheduleService.getFoodTypeList();
      res.json(foodTypes);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async getStaffList(req: Request, res: Response) {
    try {
      const staff = await feedingScheduleService.getStaffList();
      res.json(staff);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async getAnimalList(req: Request, res: Response) {
    try {
      const animals = await feedingScheduleService.getAnimalList();
      res.json(animals);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
