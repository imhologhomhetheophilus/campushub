import { Router } from 'express';

import {
  createSemester,
  getAllSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester,
} from './semester.controller.js';

import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';
import { ROLES } from '../../constants/roles.js';

const router = Router();

// ===================================
// Semester Routes
// ===================================

// Create Semester
router.post('/', authenticate, authorize(ROLES.SUPER_ADMIN), createSemester);

// Get All Semesters
router.get('/', authenticate, getAllSemesters);

// Get Semester By ID
router.get('/:id', authenticate, getSemesterById);

// Update Semester
router.put('/:id', authenticate, authorize(ROLES.SUPER_ADMIN), updateSemester);

// Delete Semester
router.delete(
  '/:id',
  authenticate,
  authorize(ROLES.SUPER_ADMIN),
  deleteSemester,
);

export default router;
