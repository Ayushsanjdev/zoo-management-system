import { Router } from 'express';
import { AnimalController } from '../controllers/animal.controller';
import { 
  authenticateToken, 
  authorizeStaff, 
  authorizeAdmin,
  rateLimit 
} from '../middleware/auth';

const router = Router();
const controller = new AnimalController();

// Apply rate limiting to all animal routes
router.use(rateLimit(15 * 60 * 1000, 200)); // 200 requests per 15 minutes

// Filter options routes (public)
router.get('/api/animals/filter-options', 
  authenticateToken,
  (req, res) => controller.getFilterOptions(req, res)
);

router.get('/api/animals/species', 
  authenticateToken,
  (req, res) => controller.getSpeciesList(req, res)
);

router.get('/api/animals/health-status', 
  authenticateToken,
  (req, res) => controller.getHealthStatusList(req, res)
);

router.get('/api/animals/count', 
  authenticateToken,
  (req, res) => controller.getCount(req, res)
);

// Public routes (view only) - now with authentication required
router.get('/api/animals', 
  authenticateToken, 
  (req, res) => controller.getAll(req, res)
);

router.get('/api/animals/:id', 
  authenticateToken, 
  (req, res) => controller.getById(req, res)
);

// Protected routes - Staff and Admin can manage animals
router.post('/api/animals', 
  authenticateToken, 
  authorizeStaff,
  (req, res) => controller.create(req, res)
);

router.put('/api/animals/:id', 
  authenticateToken, 
  authorizeStaff, 
  (req, res) => controller.update(req, res)
);

// Admin only - Delete operations
router.delete('/api/animals/:id', 
  authenticateToken, 
  authorizeAdmin, 
  (req, res) => controller.delete(req, res)
);

export default router;
