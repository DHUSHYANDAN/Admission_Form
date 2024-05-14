const jwt = require('jsonwebtoken');
const regUsers = require('../model/reguser');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.send('<script> window.location.href = "/login";alert("login to get the Admission form");</script>');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.send('<script> window.location.href = "/login";alert("login to get the Admission form");</script>');
  }
};
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await regUsers.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { requireAuth, checkUser };

