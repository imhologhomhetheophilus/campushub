import {
  createCourseRepository,
  findCourseByCodeRepository,
  getAllCoursesRepository,
  getCourseByIdRepository,
  updateCourseRepository,
  deleteCourseRepository,
} from './course.repository.js';

import { getInstitutionByIdRepository } from '../institution/institution.repository.js';
import { getDepartmentByIdRepository } from '../department/department.repository.js';
import { getProgrammeByIdRepository } from '../programme/programme.repository.js';
import { getLevelByIdRepository } from '../level/level.repository.js';
import { getSemesterByIdRepository } from '../semester/semester.repository.js';

// ===================================
// Create Course
// ===================================
export async function createCourseService(data) {
  const {
    institution_id,
    department_id,
    programme_id,
    level_id,
    semester_id,
    course_code,
  } = data;

  // Validate Institution
  const institution = await getInstitutionByIdRepository(institution_id);

  if (!institution) {
    throw new Error('Institution not found.');
  }

  // Validate Department
  const department = await getDepartmentByIdRepository(department_id);

  if (!department) {
    throw new Error('Department not found.');
  }

  // Validate Programme
  const programme = await getProgrammeByIdRepository(programme_id);

  if (!programme) {
    throw new Error('Programme not found.');
  }

  // Validate Level
  const level = await getLevelByIdRepository(level_id);

  if (!level) {
    throw new Error('Level not found.');
  }

  // Validate Semester
  const semester = await getSemesterByIdRepository(semester_id);

  if (!semester) {
    throw new Error('Semester not found.');
  }

  // Duplicate Course Code
  const existingCourse = await findCourseByCodeRepository(
    programme_id,
    level_id,
    semester_id,
    course_code,
  );

  if (existingCourse) {
    throw new Error(
      'Course code already exists for this programme, level and semester.',
    );
  }

  return await createCourseRepository(data);
}

// ===================================
// Get All Courses
// ===================================
export async function getAllCoursesService() {
  return await getAllCoursesRepository();
}

// ===================================
// Get Course By ID
// ===================================
export async function getCourseByIdService(id) {
  const course = await getCourseByIdRepository(id);

  if (!course) {
    throw new Error('Course not found.');
  }

  return course;
}

// ===================================
// Update Course
// ===================================
export async function updateCourseService(id, data) {
  const course = await getCourseByIdRepository(id);

  if (!course) {
    throw new Error('Course not found.');
  }

  await updateCourseRepository(id, data);

  return true;
}

// ===================================
// Delete Course
// ===================================
export async function deleteCourseService(id) {
  const course = await getCourseByIdRepository(id);

  if (!course) {
    throw new Error('Course not found.');
  }

  await deleteCourseRepository(id);

  return true;
}
