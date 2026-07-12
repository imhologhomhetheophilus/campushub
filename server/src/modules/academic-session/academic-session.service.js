import {
  createAcademicSessionRepository,
  findSessionByNameRepository,
  getAllAcademicSessionsRepository,
  getAcademicSessionByIdRepository,
  updateAcademicSessionRepository,
  deleteAcademicSessionRepository,
  clearCurrentSessionRepository,
} from './academic-session.repository.js';

import { getInstitutionByIdRepository } from '../institution/institution.repository.js';

// ===================================
// Create Academic Session
// ===================================
export async function createAcademicSessionService(data) {
  const { institution_id, session_name, start_year, end_year, is_current } =
    data;

  // Check institution
  const institution = await getInstitutionByIdRepository(institution_id);

  if (!institution) {
    throw new Error('Institution not found.');
  }

  // Validate years
  if (start_year >= end_year) {
    throw new Error('Start year must be less than end year.');
  }

  // Validate session format
  const expectedSession = `${start_year}/${end_year}`;

  if (session_name !== expectedSession) {
    throw new Error('Session name must match start year and end year.');
  }

  // Check duplicate
  const existingSession = await findSessionByNameRepository(
    institution_id,
    session_name,
  );

  if (existingSession) {
    throw new Error('Academic session already exists.');
  }

  // Handle current session
  if (is_current) {
    await clearCurrentSessionRepository(institution_id);
  }

  return await createAcademicSessionRepository(data);
}

// ===================================
// Get All Sessions
// ===================================
export async function getAllAcademicSessionsService() {
  return await getAllAcademicSessionsRepository();
}

// ===================================
// Get Session By ID
// ===================================
export async function getAcademicSessionByIdService(id) {
  const session = await getAcademicSessionByIdRepository(id);

  if (!session) {
    throw new Error('Academic session not found.');
  }

  return session;
}

// ===================================
// Update Session
// ===================================
export async function updateAcademicSessionService(id, data) {
  const session = await getAcademicSessionByIdRepository(id);

  if (!session) {
    throw new Error('Academic session not found.');
  }

  const { start_year, end_year, session_name, is_current } = data;

  // Validate years
  if (start_year >= end_year) {
    throw new Error('Start year must be less than end year.');
  }

  // Validate session format
  const expectedSession = `${start_year}/${end_year}`;

  if (session_name !== expectedSession) {
    throw new Error('Session name must match start year and end year.');
  }

  // Handle current session
  if (is_current) {
    await clearCurrentSessionRepository(session.institution_id);
  }

  await updateAcademicSessionRepository(id, data);

  return true;
}

// ===================================
// Delete Session
// ===================================
export async function deleteAcademicSessionService(id) {
  const session = await getAcademicSessionByIdRepository(id);

  if (!session) {
    throw new Error('Academic session not found.');
  }

  await deleteAcademicSessionRepository(id);

  return true;
}
