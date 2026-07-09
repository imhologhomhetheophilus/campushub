import {
  createInstitution,
  findInstitutionByCode,
} from './institution.repository.js';

export async function createInstitutionService(data) {
  const existing = await findInstitutionByCode(data.institution_code);

  if (existing) {
    throw new Error('Institution code already exists.');
  }

  const id = await createInstitution(data);

  return id;
}
