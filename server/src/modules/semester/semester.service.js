import {
  createSemesterRepository,
  findSemesterByNameRepository,
  getAllSemestersRepository,
  getSemesterByIdRepository,
  updateSemesterRepository,
  deleteSemesterRepository,
  clearCurrentSemesterRepository,
} from './semester.repository.js';

import { getInstitutionByIdRepository } from '../institution/institution.repository.js';
import { getAcademicSessionByIdRepository } from '../academic-session/academic-session.repository.js';

// ===================================
// Create Semester
// ===================================
export async function createSemesterService(data) {
  const {
    institution_id,
    session_id,
    semester_name,
    start_date,
    end_date,
    is_current,
  } = data;

  // Check institution exists
  const institution = await getInstitutionByIdRepository(institution_id);

  if (!institution) {
    throw new Error('Institution not found.');
  }

  // Check academic session exists
  const session = await getAcademicSessionByIdRepository(session_id);

  if (!session) {
    throw new Error('Academic session not found.');
  }

  // Ensure session belongs to institution
  if (session.institution_id !== institution_id) {
    throw new Error('Academic session does not belong to this institution.');
  }

  // Check duplicate semester
  const existingSemester = await findSemesterByNameRepository(
    session_id,
    semester_name,
  );

  if (existingSemester) {
    throw new Error('Semester already exists in this session.');
  }

  // Validate dates
  if (start_date && end_date && start_date >= end_date) {
    throw new Error('Semester start date must be before end date.');
  }

  // Handle current semester
  if (is_current) {
    await clearCurrentSemesterRepository(session_id);
  }

  return await createSemesterRepository(data);
}

// ===================================
// Get All Semesters
// ===================================
export async function getAllSemestersService() {
  return await getAllSemestersRepository();
}

// ===================================
// Get Semester By ID
// ===================================
export async function getSemesterByIdService(id) {
  const semester = await getSemesterByIdRepository(id);

  if (!semester) {
    throw new Error('Semester not found.');
  }

  return semester;
}

// ===================================
// Update Semester
// ===================================
export async function updateSemesterService(id, data) {
  const semester = await getSemesterByIdRepository(id);

  if (!semester) {
    throw new Error('Semester not found.');
  }

  const { start_date, end_date, is_current } = data;

  // Validate dates
  if (start_date && end_date && start_date >= end_date) {
    throw new Error('Semester start date must be before end date.');
  }

  // Handle current semester
  if (is_current) {
    await clearCurrentSemesterRepository(semester.session_id);
  }

  await updateSemesterRepository(id, data);

  return true;
}

// ===================================
// Delete Semester
// ===================================
export async function deleteSemesterService(id) {
  const semester = await getSemesterByIdRepository(id);

  if (!semester) {
    throw new Error('Semester not found.');
  }

  await deleteSemesterRepository(id);

  return true;
}
