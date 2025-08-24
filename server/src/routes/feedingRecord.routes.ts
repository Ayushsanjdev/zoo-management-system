import { Router } from 'express';
import { FeedingRecordController } from '../controllers/feedingRecord.controller';
import { authenticateToken, authorizeStaff, rateLimit, authorizeAdmin } from '../middleware/auth';

const router = Router();
const controller = new FeedingRecordController();

router.use(rateLimit(15 * 60 * 1000, 200)); // 200 requests per 15 minutes

// Filter options routes
router.get('/api/feeding-records/filter-options', authenticateToken, authorizeStaff, (req, res) => controller.getFilterOptions(req, res));
router.get('/api/feeding-records/food-types', authenticateToken, authorizeStaff, (req, res) => controller.getFoodTypeList(req, res));
router.get('/api/feeding-records/staff', authenticateToken, authorizeStaff, (req, res) => controller.getStaffList(req, res));
router.get('/api/feeding-records/animals', authenticateToken, authorizeStaff, (req, res) => controller.getAnimalList(req, res));

// Main CRUD routes
router.post('/api/feeding-records', authenticateToken, authorizeStaff, (req, res) => controller.create(req, res));
router.get('/api/feeding-records', authenticateToken, authorizeStaff,(req, res) => controller.getAll(req, res));
router.get('/api/feeding-records/:id', authenticateToken, authorizeStaff,(req, res) => controller.getById(req, res));
router.put('/api/feeding-records/:id', authenticateToken, authorizeStaff, (req, res) => controller.update(req, res));
router.delete('/api/feeding-records/:id', authenticateToken, authorizeAdmin, (req, res) => controller.delete(req, res));

export default router;
