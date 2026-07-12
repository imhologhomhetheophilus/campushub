import db from '../../config/database.js';

// ===================================
// Create Academic Session
// ===================================
export async function createAcademicSessionRepository(data) {
  const {
    institution_id,
    session_name,
    start_year,
    end_year,
    start_date,
    end_date,
    is_current,
  } = data;

  const [result] = await db.execute(
    `
    INSERT INTO academic_sessions
    (
      institution_id,
      session_name,
      start_year,
      end_year,
      start_date,
      end_date,
      is_current
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      institution_id,
      session_name,
      start_year,
      end_year,
      start_date,
      end_date,
      is_current,
    ],
  );

  return result.insertId;
}

// ===================================
// Find Session By Name
// ===================================
export async function findSessionByNameRepository(
  institution_id,
  session_name,
) {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM academic_sessions
    WHERE institution_id = ?
    AND session_name = ?
    `,
    [institution_id, session_name],
  );

  return rows[0];
}

// ===================================
// Get All Sessions
// ===================================
export async function getAllAcademicSessionsRepository() {
  const [rows] = await db.execute(
    `
    SELECT
      s.session_id,
      s.session_name,
      s.start_year,
      s.end_year,
      s.start_date,
      s.end_date,
      s.is_current,
      s.is_active,
      s.created_at,
      s.updated_at,

      i.institution_id,
      i.institution_name,
      i.short_name

    FROM academic_sessions s

    INNER JOIN institutions i
      ON s.institution_id = i.institution_id

    ORDER BY
      s.start_year DESC
    `,
  );

  return rows;
}

// ===================================
// Get Session By ID
// ===================================
export async function getAcademicSessionByIdRepository(id) {
  const [rows] = await db.execute(
    `
    SELECT
      s.*,

      i.institution_name,
      i.short_name

    FROM academic_sessions s

    INNER JOIN institutions i
      ON s.institution_id = i.institution_id

    WHERE s.session_id = ?
    `,
    [id],
  );

  return rows[0];
}

// ===================================
// Update Academic Session
// ===================================
export async function updateAcademicSessionRepository(id, data) {
  const {
    session_name,
    start_year,
    end_year,
    start_date,
    end_date,
    is_current,
    is_active,
  } = data;

  const [result] = await db.execute(
    `
    UPDATE academic_sessions
    SET
      session_name = ?,
      start_year = ?,
      end_year = ?,
      start_date = ?,
      end_date = ?,
      is_current = ?,
      is_active = ?

    WHERE session_id = ?
    `,
    [
      session_name,
      start_year,
      end_year,
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
// Delete Academic Session
// ===================================
export async function deleteAcademicSessionRepository(id) {
  const [result] = await db.execute(
    `
    DELETE FROM academic_sessions
    WHERE session_id = ?
    `,
    [id],
  );

  return result.affectedRows;
}

// ===================================
// Remove Current Session
// ===================================
export async function clearCurrentSessionRepository(institution_id) {
  await db.execute(
    `
    UPDATE academic_sessions
    SET is_current = 0
    WHERE institution_id = ?
    `,
    [institution_id],
  );
}
