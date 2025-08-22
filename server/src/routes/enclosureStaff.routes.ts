import { Router } from 'express';
import { EnclosureStaffController } from '../controllers/enclosureStaff.controller';

const router = Router();
const controller = new EnclosureStaffController();

router.post('/api/enclosure-staff', (req, res) => controller.create(req, res));
router.get('/api/enclosure-staff', (req, res) => controller.getAll(req, res));
router.get('/api/enclosure-staff/:id', (req, res) => controller.getById(req, res));
router.put('/api/enclosure-staff/:id', (req, res) => controller.update(req, res));
router.delete('/api/enclosure-staff/:id', (req, res) => controller.delete(req, res));

export default router;
