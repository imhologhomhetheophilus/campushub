import {
  createFacultyService,
  getAllFacultiesService,
  getFacultyByIdService,
  updateFacultyService,
  deleteFacultyService,
} from './faculty.service.js';

// ===============================
// Create Faculty
// ===============================
export async function createFaculty(req, res) {
  try {
    const facultyId = await createFacultyService(req.body);

    return res.status(201).json({
      success: true,
      message: 'Faculty created successfully.',
      faculty_id: facultyId,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
// ===============================
// Get All Faculties
// ===============================
export async function getAllFaculties(req, res) {
  try {
    const faculties = await getAllFacultiesService();

    return res.status(200).json({
      success: true,
      count: faculties.length,
      data: faculties,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
// ===============================
// Get Faculty By ID
// ===============================
export async function getFacultyById(req, res) {
  try {
    const { id } = req.params;

    const faculty = await getFacultyByIdService(id);

    return res.status(200).json({
      success: true,
      data: faculty,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}
// ===============================
// Update Faculty
// ===============================
export async function updateFaculty(req, res) {
  try {
    const { id } = req.params;

    await updateFacultyService(id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Faculty updated successfully.',
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
// ===============================
// Delete Faculty
// ===============================
export async function deleteFaculty(req, res) {
  try {
    const { id } = req.params;

    await deleteFacultyService(id);

    return res.status(200).json({
      success: true,
      message: 'Faculty deleted successfully.',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}
