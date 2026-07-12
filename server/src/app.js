import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './modules/auth/auth.routes.js';
import institutionRoutes from './modules/institution/institution.routes.js';
import facultyRoutes from './modules/faculty/faculty.routes.js';
import departmentRoutes from './modules/department/department.routes.js';
import programmeRoutes from './modules/programme/programme.routes.js';
import levelRoutes from './modules/level/level.routes.js';
import academicSessionRoutes from './modules/academic-session/academic-session.routes.js';
import semesterRoutes from './modules/semester/semester.routes.js';
import studentRoutes from './modules/student/student.routes.js';
import courseRoutes from './modules/course/course.routes.js';

import errorHandler from './middlewares/error.middleware.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/institutions', institutionRoutes);
app.use('/api/faculties', facultyRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/programmes', programmeRoutes);
app.use('/api/levels', levelRoutes);
app.use('/api/academic-sessions', academicSessionRoutes);
app.use('/api/semesters', semesterRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
// Test Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to CampusHub API 🚀',
  });
});
// Global Error Handler
app.use(errorHandler);
export default app;
