import { Router } from 'express';
import { FeedingRecordController } from '../controllers/feedingRecord.controller';

const router = Router();
const controller = new FeedingRecordController();

router.post('/api/feeding-records', (req, res) => controller.create(req, res));
router.get('/api/feeding-records', (req, res) => controller.getAll(req, res));
router.get('/api/feeding-records/:id', (req, res) => controller.getById(req, res));
router.put('/api/feeding-records/:id', (req, res) => controller.update(req, res));
router.delete('/api/feeding-records/:id', (req, res) => controller.delete(req, res));

export default router;
