// auth.middleware.js
module.exports = function authMiddleware(req, res, next) {
  console.log("Session Data:", req.session); 
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Access denied' });
  }
  console.log("Authentication successful");
  next();
};