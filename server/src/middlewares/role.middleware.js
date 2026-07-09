export function authorize(...allowedRoles) {
  return (req, res, next) => {
    console.log('=================================');
    console.log('Allowed Roles:', allowedRoles);
    console.log('User Object:', req.user);
    console.log('User Role ID:', req.user.role_id);
    console.log('Role ID Type:', typeof req.user.role_id);
    console.log('=================================');

    if (!allowedRoles.includes(req.user.role_id)) {
      return res.status(403).json({
        message: 'Forbidden. You do not have permission.',
      });
    }

    next();
  };
}
