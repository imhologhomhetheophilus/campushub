import {
  createInstitutionService,
  getAllInstitutionsService,
  getInstitutionByIdService,
  updateInstitutionService,
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
// ===============================
// Get Institution By ID
// ===============================
export async function getInstitutionById(req, res) {
  try {
    const { id } = req.params;

    const institution = await getInstitutionByIdService(id);

    return res.status(200).json({
      success: true,
      data: institution,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}
// ===============================
// Update Institution
// ===============================
export async function updateInstitution(req, res) {
  try {
    const { id } = req.params;

    await updateInstitutionService(id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Institution updated successfully.',
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
