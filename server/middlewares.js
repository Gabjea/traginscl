const passport = require("./auth/passport");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const userFunctions = require("./api/functions/user");

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

function getToken(req) {
 
  return req.headers.authorization.split(" ")[1];
}

const Auth = async (req, res, next) => {
  const token = getToken(req);
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.send(err);
    else {
      passport.authenticate("jwt", { session: false });
      next();
    }
  });
};

const hasAdmin = async(req, res, next) => {
  const token = getToken(req);

  const user = await userFunctions.getUserByIdFromToken(token);

  if (user){
    if (user.role !== "admin")
      return res.status(401).send('Unauthorized')
    else next();

  }else return res.send("User not found!")
};

module.exports = {
  notFound,
  errorHandler,
  Auth,
  hasAdmin,
};
