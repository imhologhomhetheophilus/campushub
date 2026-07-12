import {
  createLevelRepository,
  findLevelByCodeRepository,
  findLevelByNameRepository,
  getAllLevelsRepository,
  getLevelByIdRepository,
  updateLevelRepository,
  deleteLevelRepository,
} from './level.repository.js';

import { getInstitutionByIdRepository } from '../institution/institution.repository.js';
import { getProgrammeByIdRepository } from '../programme/programme.repository.js';

// ===================================
// Create Level
// ===================================
export async function createLevelService(data) {
  const { institution_id, programme_id, level_name, level_code } = data;

  // Check institution exists
  const institution = await getInstitutionByIdRepository(institution_id);

  if (!institution) {
    throw new Error('Institution not found.');
  }

  // Check programme exists
  const programme = await getProgrammeByIdRepository(programme_id);

  if (!programme) {
    throw new Error('Programme not found.');
  }

  // Check duplicate code
  const codeExists = await findLevelByCodeRepository(programme_id, level_code);

  if (codeExists) {
    throw new Error('Level code already exists.');
  }

  // Check duplicate name
  const nameExists = await findLevelByNameRepository(programme_id, level_name);

  if (nameExists) {
    throw new Error('Level name already exists.');
  }

  return await createLevelRepository(data);
}

// ===================================
// Get All Levels
// ===================================
export async function getAllLevelsService() {
  return await getAllLevelsRepository();
}

// ===================================
// Get Level By ID
// ===================================
export async function getLevelByIdService(id) {
  const level = await getLevelByIdRepository(id);

  if (!level) {
    throw new Error('Level not found.');
  }

  return level;
}

// ===================================
// Update Level
// ===================================
export async function updateLevelService(id, data) {
  const level = await getLevelByIdRepository(id);

  if (!level) {
    throw new Error('Level not found.');
  }

  await updateLevelRepository(id, data);

  return true;
}

// ===================================
// Delete Level
// ===================================
export async function deleteLevelService(id) {
  const level = await getLevelByIdRepository(id);

  if (!level) {
    throw new Error('Level not found.');
  }

  await deleteLevelRepository(id);

  return true;
}
