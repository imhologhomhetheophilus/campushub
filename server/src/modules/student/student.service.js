import db from '../../config/database.js';

import {
  createStudentRepository,
  createStudentEnrollmentRepository,
  getAllStudentsRepository,
  getStudentByIdRepository,
  getStudentByUserIdRepository,
  getStudentByMatricRepository,
  getStudentByAdmissionRepository,
  updateStudentRepository,
  deleteStudentRepository,
} from './student.repository.js';

import { getUserByIdRepository } from '../auth/auth.repository.js';
import { getInstitutionByIdRepository } from '../institution/institution.repository.js';
import { getAcademicSessionByIdRepository } from '../academic-session/academic-session.repository.js';
import { getProgrammeByIdRepository } from '../programme/programme.repository.js';
import { getLevelByIdRepository } from '../level/level.repository.js';
import { getSemesterByIdRepository } from '../semester/semester.repository.js';

// ===================================
// Create Student
// ===================================
export async function createStudentService(data) {
  const {
    user_id,
    institution_id,
    matric_number,
    admission_number,
    admission_session_id,
    student_status,
    programme_id,
    level_id,
    semester_id,
    enrollment_date,
  } = data;

  // Validate User
  const user = await getUserByIdRepository(user_id);

  if (!user) {
    throw new Error('User not found.');
  }

  // Validate Institution
  const institution = await getInstitutionByIdRepository(institution_id);

  if (!institution) {
    throw new Error('Institution not found.');
  }

  // Validate Academic Session
  const session = await getAcademicSessionByIdRepository(admission_session_id);

  if (!session) {
    throw new Error('Academic session not found.');
  }

  // Validate Programme
  const programme = await getProgrammeByIdRepository(programme_id);

  if (!programme) {
    throw new Error('Programme not found.');
  }

  // Validate Level
  const level = await getLevelByIdRepository(level_id);

  if (!level) {
    throw new Error('Level not found.');
  }

  // Validate Semester
  const semester = await getSemesterByIdRepository(semester_id);

  if (!semester) {
    throw new Error('Semester not found.');
  }

  // Duplicate Checks
  if (await getStudentByUserIdRepository(user_id)) {
    throw new Error('This user already has a student record.');
  }

  if (await getStudentByMatricRepository(matric_number)) {
    throw new Error('Matric number already exists.');
  }

  if (await getStudentByAdmissionRepository(admission_number)) {
    throw new Error('Admission number already exists.');
  }

  // ==========================
  // Database Transaction
  // ==========================
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const studentId = await createStudentRepository(connection, {
      user_id,
      institution_id,
      matric_number,
      admission_number,
      admission_session_id,
      student_status,
    });

    await createStudentEnrollmentRepository(connection, {
      student_id: studentId,
      programme_id,
      level_id,
      session_id: admission_session_id,
      semester_id,
      enrollment_date,
      is_current: 1,
    });

    await connection.commit();

    return studentId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

// ===================================
// Get All Students
// ===================================
export async function getAllStudentsService() {
  return await getAllStudentsRepository();
}

// ===================================
// Get Student By ID
// ===================================
export async function getStudentByIdService(id) {
  const student = await getStudentByIdRepository(id);

  if (!student) {
    throw new Error('Student not found.');
  }

  return student;
}

// ===================================
// Update Student
// ===================================
export async function updateStudentService(id, data) {
  const student = await getStudentByIdRepository(id);

  if (!student) {
    throw new Error('Student not found.');
  }

  await updateStudentRepository(id, data);

  return true;
}

// ===================================
// Delete Student
// ===================================
export async function deleteStudentService(id) {
  const student = await getStudentByIdRepository(id);

  if (!student) {
    throw new Error('Student not found.');
  }

  await deleteStudentRepository(id);

  return true;
}
