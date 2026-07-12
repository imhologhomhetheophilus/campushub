import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
  findUserByEmail,
  findUserWithRole,
  createUser,
} from './auth.repository.js';

// ===================================
// Register User
// ===================================
export async function registerService(data) {
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
  } = data;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error('Email already exists.');
  }

  const password_hash = await bcrypt.hash(password, 10);

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

  return userId;
}

// ===================================
// Login User
// ===================================
export async function loginService(email, password) {
  if (!email) {
    throw new Error('Email is required.');
  }

  if (!password) {
    throw new Error('Password is required.');
  }

  const user = await findUserWithRole(email);

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  if (!user.is_active) {
    throw new Error('Account has been disabled.');
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatch) {
    throw new Error('Invalid email or password.');
  }

  const token = jwt.sign(
    {
      user_id: user.user_id,
      institution_id: user.institution_id,
      role_id: user.role_id,
      role: user.role_name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
  );

  delete user.password_hash;

  return {
    token,
    user,
  };
}
