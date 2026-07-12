import db from '../../config/database.js';

// ===================================
// Create Student (Transaction)
// ===================================
export async function createStudentRepository(connection, studentData) {
  const [result] = await connection.execute(
    `
      INSERT INTO students (
        user_id,
        institution_id,
        matric_number,
        admission_number,
        admission_session_id,
        student_status
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      studentData.user_id,
      studentData.institution_id,
      studentData.matric_number,
      studentData.admission_number,
      studentData.admission_session_id,
      studentData.student_status,
    ],
  );

  return result.insertId;
}

// ===================================
// Create Student Enrollment (Transaction)
// ===================================
export async function createStudentEnrollmentRepository(
  connection,
  enrollmentData,
) {
  const [result] = await connection.execute(
    `
      INSERT INTO student_enrollments (
        student_id,
        programme_id,
        level_id,
        session_id,
        semester_id,
        enrollment_date,
        is_current
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      enrollmentData.student_id,
      enrollmentData.programme_id,
      enrollmentData.level_id,
      enrollmentData.session_id,
      enrollmentData.semester_id,
      enrollmentData.enrollment_date,
      enrollmentData.is_current,
    ],
  );

  return result.insertId;
}

// ===================================
// Get All Students
// ===================================
export async function getAllStudentsRepository() {
  const [rows] = await db.execute(`
    SELECT
      s.student_id,
      s.matric_number,
      s.admission_number,
      s.student_status,
      s.created_at,

      u.user_id,
      u.first_name,
      u.last_name,
      u.other_name,
      u.email,
      u.phone,

      i.institution_id,
      i.institution_name,
      i.short_name,

      ses.session_id,
      ses.session_name

    FROM students s

    INNER JOIN users u
      ON s.user_id = u.user_id

    INNER JOIN institutions i
      ON s.institution_id = i.institution_id

    INNER JOIN academic_sessions ses
      ON s.admission_session_id = ses.session_id

    ORDER BY s.student_id DESC
  `);

  return rows;
}

// ===================================
// Get Student By ID
// ===================================
export async function getStudentByIdRepository(studentId) {
  const [rows] = await db.execute(
    `
      SELECT
        s.*,

        u.first_name,
        u.last_name,
        u.other_name,
        u.email,
        u.phone,

        i.institution_name,
        i.short_name,

        ses.session_name

      FROM students s

      INNER JOIN users u
        ON s.user_id = u.user_id

      INNER JOIN institutions i
        ON s.institution_id = i.institution_id

      INNER JOIN academic_sessions ses
        ON s.admission_session_id = ses.session_id

      WHERE s.student_id = ?
    `,
    [studentId],
  );

  return rows[0];
}

// ===================================
// Get Student By User ID
// ===================================
export async function getStudentByUserIdRepository(userId) {
  const [rows] = await db.execute(
    `
      SELECT *
      FROM students
      WHERE user_id = ?
    `,
    [userId],
  );

  return rows[0];
}

// ===================================
// Get Student By Matric Number
// ===================================
export async function getStudentByMatricRepository(matricNumber) {
  const [rows] = await db.execute(
    `
      SELECT *
      FROM students
      WHERE matric_number = ?
    `,
    [matricNumber],
  );

  return rows[0];
}

// ===================================
// Get Student By Admission Number
// ===================================
export async function getStudentByAdmissionRepository(admissionNumber) {
  const [rows] = await db.execute(
    `
      SELECT *
      FROM students
      WHERE admission_number = ?
    `,
    [admissionNumber],
  );

  return rows[0];
}

// ===================================
// Update Student
// ===================================
export async function updateStudentRepository(studentId, studentData) {
  await db.execute(
    `
      UPDATE students
      SET
        institution_id = ?,
        matric_number = ?,
        admission_number = ?,
        admission_session_id = ?,
        student_status = ?
      WHERE student_id = ?
    `,
    [
      studentData.institution_id,
      studentData.matric_number,
      studentData.admission_number,
      studentData.admission_session_id,
      studentData.student_status,
      studentId,
    ],
  );
}

// ===================================
// Delete Student
// ===================================
export async function deleteStudentRepository(studentId) {
  await db.execute(
    `
      DELETE FROM students
      WHERE student_id = ?
    `,
    [studentId],
  );
}
