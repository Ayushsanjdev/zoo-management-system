import { EnclosureStaffService } from '../services/enclosureStaff.service';
import { Request, Response } from 'express';

const enclosureStaffService = new EnclosureStaffService();

export class EnclosureStaffController {
  async create(req: Request, res: Response) {
    try {
      const enclosureStaff = await enclosureStaffService.createEnclosureStaff(req.body);
      res.status(201).json(enclosureStaff);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const enclosureStaff = await enclosureStaffService.getAllEnclosureStaff(req.query);
      res.json(enclosureStaff);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const enclosureStaff = await enclosureStaffService.getEnclosureStaffById(req.params.id);
      if (!enclosureStaff) return res.status(404).json({ error: 'EnclosureStaff not found' });
      res.json(enclosureStaff);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const enclosureStaff = await enclosureStaffService.updateEnclosureStaff(req.params.id, req.body);
      res.json(enclosureStaff);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const enclosureStaff = await enclosureStaffService.deleteEnclosureStaff(req.params.id);
      res.json(enclosureStaff);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }
}
