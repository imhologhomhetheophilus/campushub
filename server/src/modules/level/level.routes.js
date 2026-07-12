import { Router } from 'express';

import {
  createLevel,
  getAllLevels,
  getLevelById,
  updateLevel,
  deleteLevel,
} from './level.controller.js';

import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';
import { ROLES } from '../../constants/roles.js';

const router = Router();

// ===================================
// Level Routes
// ===================================

// Create Level
router.post('/', authenticate, authorize(ROLES.SUPER_ADMIN), createLevel);

// Get All Levels
router.get('/', authenticate, getAllLevels);

// Get Level By ID
router.get('/:id', authenticate, getLevelById);

// Update Level
router.put('/:id', authenticate, authorize(ROLES.SUPER_ADMIN), updateLevel);

// Delete Level
router.delete('/:id', authenticate, authorize(ROLES.SUPER_ADMIN), deleteLevel);

export default router;
