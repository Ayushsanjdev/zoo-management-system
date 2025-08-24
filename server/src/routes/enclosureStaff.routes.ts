import { Router } from 'express';
import { EnclosureStaffController } from '../controllers/enclosureStaff.controller';
import { authenticateToken, authorizeStaff, rateLimit, authorizeAdmin } from '../middleware/auth';

const router = Router();
const controller = new EnclosureStaffController();

// Apply rate limiting to all enclosure staff routes
router.use(rateLimit(15 * 60 * 1000, 200)); // 200 requests per 15 minutes

// Filter options routes (public)
router.get('/api/enclosure-staff/filter-options', 
  authenticateToken,
  (req, res) => controller.getFilterOptions(req, res)
);

router.get('/api/enclosure-staff/count', 
  authenticateToken,
  (req, res) => controller.getCount(req, res)
);

router.get('/api/enclosure-staff/staff', 
  authenticateToken,
  (req, res) => controller.getStaffList(req, res)
);

router.get('/api/enclosure-staff/enclosures', 
  authenticateToken,
  (req, res) => controller.getEnclosureList(req, res)
);

// Main CRUD routes - Admin only
router.post('/api/enclosure-staff', 
  authenticateToken, 
  authorizeAdmin, 
  (req, res) => controller.create(req, res)
);

router.get('/api/enclosure-staff', 
  authenticateToken, 
  authorizeAdmin, 
  (req, res) => controller.getAll(req, res)
);

router.get('/api/enclosure-staff/:id', 
  authenticateToken, 
  authorizeAdmin,
  (req, res) => controller.getById(req, res)
);

router.put('/api/enclosure-staff/:id', 
  authenticateToken, 
  authorizeAdmin, 
  (req, res) => controller.update(req, res)
);

router.delete('/api/enclosure-staff/:id', 
  authenticateToken, 
  authorizeAdmin, 
  (req, res) => controller.delete(req, res)
);

export default router;
