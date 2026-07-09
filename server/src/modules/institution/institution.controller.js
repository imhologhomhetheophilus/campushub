import {
  createInstitutionService,
  getAllInstitutionsService,
} from './institution.service.js';

// ===============================
// Create Institution
// ===============================
export async function createInstitution(req, res) {
  try {
    const institutionId = await createInstitutionService(req.body);

    return res.status(201).json({
      success: true,
      message: 'Institution created successfully.',
      institution_id: institutionId,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// ===============================
// Get All Institutions
// ===============================
export async function getAllInstitutions(req, res) {
  try {
    const institutions = await getAllInstitutionsService();

    return res.status(200).json({
      success: true,
      count: institutions.length,
      data: institutions,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
