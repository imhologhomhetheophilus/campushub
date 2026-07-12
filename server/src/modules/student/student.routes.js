import express from 'express';

import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from './student.controller.js';

import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';
import { ROLES } from '../../constants/roles.js';

const router = express.Router();

// ===================================
// Student Routes
// ===================================

// Create Student
router.post('/', authenticate, authorize(ROLES.SUPER_ADMIN), createStudent);

// Get All Students
router.get('/', authenticate, authorize(ROLES.SUPER_ADMIN), getAllStudents);

// Get Student By ID
router.get('/:id', authenticate, authorize(ROLES.SUPER_ADMIN), getStudentById);

// Update Student
router.put('/:id', authenticate, authorize(ROLES.SUPER_ADMIN), updateStudent);

// Delete Student
router.delete(
  '/:id',
  authenticate,
  authorize(ROLES.SUPER_ADMIN),
  deleteStudent,
);

export default router;
