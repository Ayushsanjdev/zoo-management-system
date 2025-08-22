import { Router } from 'express';
import { AnimalController } from '../controllers/animal.controller';

const router = Router();
const controller = new AnimalController();

router.post('/api/animals', (req, res) => controller.create(req, res));
router.get('/api/animals', (req, res) => controller.getAll(req, res));
router.get('/api/animals/:id', (req, res) => controller.getById(req, res));
router.put('/api/animals/:id', (req, res) => controller.update(req, res));
router.delete('/api/animals/:id', (req, res) => controller.delete(req, res));

export default router;
