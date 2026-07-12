import {
  createAcademicSessionService,
  getAllAcademicSessionsService,
  getAcademicSessionByIdService,
  updateAcademicSessionService,
  deleteAcademicSessionService,
} from './academic-session.service.js';

// ===================================
// Create Academic Session
// ===================================
export async function createAcademicSession(req, res) {
  try {
    const sessionId = await createAcademicSessionService(req.body);

    return res.status(201).json({
      success: true,
      message: 'Academic session created successfully.',
      session_id: sessionId,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Get All Academic Sessions
// ===================================
export async function getAllAcademicSessions(req, res) {
  try {
    const sessions = await getAllAcademicSessionsService();

    return res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Get Academic Session By ID
// ===================================
export async function getAcademicSessionById(req, res) {
  try {
    const { id } = req.params;

    const session = await getAcademicSessionByIdService(id);

    return res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Update Academic Session
// ===================================
export async function updateAcademicSession(req, res) {
  try {
    const { id } = req.params;

    await updateAcademicSessionService(id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Academic session updated successfully.',
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Delete Academic Session
// ===================================
export async function deleteAcademicSession(req, res) {
  try {
    const { id } = req.params;

    await deleteAcademicSessionService(id);

    return res.status(200).json({
      success: true,
      message: 'Academic session deleted successfully.',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}
