import {
  createInstitutionRepository,
  findInstitutionByCodeRepository,
  getAllInstitutionsRepository,
  getInstitutionByIdRepository,
  updateInstitutionRepository,
  deleteInstitutionRepository,
} from './institution.repository.js';

// ===============================
// Create Institution
// ===============================
export async function createInstitutionService(data) {
  const existing = await findInstitutionByCodeRepository(data.institution_code);

  if (existing) {
    throw new Error('Institution code already exists.');
  }

  const institutionId = await createInstitutionRepository(data);

  return institutionId;
}

// ===============================
// Get All Institutions
// ===============================
export async function getAllInstitutionsService() {
  return await getAllInstitutionsRepository();
}

// ===============================
// Get Institution By ID
// ===============================
export async function getInstitutionByIdService(id) {
  const institution = await getInstitutionByIdRepository(id);

  if (!institution) {
    throw new Error('Institution not found.');
  }

  return institution;
}

// ===============================
// Update Institution
// ===============================
export async function updateInstitutionService(id, data) {
  const institution = await getInstitutionByIdRepository(id);

  if (!institution) {
    throw new Error('Institution not found.');
  }

  await updateInstitutionRepository(id, data);

  return true;
}

// ===============================
// Delete Institution
// ===============================
export async function deleteInstitutionService(id) {
  const institution = await getInstitutionByIdRepository(id);

  if (!institution) {
    throw new Error('Institution not found.');
  }

  await deleteInstitutionRepository(id);

  return true;
}
