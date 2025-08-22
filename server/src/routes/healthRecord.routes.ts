import { Router } from 'express';
import { HealthRecordController } from '../controllers/healthRecord.controller';

const router = Router();
const controller = new HealthRecordController();

router.post('/api/health-records', (req, res) => controller.create(req, res));
router.get('/api/health-records', (req, res) => controller.getAll(req, res));
router.get('/api/health-records/:id', (req, res) => controller.getById(req, res));
router.put('/api/health-records/:id', (req, res) => controller.update(req, res));
router.delete('/api/health-records/:id', (req, res) => controller.delete(req, res));

export default router;
