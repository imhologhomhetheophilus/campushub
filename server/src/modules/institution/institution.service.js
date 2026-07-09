import {
  createInstitution,
  findInstitutionByCode,
  getAllInstitutions,
} from './institution.repository.js';

// ===============================
// Create Institution
// ===============================
export async function createInstitutionService(data) {
  const existing = await findInstitutionByCode(data.institution_code);

  if (existing) {
    throw new Error('Institution code already exists.');
  }

  const institutionId = await createInstitution(data);

  return institutionId;
}

// ===============================
// Get All Institutions
// ===============================
export async function getAllInstitutionsService() {
  return await getAllInstitutions();
}
