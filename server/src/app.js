import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './modules/auth/auth.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', authRoutes);
// Test Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to CampusHub API 🚀',
  });
});

export default app;
