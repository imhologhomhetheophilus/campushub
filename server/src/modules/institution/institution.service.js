import {
  createInstitution,
  findInstitutionByCode,
  getAllInstitutions,
  getInstitutionById,
  updateInstitution,
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
// ===============================
// Get Institution By ID
// ===============================
export async function getInstitutionByIdService(id) {
  const institution = await getInstitutionById(id);

  if (!institution) {
    throw new Error('Institution not found.');
  }

  return institution;
}
// ===============================
// Update Institution
// ===============================
export async function updateInstitutionService(id, data) {
  const institution = await getInstitutionById(id);

  if (!institution) {
    throw new Error('Institution not found.');
  }

  await updateInstitution(id, data);

  return true;
}
