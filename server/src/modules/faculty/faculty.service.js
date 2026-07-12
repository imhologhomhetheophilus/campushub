import {
  createFacultyRepository,
  findFacultyByCodeRepository,
  findFacultyByNameRepository,
  getAllFacultiesRepository,
  getFacultyByIdRepository,
  updateFacultyRepository,
  deleteFacultyRepository,
} from './faculty.repository.js';

import { getInstitutionByIdRepository } from '../institution/institution.repository.js';

// ===============================
// Create Faculty
// ===============================
export async function createFacultyService(data) {
  const { institution_id, faculty_name, faculty_code } = data;

  // Check institution exists
  const institution = await getInstitutionByIdRepository(institution_id);

  if (!institution) {
    throw new Error('Institution not found.');
  }

  // Check duplicate code
  const codeExists = await findFacultyByCodeRepository(
    institution_id,
    faculty_code,
  );

  if (codeExists) {
    throw new Error('Faculty code already exists.');
  }

  // Check duplicate name
  const nameExists = await findFacultyByNameRepository(
    institution_id,
    faculty_name,
  );

  if (nameExists) {
    throw new Error('Faculty name already exists.');
  }

  return await createFacultyRepository(data);
}

// ===============================
// Get All Faculties
// ===============================
export async function getAllFacultiesService() {
  return await getAllFacultiesRepository();
}

// ===============================
// Get Faculty By ID
// ===============================
export async function getFacultyByIdService(id) {
  const faculty = await getFacultyByIdRepository(id);

  if (!faculty) {
    throw new Error('Faculty not found.');
  }

  return faculty;
}

// ===============================
// Update Faculty
// ===============================
export async function updateFacultyService(id, data) {
  const faculty = await getFacultyByIdRepository(id);

  if (!faculty) {
    throw new Error('Faculty not found.');
  }

  await updateFacultyRepository(id, data);

  return true;
}

// ===============================
// Delete Faculty
// ===============================
export async function deleteFacultyService(id) {
  const faculty = await getFacultyByIdRepository(id);

  if (!faculty) {
    throw new Error('Faculty not found.');
  }

  await deleteFacultyRepository(id);

  return true;
}
