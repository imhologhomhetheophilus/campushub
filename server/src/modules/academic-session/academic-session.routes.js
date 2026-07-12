import express from 'express';

import {
  createAcademicSession,
  getAllAcademicSessions,
  getAcademicSessionById,
  updateAcademicSession,
  deleteAcademicSession,
} from './academic-session.controller.js';

import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';
import { ROLES } from '../../constants/roles.js';

const router = express.Router();

// ===================================
// Academic Session Routes
// ===================================

// Create Academic Session
router.post(
  '/',
  authenticate,
  authorize(ROLES.SUPER_ADMIN),
  createAcademicSession,
);

// Get All Academic Sessions
router.get('/', authenticate, getAllAcademicSessions);

// Get Academic Session By ID
router.get('/:id', authenticate, getAcademicSessionById);

// Update Academic Session
router.put(
  '/:id',
  authenticate,
  authorize(ROLES.SUPER_ADMIN),
  updateAcademicSession,
);

// Delete Academic Session
router.delete(
  '/:id',
  authenticate,
  authorize(ROLES.SUPER_ADMIN),
  deleteAcademicSession,
);

export default router;
