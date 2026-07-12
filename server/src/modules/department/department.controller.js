import {
  createDepartmentService,
  getAllDepartmentsService,
  getDepartmentByIdService,
  updateDepartmentService,
  deleteDepartmentService,
} from './department.service.js';

// ===================================
// Create Department
// ===================================
export async function createDepartment(req, res) {
  try {
    const departmentId = await createDepartmentService(req.body);

    return res.status(201).json({
      success: true,
      message: 'Department created successfully.',
      department_id: departmentId,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
// ===================================
// Get All Departments
// ===================================
export async function getAllDepartments(req, res) {
  try {
    const departments = await getAllDepartmentsService();

    return res.status(200).json({
      success: true,
      count: departments.length,
      data: departments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
// ===================================
// Get Department By ID
// ===================================
export async function getDepartmentById(req, res) {
  try {
    const { id } = req.params;

    const department = await getDepartmentByIdService(id);

    return res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}
// ===================================
// Update Department
// ===================================
export async function updateDepartment(req, res) {
  try {
    const { id } = req.params;

    await updateDepartmentService(id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Department updated successfully.',
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
// ===================================
// Delete Department
// ===================================
export async function deleteDepartment(req, res) {
  try {
    const { id } = req.params;

    await deleteDepartmentService(id);

    return res.status(200).json({
      success: true,
      message: 'Department deleted successfully.',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}
