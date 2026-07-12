import db from '../../config/database.js';

// ===================================
// Create Semester
// ===================================
export async function createSemesterRepository(data) {
  const {
    institution_id,
    session_id,
    semester_name,
    semester_code,
    semester_order,
    start_date,
    end_date,
    is_current,
  } = data;

  const [result] = await db.execute(
    `
    INSERT INTO semesters
    (
      institution_id,
      session_id,
      semester_name,
      semester_code,
      semester_order,
      start_date,
      end_date,
      is_current
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      institution_id,
      session_id,
      semester_name,
      semester_code,
      semester_order,
      start_date,
      end_date,
      is_current,
    ],
  );

  return result.insertId;
}

// ===================================
// Find Semester By Name
// ===================================
export async function findSemesterByNameRepository(session_id, semester_name) {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM semesters
    WHERE session_id = ?
    AND semester_name = ?
    `,
    [session_id, semester_name],
  );

  return rows[0];
}

// ===================================
// Get All Semesters
// ===================================
export async function getAllSemestersRepository() {
  const [rows] = await db.execute(
    `
    SELECT

      s.semester_id,
      s.semester_name,
      s.semester_code,
      s.semester_order,
      s.start_date,
      s.end_date,
      s.is_current,
      s.is_active,
      s.created_at,
      s.updated_at,


      i.institution_id,
      i.institution_name,
      i.short_name,


      a.session_id,
      a.session_name,
      a.start_year,
      a.end_year


    FROM semesters s


    INNER JOIN institutions i
      ON s.institution_id = i.institution_id


    INNER JOIN academic_sessions a
      ON s.session_id = a.session_id


    ORDER BY
      a.start_year DESC,
      s.semester_order ASC

    `,
  );

  return rows;
}

// ===================================
// Get Semester By ID
// ===================================
export async function getSemesterByIdRepository(id) {
  const [rows] = await db.execute(
    `
    SELECT

      s.*,

      i.institution_name,
      i.short_name,

      a.session_name


    FROM semesters s


    INNER JOIN institutions i
      ON s.institution_id = i.institution_id


    INNER JOIN academic_sessions a
      ON s.session_id = a.session_id


    WHERE s.semester_id = ?

    `,
    [id],
  );

  return rows[0];
}

// ===================================
// Update Semester
// ===================================
export async function updateSemesterRepository(id, data) {
  const {
    semester_name,
    semester_code,
    semester_order,
    start_date,
    end_date,
    is_current,
    is_active,
  } = data;

  const [result] = await db.execute(
    `
    UPDATE semesters
    SET

      semester_name = ?,
      semester_code = ?,
      semester_order = ?,
      start_date = ?,
      end_date = ?,
      is_current = ?,
      is_active = ?


    WHERE semester_id = ?

    `,
    [
      semester_name,
      semester_code,
      semester_order,
      start_date,
      end_date,
      is_current,
      is_active,
      id,
    ],
  );

  return result.affectedRows;
}

// ===================================
// Delete Semester
// ===================================
export async function deleteSemesterRepository(id) {
  const [result] = await db.execute(
    `
    DELETE FROM semesters
    WHERE semester_id = ?
    `,
    [id],
  );

  return result.affectedRows;
}

// ===================================
// Clear Current Semester
// ===================================
export async function clearCurrentSemesterRepository(session_id) {
  await db.execute(
    `
    UPDATE semesters
    SET is_current = 0

    WHERE session_id = ?

    `,
    [session_id],
  );
}
