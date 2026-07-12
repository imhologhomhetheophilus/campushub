import { Router } from 'express';

import {
  createProgramme,
  getAllProgrammes,
  getProgrammeById,
  updateProgramme,
  deleteProgramme,
} from './programme.controller.js';

import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';
import { ROLES } from '../../constants/roles.js';

const router = Router();

// ===================================
// Programme Routes
// ===================================

// Create Programme
router.post('/', authenticate, authorize(ROLES.SUPER_ADMIN), createProgramme);

// Get All Programmes
router.get('/', authenticate, getAllProgrammes);

// Get Programme By ID
router.get('/:id', authenticate, getProgrammeById);

// Update Programme
router.put('/:id', authenticate, authorize(ROLES.SUPER_ADMIN), updateProgramme);

// Delete Programme
router.delete(
  '/:id',
  authenticate,
  authorize(ROLES.SUPER_ADMIN),
  deleteProgramme,
);

export default router;
