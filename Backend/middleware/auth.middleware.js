const authMiddleware = (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Access denied ' });
    }
    console.log("routerlogin:authentication")
    next();
  };
  
  module.exports = authMiddleware;
  