const jwt = require('jsonwebtoken');

module.exports.authMiddleware=async( (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "CLIENT_SECRET_KEY");
    res.json({ user: { id: decoded.id, email: decoded.email, name: decoded.name } });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});
