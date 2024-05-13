const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.send('<script>alert("login to get the Admission form"); window.location.href = "/login";</script>');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.send('<script>alert("login to get the Admission form"); window.location.href = "/login";</script>');
   
  }
};

module.exports = { requireAuth };