import {
  createProgrammeRepository,
  findProgrammeByCodeRepository,
  findProgrammeByNameRepository,
  getAllProgrammesRepository,
  getProgrammeByIdRepository,
  updateProgrammeRepository,
  deleteProgrammeRepository,
} from './programme.repository.js';

import { getInstitutionByIdRepository } from '../institution/institution.repository.js';
import { getDepartmentByIdRepository } from '../department/department.repository.js';

// ===================================
// Create Programme
// ===================================
export async function createProgrammeService(data) {
  const { institution_id, department_id, programme_name, programme_code } =
    data;

  // Check institution exists
  const institution = await getInstitutionByIdRepository(institution_id);

  if (!institution) {
    throw new Error('Institution not found.');
  }

  // Check department exists
  const department = await getDepartmentByIdRepository(department_id);

  if (!department) {
    throw new Error('Department not found.');
  }

  // Check duplicate code
  const codeExists = await findProgrammeByCodeRepository(
    institution_id,
    department_id,
    programme_code,
  );

  if (codeExists) {
    throw new Error('Programme code already exists.');
  }

  // Check duplicate name
  const nameExists = await findProgrammeByNameRepository(
    institution_id,
    department_id,
    programme_name,
  );

  if (nameExists) {
    throw new Error('Programme name already exists.');
  }

  return await createProgrammeRepository(data);
}

// ===================================
// Get All Programmes
// ===================================
export async function getAllProgrammesService() {
  return await getAllProgrammesRepository();
}

// ===================================
// Get Programme By ID
// ===================================
export async function getProgrammeByIdService(id) {
  const programme = await getProgrammeByIdRepository(id);

  if (!programme) {
    throw new Error('Programme not found.');
  }

  return programme;
}

// ===================================
// Update Programme
// ===================================
export async function updateProgrammeService(id, data) {
  const programme = await getProgrammeByIdRepository(id);

  if (!programme) {
    throw new Error('Programme not found.');
  }

  await updateProgrammeRepository(id, data);

  return true;
}

// ===================================
// Delete Programme
// ===================================
export async function deleteProgrammeService(id) {
  const programme = await getProgrammeByIdRepository(id);

  if (!programme) {
    throw new Error('Programme not found.');
  }

  await deleteProgrammeRepository(id);

  return true;
}
