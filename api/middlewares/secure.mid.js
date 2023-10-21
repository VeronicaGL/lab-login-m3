module.exports.isAuthenticated = (req, res, next) => {
  if (req.user && req.user.email) {
    next();
  
    
  }
}