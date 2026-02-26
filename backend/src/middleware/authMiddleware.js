const jwt = require('jsonwebtoken');

const protect = (roles = []) => (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401);
    throw new Error('Missing authorization token');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (roles.length && !roles.includes(decoded.role)) {
      res.status(403);
      throw new Error('Access denied for this role');
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error('Invalid or expired token');
  }
};

module.exports = { protect };
