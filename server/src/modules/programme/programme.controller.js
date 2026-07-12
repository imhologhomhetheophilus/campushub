import {
  createProgrammeService,
  getAllProgrammesService,
  getProgrammeByIdService,
  updateProgrammeService,
  deleteProgrammeService,
} from './programme.service.js';

// ===================================
// Create Programme
// ===================================
export async function createProgramme(req, res) {
  try {
    const programmeId = await createProgrammeService(req.body);

    return res.status(201).json({
      success: true,
      message: 'Programme created successfully.',
      programme_id: programmeId,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
// ===================================
// Get All Programmes
// ===================================
export async function getAllProgrammes(req, res) {
  try {
    const programmes = await getAllProgrammesService();

    return res.status(200).json({
      success: true,
      count: programmes.length,
      data: programmes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
// ===================================
// Get Programme By ID
// ===================================
export async function getProgrammeById(req, res) {
  try {
    const { id } = req.params;

    const programme = await getProgrammeByIdService(id);

    return res.status(200).json({
      success: true,
      data: programme,
    });
  } catch (error) {
    console.log('========== ERROR ==========');
    console.error(error);
    console.log('===========================');

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
// ===================================
// Update Programme
// ===================================
export async function updateProgramme(req, res) {
  try {
    const { id } = req.params;

    console.log('========== UPDATE PROGRAMME ==========');
    console.log('ID:', id);
    console.log('BODY:', req.body);
    console.log('======================================');

    await updateProgrammeService(id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Programme updated successfully.',
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
// ===================================
// Delete Programme
// ===================================
export async function deleteProgramme(req, res) {
  try {
    const { id } = req.params;

    await deleteProgrammeService(id);

    return res.status(200).json({
      success: true,
      message: 'Programme deleted successfully.',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}
