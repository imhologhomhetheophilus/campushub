import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './modules/auth/auth.routes.js';
import studentRoutes from './modules/student/student.routes.js';
import institutionRoutes from './modules/institution/institution.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/institutions', institutionRoutes);

// Test Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to CampusHub API 🚀',
  });
});

export default app;
