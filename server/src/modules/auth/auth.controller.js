import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
  createUser,
  findUserByEmail,
  findUserWithRole,
} from './auth.service.js';
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
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await findUserWithRole(email);

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        institution_id: user.institution_id,
        role_id: user.role_id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    return res.json({
      message: 'Login successful',

      token,

      user: {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role_name,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
}
