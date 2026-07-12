import db from '../../config/database.js';

// ===================================
// Create Level
// ===================================
export async function createLevelRepository(data) {
  const {
    institution_id,
    programme_id,
    level_name,
    level_code,
    level_order,
    description,
  } = data;

  const [result] = await db.execute(
    `
    INSERT INTO levels
    (
      institution_id,
      programme_id,
      level_name,
      level_code,
      level_order,
      description
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      institution_id,
      programme_id,
      level_name,
      level_code,
      level_order,
      description,
    ],
  );

  return result.insertId;
}

// ===================================
// Find Level By Code
// ===================================
export async function findLevelByCodeRepository(programme_id, level_code) {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM levels
    WHERE programme_id = ?
      AND level_code = ?
    `,
    [programme_id, level_code],
  );

  return rows[0];
}

// ===================================
// Find Level By Name
// ===================================
export async function findLevelByNameRepository(programme_id, level_name) {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM levels
    WHERE programme_id = ?
      AND level_name = ?
    `,
    [programme_id, level_name],
  );

  return rows[0];
}

// ===================================
// Get All Levels
// ===================================
export async function getAllLevelsRepository() {
  const [rows] = await db.execute(
    `
    SELECT
      l.level_id,
      l.level_name,
      l.level_code,
      l.level_order,
      l.description,
      l.is_active,
      l.created_at,

      i.institution_id,
      i.institution_name,
      i.short_name,

      p.programme_id,
      p.programme_name,
      p.programme_code,
      p.award_type,

      d.department_id,
      d.department_name,

      f.faculty_id,
      f.faculty_name

    FROM levels l

    INNER JOIN institutions i
      ON l.institution_id = i.institution_id

    INNER JOIN programmes p
      ON l.programme_id = p.programme_id

    INNER JOIN departments d
      ON p.department_id = d.department_id

    INNER JOIN faculties f
      ON d.faculty_id = f.faculty_id

    ORDER BY
      i.institution_name,
      f.faculty_name,
      d.department_name,
      p.programme_name,
      l.level_order
    `,
  );

  return rows;
}

// ===================================
// Get Level By ID
// ===================================
export async function getLevelByIdRepository(id) {
  const [rows] = await db.execute(
    `
    SELECT
      l.level_id,
      l.level_name,
      l.level_code,
      l.level_order,
      l.description,
      l.is_active,
      l.created_at,
      l.updated_at,

      i.institution_id,
      i.institution_name,
      i.short_name,

      p.programme_id,
      p.programme_name,
      p.programme_code,
      p.award_type,

      d.department_id,
      d.department_name,

      f.faculty_id,
      f.faculty_name

    FROM levels l

    INNER JOIN institutions i
      ON l.institution_id = i.institution_id

    INNER JOIN programmes p
      ON l.programme_id = p.programme_id

    INNER JOIN departments d
      ON p.department_id = d.department_id

    INNER JOIN faculties f
      ON d.faculty_id = f.faculty_id

    WHERE l.level_id = ?
    `,
    [id],
  );

  return rows[0];
}

// ===================================
// Update Level
// ===================================
export async function updateLevelRepository(id, data) {
  const { level_name, level_code, level_order, description } = data;

  const [result] = await db.execute(
    `
    UPDATE levels
    SET
      level_name = ?,
      level_code = ?,
      level_order = ?,
      description = ?
    WHERE level_id = ?
    `,
    [level_name, level_code, level_order, description, id],
  );

  return result.affectedRows;
}

// ===================================
// Delete Level
// ===================================
export async function deleteLevelRepository(id) {
  const [result] = await db.execute(
    `
    DELETE FROM levels
    WHERE level_id = ?
    `,
    [id],
  );

  return result.affectedRows;
}
