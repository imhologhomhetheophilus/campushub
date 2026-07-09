import express from 'express';

import { createInstitution } from './institution.controller.js';

import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';

const router = express.Router();

// Create Institution
router.post(
  '/',
  authenticate,
  authorize(1), // Super Admin role_id
  createInstitution,
);

// Test route
router.get('/', (req, res) => {
  res.json({
    message: 'Institution routes working 🚀',
  });
});

export default router;
