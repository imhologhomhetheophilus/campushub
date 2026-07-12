import db from '../../config/database.js';

// ===============================
// Create Faculty
// ===============================
export async function createFacultyRepository(data) {
  const { institution_id, faculty_name, faculty_code, description } = data;

  const [result] = await db.execute(
    `
    INSERT INTO faculties
    (
      institution_id,
      faculty_name,
      faculty_code,
      description
    )
    VALUES (?, ?, ?, ?)
    `,
    [institution_id, faculty_name, faculty_code, description ?? null],
  );

  return result.insertId;
}

// ===============================
// Find Faculty By Code
// ===============================
export async function findFacultyByCodeRepository(
  institution_id,
  faculty_code,
) {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM faculties
    WHERE institution_id = ?
      AND faculty_code = ?
    `,
    [institution_id, faculty_code],
  );

  return rows[0];
}

// ===============================
// Find Faculty By Name
// ===============================
export async function findFacultyByNameRepository(
  institution_id,
  faculty_name,
) {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM faculties
    WHERE institution_id = ?
      AND faculty_name = ?
    `,
    [institution_id, faculty_name],
  );

  return rows[0];
}

// ===============================
// Get All Faculties
// ===============================
export async function getAllFacultiesRepository() {
  const [rows] = await db.execute(
    `
    SELECT
      faculty_id,
      institution_id,
      faculty_name,
      faculty_code,
      description,
      is_active,
      created_at,
      updated_at

    FROM faculties

    ORDER BY faculty_name ASC
    `,
  );

  return rows;
}

// ===============================
// Get Faculty By ID
// ===============================
export async function getFacultyByIdRepository(id) {
  const [rows] = await db.execute(
    `
    SELECT
      faculty_id,
      institution_id,
      faculty_name,
      faculty_code,
      description,
      is_active,
      created_at,
      updated_at

    FROM faculties

    WHERE faculty_id = ?
    `,
    [id],
  );

  return rows[0];
}

// ===============================
// Update Faculty
// ===============================
export async function updateFacultyRepository(id, data) {
  const {
    institution_id,
    faculty_name,
    faculty_code,
    description = null,
  } = data;

  const [result] = await db.execute(
    `
    UPDATE faculties
    SET
      institution_id = ?,
      faculty_name = ?,
      faculty_code = ?,
      description = ?

    WHERE faculty_id = ?
    `,
    [institution_id, faculty_name, faculty_code, description, id],
  );

  return result.affectedRows;
}

// ===============================
// Delete Faculty
// ===============================
export async function deleteFacultyRepository(id) {
  const [result] = await db.execute(
    `
    DELETE FROM faculties
    WHERE faculty_id = ?
    `,
    [id],
  );

  return result.affectedRows;
}
