const localizeUser = (req, res, next) => {
  res.locals.currentUser = req.user;
  next();
};

const errorHandler = (err, req, res, next) => {
  res.send(err);
};

const isAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.send("Access Denied: Please sign in to access this resource.");
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.isAuthenticated() || !req.user.admin) {
    return res.send('"Access Denied: Only admins can access this resource."');
  }
  next();
};

module.exports = { localizeUser, errorHandler, isAuth, isAdmin };
