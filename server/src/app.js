import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to CampusHub API 🚀',
  });
});

export default app;
