export async function getProfile(req, res) {
  return res.json({
    message: 'Welcome to Student Dashboard',
    user: req.user,
  });
}
