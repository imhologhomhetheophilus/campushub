import express from 'express';

import {
  createInstitution,
  getAllInstitutions,
  getInstitutionById,
  updateInstitution,
  deleteInstitution,
} from './institution.controller.js';

import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';

const router = express.Router();

// ===============================
// Create Institution
// Only Super Admin
// ===============================
router.post('/', authenticate, authorize(1), createInstitution);

// ===============================
// Get All Institutions
// Logged-in Users
// ===============================
router.get('/', authenticate, getAllInstitutions);
router.get('/:id', authenticate, getInstitutionById);
router.put('/:id', authenticate, authorize(1), updateInstitution);
router.delete('/:id', authenticate, authorize(1), deleteInstitution);
export default router;
