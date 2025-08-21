import { Router } from 'express';
import { EnclosureController } from '../controllers/enclosure.controller';

const router = Router();
const controller = new EnclosureController();

router.post('/api/enclosures', (req, res) => controller.create(req, res));
router.get('/api/enclosures', (req, res) => controller.getAll(req, res));
router.get('/api/enclosures/:id', (req, res) => controller.getById(req, res));
router.put('/api/enclosures/:id', (req, res) => controller.update(req, res));
router.delete('/api/enclosures/:id', (req, res) => controller.delete(req, res));

export default router;
