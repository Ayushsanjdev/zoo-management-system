import { Router } from 'express';
import { HealthRecordController } from '../controllers/healthRecord.controller';
import { authenticateToken, authorizeVet, rateLimit, authorizeAdmin, authorizeStaff } from '../middleware/auth';

const router = Router();
const controller = new HealthRecordController();

router.use(rateLimit(15 * 60 * 1000, 200)); // 200 requests per 15 minutes

// Filter options routes
router.get('/api/health-records/filter-options', authenticateToken, authorizeStaff, (req, res) => controller.getFilterOptions(req, res));
router.get('/api/health-records/vets', authenticateToken, authorizeStaff, (req, res) => controller.getVetList(req, res));
router.get('/api/health-records/animals', authenticateToken, authorizeStaff, (req, res) => controller.getAnimalList(req, res));

// Main CRUD routes
router.post('/api/health-records', authenticateToken, authorizeStaff, (req, res) => controller.create(req, res));
router.get('/api/health-records', authenticateToken, authorizeStaff, (req, res) => controller.getAll(req, res));
router.get('/api/health-records/:id', authenticateToken, authorizeStaff, (req, res) => controller.getById(req, res));
router.put('/api/health-records/:id', authenticateToken, authorizeStaff, (req, res) => controller.update(req, res));
router.delete('/api/health-records/:id', authenticateToken, authorizeAdmin, (req, res) => controller.delete(req, res));

export default router;
