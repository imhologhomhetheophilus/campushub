import db from '../../config/database.js';

// Find user by email
export async function findUserByEmail(email) {
  const [rows] = await db.execute(
    `
        SELECT *
        FROM users
        WHERE email = ?
        `,
    [email],
  );

  return rows[0];
}
export async function findUserWithRole(email) {
  const [rows] = await db.execute(
    `
        SELECT
            u.user_id,
            u.institution_id,
            u.role_id,
            r.role_name,
            u.first_name,
            u.middle_name,
            u.last_name,
            u.email,
            u.phone,
            u.password_hash,
            u.gender,
            u.profile_image,
            u.is_active,
            u.email_verified
        FROM users u
        INNER JOIN roles r
            ON u.role_id = r.role_id
        WHERE u.email = ?
        `,
    [email],
  );

  return rows[0];
}

// Create new user
export async function createUser(userData) {
  const {
    institution_id,
    role_id,
    first_name,
    middle_name,
    last_name,
    email,
    phone,
    password_hash,
    gender,
  } = userData;

  const [result] = await db.execute(
    `
        INSERT INTO users
        (
            institution_id,
            role_id,
            first_name,
            middle_name,
            last_name,
            email,
            phone,
            password_hash,
            gender
        )

        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,

    [
      institution_id,
      role_id,
      first_name,
      middle_name,
      last_name,
      email,
      phone,
      password_hash,
      gender,
    ],
  );

  return result.insertId;
}
