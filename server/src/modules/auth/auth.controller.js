import { registerService, loginService } from './auth.service.js';

// ===================================
// Register
// ===================================
export async function register(req, res) {
  try {
    const userId = await registerService(req.body);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user_id: userId,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Login
// ===================================
export async function login(req, res) {
  try {
    console.log('REQUEST BODY:', req.body);

    const { email, password } = req.body;

    const result = await loginService(email, password);

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
