import express from 'express';

import { getProfile } from './student.controller.js';

import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';

const router = express.Router();

router.get('/profile', authenticate, authorize(4), getProfile);

export default router;
