const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/auth_test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("Bravo coaie");
  }
);

module.exports = router;
