import {
  createCourseService,
  getAllCoursesService,
  getCourseByIdService,
  updateCourseService,
  deleteCourseService,
} from './course.service.js';

// ===================================
// Create Course
// ===================================
export async function createCourse(req, res) {
  try {
    const courseId = await createCourseService(req.body);

    return res.status(201).json({
      success: true,
      message: 'Course created successfully.',
      course_id: courseId,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Get All Courses
// ===================================
export async function getAllCourses(req, res) {
  try {
    const courses = await getAllCoursesService();

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Get Course By ID
// ===================================
export async function getCourseById(req, res) {
  try {
    const { id } = req.params;

    const course = await getCourseByIdService(id);

    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Update Course
// ===================================
export async function updateCourse(req, res) {
  try {
    const { id } = req.params;

    await updateCourseService(id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Course updated successfully.',
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Delete Course
// ===================================
export async function deleteCourse(req, res) {
  try {
    const { id } = req.params;

    await deleteCourseService(id);

    return res.status(200).json({
      success: true,
      message: 'Course deleted successfully.',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}
