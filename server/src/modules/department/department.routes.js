import express from 'express';

import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from './department.controller.js';

import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';
import { ROLES } from '../../constants/roles.js';

const router = express.Router();

// ===================================
// Department Routes
// ===================================

// Create Department
router.post('/', authenticate, authorize(ROLES.SUPER_ADMIN), createDepartment);

// Get All Departments
router.get('/', authenticate, getAllDepartments);

// Get Department By ID
router.get('/:id', authenticate, getDepartmentById);

// Update Department
router.put(
  '/:id',
  authenticate,
  authorize(ROLES.SUPER_ADMIN),
  updateDepartment,
);

// Delete Department
router.delete(
  '/:id',
  authenticate,
  authorize(ROLES.SUPER_ADMIN),
  deleteDepartment,
);

export default router;
