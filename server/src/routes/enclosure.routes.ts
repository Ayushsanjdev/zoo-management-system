import { Router } from 'express';
import { EnclosureController } from '../controllers/enclosure.controller';
import { authenticateToken, authorizeStaff, rateLimit , authorizeAdmin} from '../middleware/auth';

const router = Router();
const controller = new EnclosureController();

router.use(rateLimit(15 * 60 * 1000, 200)); // 200 requests per 15 minutes

// Filter options routes
router.get('/api/enclosures/filter-options', authenticateToken, (req, res) => controller.getFilterOptions(req, res));
router.get('/api/enclosures/types', authenticateToken, (req, res) => controller.getTypeList(req, res));

router.post('/api/enclosures', authenticateToken, authorizeStaff, (req, res) => controller.create(req, res));
router.get('/api/enclosures', authenticateToken, (req, res) => controller.getAll(req, res));
router.get('/api/enclosures/:id', authenticateToken, (req, res) => controller.getById(req, res));
router.put('/api/enclosures/:id', authenticateToken, authorizeStaff, (req, res) => controller.update(req, res));
router.delete('/api/enclosures/:id', authenticateToken, authorizeAdmin, (req, res) => controller.delete(req, res));


export default router;
