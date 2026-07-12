import db from '../../config/database.js';

// ===================================
// Create Course
// ===================================
export async function createCourseRepository(data) {
  const {
    institution_id,
    department_id,
    programme_id,
    level_id,
    semester_id,
    course_code,
    course_title,
    course_unit,
    course_type,
    description,
  } = data;

  const [result] = await db.execute(
    `
    INSERT INTO courses (
      institution_id,
      department_id,
      programme_id,
      level_id,
      semester_id,
      course_code,
      course_title,
      course_unit,
      course_type,
      description
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      institution_id,
      department_id,
      programme_id,
      level_id,
      semester_id,
      course_code,
      course_title,
      course_unit,
      course_type,
      description ?? null,
    ],
  );

  return result.insertId;
}

// ===================================
// Find Course By Code
// ===================================
export async function findCourseByCodeRepository(
  programme_id,
  level_id,
  semester_id,
  course_code,
) {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM courses
    WHERE programme_id = ?
      AND level_id = ?
      AND semester_id = ?
      AND course_code = ?
    `,
    [programme_id, level_id, semester_id, course_code],
  );

  return rows[0];
}

// ===================================
// Get All Courses
// ===================================
export async function getAllCoursesRepository() {
  const [rows] = await db.execute(`
    SELECT
      c.course_id,
      c.course_code,
      c.course_title,
      c.course_unit,
      c.course_type,
      c.description,
      c.is_active,
      c.created_at,

      i.institution_id,
      i.institution_name,

      d.department_id,
      d.department_name,

      p.programme_id,
      p.programme_name,

      l.level_id,
      l.level_name,

      s.semester_id,
      s.semester_name

    FROM courses c

    INNER JOIN institutions i
      ON c.institution_id = i.institution_id

    INNER JOIN departments d
      ON c.department_id = d.department_id

    INNER JOIN programmes p
      ON c.programme_id = p.programme_id

    INNER JOIN levels l
      ON c.level_id = l.level_id

    INNER JOIN semesters s
      ON c.semester_id = s.semester_id

    ORDER BY
      i.institution_name,
      p.programme_name,
      l.level_order,
      c.course_code;
  `);

  return rows;
}

// ===================================
// Get Course By ID
// ===================================
export async function getCourseByIdRepository(id) {
  const [rows] = await db.execute(
    `
    SELECT
      c.*,

      i.institution_name,
      d.department_name,
      p.programme_name,
      l.level_name,
      s.semester_name

    FROM courses c

    INNER JOIN institutions i
      ON c.institution_id = i.institution_id

    INNER JOIN departments d
      ON c.department_id = d.department_id

    INNER JOIN programmes p
      ON c.programme_id = p.programme_id

    INNER JOIN levels l
      ON c.level_id = l.level_id

    INNER JOIN semesters s
      ON c.semester_id = s.semester_id

    WHERE c.course_id = ?
    `,
    [id],
  );

  return rows[0];
}

// ===================================
// Update Course
// ===================================
export async function updateCourseRepository(id, data) {
  const {
    institution_id,
    department_id,
    programme_id,
    level_id,
    semester_id,
    course_code,
    course_title,
    course_unit,
    course_type,
    description,
  } = data;

  const [result] = await db.execute(
    `
    UPDATE courses
    SET
      institution_id = ?,
      department_id = ?,
      programme_id = ?,
      level_id = ?,
      semester_id = ?,
      course_code = ?,
      course_title = ?,
      course_unit = ?,
      course_type = ?,
      description = ?
    WHERE course_id = ?
    `,
    [
      institution_id,
      department_id,
      programme_id,
      level_id,
      semester_id,
      course_code,
      course_title,
      course_unit,
      course_type,
      description ?? null,
      id,
    ],
  );

  return result.affectedRows;
}

// ===================================
// Delete Course
// ===================================
export async function deleteCourseRepository(id) {
  const [result] = await db.execute(
    `
    DELETE FROM courses
    WHERE course_id = ?
    `,
    [id],
  );

  return result.affectedRows;
}
