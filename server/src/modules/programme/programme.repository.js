import db from '../../config/database.js';

// ===================================
// Create Programme
// ===================================
export async function createProgrammeRepository(data) {
  const {
    institution_id,
    department_id,
    programme_name,
    programme_code,
    award_type,
    duration_years,
  } = data;

  const [result] = await db.execute(
    `
    INSERT INTO programmes
    (
      institution_id,
      department_id,
      programme_name,
      programme_code,
      award_type,
      duration_years
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      institution_id,
      department_id,
      programme_name,
      programme_code,
      award_type,
      duration_years,
    ],
  );

  return result.insertId;
}

// ===================================
// Find Programme By Code
// ===================================
export async function findProgrammeByCodeRepository(
  institution_id,
  department_id,
  programme_code,
) {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM programmes
    WHERE institution_id = ?
      AND department_id = ?
      AND programme_code = ?
    `,
    [institution_id, department_id, programme_code],
  );

  return rows[0];
}

// ===================================
// Find Programme By Name
// ===================================
export async function findProgrammeByNameRepository(
  institution_id,
  department_id,
  programme_name,
) {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM programmes
    WHERE institution_id = ?
      AND department_id = ?
      AND programme_name = ?
    `,
    [institution_id, department_id, programme_name],
  );

  return rows[0];
}

// ===================================
// Get All Programmes
// ===================================
export async function getAllProgrammesRepository() {
  const [rows] = await db.execute(
    `
    SELECT
      p.programme_id,
      p.programme_name,
      p.programme_code,
      p.award_type,
      p.duration_years,
      p.is_active,
      p.created_at,

      i.institution_id,
      i.institution_name,
      i.short_name,

      d.department_id,
      d.department_name,
      d.department_code,

      f.faculty_id,
      f.faculty_name,
      f.faculty_code

    FROM programmes p

    INNER JOIN institutions i
      ON p.institution_id = i.institution_id

    INNER JOIN departments d
      ON p.department_id = d.department_id

    INNER JOIN faculties f
      ON d.faculty_id = f.faculty_id

    ORDER BY
      i.institution_name,
      f.faculty_name,
      d.department_name,
      p.programme_name
    `,
  );

  return rows;
}

// ===================================
// Get Programme By ID
// ===================================
export async function getProgrammeByIdRepository(id) {
  const [rows] = await db.execute(
    `
    SELECT
      p.programme_id,
      p.programme_name,
      p.programme_code,
      p.award_type,
      p.duration_years,
      p.is_active,
      p.created_at,
      p.updated_at,

      i.institution_id,
      i.institution_name,
      i.short_name,

      f.faculty_id,
      f.faculty_name,
      f.faculty_code,

      d.department_id,
      d.department_name,
      d.department_code

    FROM programmes p

    INNER JOIN institutions i
      ON p.institution_id = i.institution_id

    INNER JOIN departments d
      ON p.department_id = d.department_id

    INNER JOIN faculties f
      ON d.faculty_id = f.faculty_id

    WHERE p.programme_id = ?
    `,
    [id],
  );

  return rows[0];
}

// ===================================
// Update Programme
// ===================================
export async function updateProgrammeRepository(id, data) {
  const { programme_name, programme_code, award_type, duration_years } = data;

  const [result] = await db.execute(
    `
    UPDATE programmes
    SET
      programme_name = ?,
      programme_code = ?,
      award_type = ?,
      duration_years = ?

    WHERE programme_id = ?
    `,
    [programme_name, programme_code, award_type, duration_years, id],
  );

  return result.affectedRows;
}

// ===================================
// Delete Programme
// ===================================
export async function deleteProgrammeRepository(id) {
  const [result] = await db.execute(
    `
    DELETE FROM programmes
    WHERE programme_id = ?
    `,
    [id],
  );

  return result.affectedRows;
}
