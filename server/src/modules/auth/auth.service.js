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
