import {
  createDepartmentRepository,
  findDepartmentByCodeRepository,
  findDepartmentByNameRepository,
  getAllDepartmentsRepository,
  getDepartmentByIdRepository,
  updateDepartmentRepository,
  deleteDepartmentRepository,
} from './department.repository.js';

import { getInstitutionByIdRepository } from '../institution/institution.repository.js';
import { getFacultyByIdRepository } from '../faculty/faculty.repository.js';

// ===================================
// Create Department
// ===================================
export async function createDepartmentService(data) {
  const { institution_id, faculty_id, department_name, department_code } = data;

  // Check institution exists
  const institution = await getInstitutionByIdRepository(institution_id);

  if (!institution) {
    throw new Error('Institution not found.');
  }

  // Check faculty exists
  const faculty = await getFacultyByIdRepository(faculty_id);

  if (!faculty) {
    throw new Error('Faculty not found.');
  }

  // Check duplicate code
  const codeExists = await findDepartmentByCodeRepository(
    institution_id,
    faculty_id,
    department_code,
  );

  if (codeExists) {
    throw new Error('Department code already exists.');
  }

  // Check duplicate name
  const nameExists = await findDepartmentByNameRepository(
    institution_id,
    faculty_id,
    department_name,
  );

  if (nameExists) {
    throw new Error('Department name already exists.');
  }

  return await createDepartmentRepository(data);
}

// ===================================
// Get All Departments
// ===================================
export async function getAllDepartmentsService() {
  return await getAllDepartmentsRepository();
}

// ===================================
// Get Department By ID
// ===================================
export async function getDepartmentByIdService(id) {
  const department = await getDepartmentByIdRepository(id);

  if (!department) {
    throw new Error('Department not found.');
  }

  return department;
}

// ===================================
// Update Department
// ===================================
export async function updateDepartmentService(id, data) {
  const department = await getDepartmentByIdRepository(id);

  if (!department) {
    throw new Error('Department not found.');
  }

  await updateDepartmentRepository(id, data);

  return true;
}

// ===================================
// Delete Department
// ===================================
export async function deleteDepartmentService(id) {
  const department = await getDepartmentByIdRepository(id);

  if (!department) {
    throw new Error('Department not found.');
  }

  await deleteDepartmentRepository(id);

  return true;
}
