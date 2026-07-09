import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    console.log('Authorization Header:', authHeader);

    if (!authHeader) {
      return res.status(401).json({
        message: 'Access denied. No token provided.',
      });
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;

    console.log('JWT Token:', token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Decoded Token:', decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.error('Authentication Error:', error);

    return res.status(401).json({
      message: 'Invalid or expired token.',
    });
  }
}
