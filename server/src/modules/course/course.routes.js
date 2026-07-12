import express from 'express';

import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from './course.controller.js';

import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';
import { ROLES } from '../../constants/roles.js';

const router = express.Router();

// ===================================
// Course Routes
// ===================================

// Create Course
router.post('/', authenticate, authorize(ROLES.SUPER_ADMIN), createCourse);

// Get All Courses
router.get('/', authenticate, authorize(ROLES.SUPER_ADMIN), getAllCourses);

// Get Course By ID
router.get('/:id', authenticate, authorize(ROLES.SUPER_ADMIN), getCourseById);

// Update Course
router.put('/:id', authenticate, authorize(ROLES.SUPER_ADMIN), updateCourse);

// Delete Course
router.delete('/:id', authenticate, authorize(ROLES.SUPER_ADMIN), deleteCourse);

export default router;
