import db from '../../config/database.js';
// ===================================
// Create Department
// ===================================
export async function createDepartmentRepository(data) {
  const {
    institution_id,
    faculty_id,
    department_name,
    department_code,
    description,
  } = data;

  const [result] = await db.execute(
    `
    INSERT INTO departments
    (
      institution_id,
      faculty_id,
      department_name,
      department_code,
      description
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      institution_id,
      faculty_id,
      department_name,
      department_code,
      description ?? null,
    ],
  );

  return result.insertId;
}

// ===================================
// Find Department By Code
// ===================================
export async function findDepartmentByCodeRepository(
  institution_id,
  faculty_id,
  department_code,
) {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM departments
    WHERE institution_id = ?
      AND faculty_id = ?
      AND department_code = ?
    `,
    [institution_id, faculty_id, department_code],
  );

  return rows[0];
}

// ===================================
// Find Department By Name
// ===================================
export async function findDepartmentByNameRepository(
  institution_id,
  faculty_id,
  department_name,
) {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM departments
    WHERE institution_id = ?
      AND faculty_id = ?
      AND department_name = ?
    `,
    [institution_id, faculty_id, department_name],
  );

  return rows[0];
}
// ===================================
// Get All Departments
// ===================================
export async function getAllDepartmentsRepository() {
  const [rows] = await db.execute(`
    SELECT
      department_id,
      institution_id,
      faculty_id,
      department_name,
      department_code,
      description,
      is_active,
      created_at
    FROM departments
    ORDER BY department_name ASC
  `);

  return rows;
}
// ===================================
// Get Department By ID
// ===================================
export async function getDepartmentByIdRepository(id) {
  const [rows] = await db.execute(
    `
    SELECT
      department_id,
      institution_id,
      faculty_id,
      department_name,
      department_code,
      description,
      is_active,
      created_at,
      updated_at
    FROM departments
    WHERE department_id = ?
    `,
    [id],
  );

  return rows[0];
}
// ===================================
// Update Department
// ===================================
export async function updateDepartmentRepository(id, data) {
  const {
    institution_id,
    faculty_id,
    department_name,
    department_code,
    description = null,
  } = data;

  const [result] = await db.execute(
    `
    UPDATE departments
    SET
      institution_id = ?,
      faculty_id = ?,
      department_name = ?,
      department_code = ?,
      description = ?
    WHERE department_id = ?
    `,
    [
      institution_id,
      faculty_id,
      department_name,
      department_code,
      description,
      id,
    ],
  );

  return result.affectedRows;
}
// ===================================
// Delete Department
// ===================================
export async function deleteDepartmentRepository(id) {
  const [result] = await db.execute(
    `
    DELETE FROM departments
    WHERE department_id = ?
    `,
    [id],
  );

  return result.affectedRows;
}
