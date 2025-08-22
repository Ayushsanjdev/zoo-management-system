import { EnclosureService } from '../services/enclosure.service';
import { Request, Response } from 'express';

const enclosureService = new EnclosureService();

export class EnclosureController {
  async create(req: Request, res: Response) {
    try {
      const enclosure = await enclosureService.createEnclosure(req.body);
      res.status(201).json(enclosure);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const enclosures = await enclosureService.getAllEnclosures(req.query);
      res.json(enclosures);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const enclosure = await enclosureService.getEnclosureById(req.params.id);
      if (!enclosure) return res.status(404).json({ error: 'Enclosure not found' });
      res.json(enclosure);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const enclosure = await enclosureService.updateEnclosure(req.params.id, req.body);
      res.json(enclosure);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const enclosure = await enclosureService.deleteEnclosure(req.params.id);
      res.json(enclosure);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }
}
