const jwt = require('jsonwebtoken');
const adUsers = require('../model/aduser');

const requireAdAuth = (req, res, next) => {
  const token2 = req.cookies.admission_token;  

  // Check if the admission token exists & is verified
  if (token2) {
    jwt.verify(token2, process.env.ACCESS_TOKEN2, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/admission');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/admission');
  }
};

const checkUser2 = (req, res, next) => {
  const token2 = req.cookies.admission_token; 
  if (token2) {
    jwt.verify(token2, process.env.ACCESS_TOKEN2, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let aduser = await adUsers.findById(decodedToken.id);
        res.locals.user = aduser;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAdAuth ,checkUser2};
