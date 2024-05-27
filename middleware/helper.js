require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  authenticationMiddleware: (req, res, next) => {
    try {
      const token = req.cookies.token
      if (token == null) return res.redirect('/'); // Unauthorized if no token

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.redirect('/'); // Forbidden if token is invalid
        req.user = user;
        next();
      });

    } catch (error) {
      console.log(error);
      res.sendStatus(500); // Internal Server Error for unexpected issues
    }
  },
};
