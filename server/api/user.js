const express = require("express");
const passport = require('../auth/passport');
const User = require("../models/user")
const userFunctions = require("./functions/user");
const router = express.Router();

router.get(
  "/account",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {
    const token= req.headers.authorization
    res.send(await userFunctions.getUserByIdFromToken(token))
  }
);

module.exports = router;
