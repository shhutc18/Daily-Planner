// Passport authentication
// Middleware to check if the user is authenticated
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

module.exports = checkAuthenticated;