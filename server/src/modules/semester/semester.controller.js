import {
  createSemesterService,
  getAllSemestersService,
  getSemesterByIdService,
  updateSemesterService,
  deleteSemesterService,
} from './semester.service.js';

// ===================================
// Create Semester
// ===================================
export async function createSemester(req, res) {
  try {
    const semesterId = await createSemesterService(req.body);

    return res.status(201).json({
      success: true,
      message: 'Semester created successfully.',
      semester_id: semesterId,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Get All Semesters
// ===================================
export async function getAllSemesters(req, res) {
  try {
    const semesters = await getAllSemestersService();

    return res.status(200).json({
      success: true,
      count: semesters.length,
      data: semesters,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Get Semester By ID
// ===================================
export async function getSemesterById(req, res) {
  try {
    const { id } = req.params;

    const semester = await getSemesterByIdService(id);

    return res.status(200).json({
      success: true,
      data: semester,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Update Semester
// ===================================
export async function updateSemester(req, res) {
  try {
    const { id } = req.params;

    await updateSemesterService(id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Semester updated successfully.',
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Delete Semester
// ===================================
export async function deleteSemester(req, res) {
  try {
    const { id } = req.params;

    await deleteSemesterService(id);

    return res.status(200).json({
      success: true,
      message: 'Semester deleted successfully.',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}
