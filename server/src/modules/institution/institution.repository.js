import db from '../../config/database.js';

// ===============================
// Create Institution
// ===============================
export async function createInstitution(data) {
  const {
    institution_name,
    short_name,
    institution_code,
    institution_type,
    email = null,
    phone = null,
    website = null,
    logo = null,
    address = null,
    city = null,
    state = null,
    country = 'Nigeria',
  } = data;

  const [result] = await db.execute(
    `
    INSERT INTO institutions
    (
      institution_name,
      short_name,
      institution_code,
      institution_type,
      email,
      phone,
      website,
      logo,
      address,
      city,
      state,
      country
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      institution_name,
      short_name,
      institution_code,
      institution_type,
      email,
      phone,
      website,
      logo,
      address,
      city,
      state,
      country,
    ],
  );

  return result.insertId;
}

// ===============================
// Find Institution By Code
// ===============================
export async function findInstitutionByCode(code) {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM institutions
    WHERE institution_code = ?
    `,
    [code],
  );

  return rows[0];
}

// ===============================
// Get All Institutions
// ===============================
export async function getAllInstitutions() {
  const [rows] = await db.execute(`
    SELECT
      institution_id,
      institution_name,
      short_name,
      institution_code,
      institution_type,
      email,
      phone,
      website,
      city,
      state,
      country,
      is_active,
      created_at
    FROM institutions
    ORDER BY institution_name ASC
  `);

  return rows;
}
// ===============================
// Get Institution By ID
// ===============================
export async function getInstitutionById(id) {
  const [rows] = await db.execute(
    `
    SELECT
      institution_id,
      institution_name,
      short_name,
      institution_code,
      institution_type,
      email,
      phone,
      website,
      logo,
      address,
      city,
      state,
      country,
      is_active,
      created_at,
      updated_at
    FROM institutions
    WHERE institution_id = ?
    `,
    [id],
  );

  return rows[0];
}
// ===============================
// Update Institution
// ===============================
export async function updateInstitution(id, data) {
  const {
    institution_name,
    short_name,
    institution_code,
    institution_type,
    email = null,
    phone = null,
    website = null,
    logo = null,
    address = null,
    city = null,
    state = null,
    country = 'Nigeria',
  } = data;

  const [result] = await db.execute(
    `
    UPDATE institutions
    SET
      institution_name = ?,
      short_name = ?,
      institution_code = ?,
      institution_type = ?,
      email = ?,
      phone = ?,
      website = ?,
      logo = ?,
      address = ?,
      city = ?,
      state = ?,
      country = ?
    WHERE institution_id = ?
    `,
    [
      institution_name,
      short_name,
      institution_code,
      institution_type,
      email,
      phone,
      website,
      logo,
      address,
      city,
      state,
      country,
      id,
    ],
  );

  return result.affectedRows;
}
