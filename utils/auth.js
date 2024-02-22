function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      // user is not authenticated, redirect to login page or send an error response
      res.status(401).json({ message: 'You are not authenticated' });
    }
  }

module.exports = ensureAuthenticated;