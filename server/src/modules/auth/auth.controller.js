import bcrypt from 'bcrypt';

import { findUserByEmail, createUser } from './auth.service.js';

export async function register(req, res) {
  try {
    const {
      institution_id,
      role_id,
      first_name,
      middle_name,
      last_name,
      email,
      phone,
      password,
      gender,
    } = req.body;

    // Check existing email

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: 'Email already exists',
      });
    }

    // Encrypt password

    const password_hash = await bcrypt.hash(password, 12);

    // Save user

    const userId = await createUser({
      institution_id,
      role_id,
      first_name,
      middle_name,
      last_name,
      email,
      phone,
      password_hash,
      gender,
    });

    return res.status(201).json({
      message: 'User registered successfully',

      user: {
        user_id: userId,

        first_name,

        last_name,

        email,
      },
    });
  } catch (error) {
    console.log('REGISTER ERROR:', error);

    return res.status(500).json({
      message: error.message,
    });
  }
}
