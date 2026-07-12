import express from 'express';

import {
  createFaculty,
  getAllFaculties,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
} from './faculty.controller.js';

import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';
import { ROLES } from '../../constants/roles.js';

const router = express.Router();

// ===================================
// Faculty Routes
// ===================================

// Create Faculty
router.post('/', authenticate, authorize(ROLES.SUPER_ADMIN), createFaculty);

// Get All Faculties
router.get('/', authenticate, getAllFaculties);

// Get Faculty By ID
router.get('/:id', authenticate, getFacultyById);

// Update Faculty
router.put('/:id', authenticate, authorize(ROLES.SUPER_ADMIN), updateFaculty);

// Delete Faculty
router.delete(
  '/:id',
  authenticate,
  authorize(ROLES.SUPER_ADMIN),
  deleteFaculty,
);

export default router;
