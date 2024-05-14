const jwt = require('jsonwebtoken');

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

module.exports = { requireAuth };