const express = require("express");
const router = express.Router();

router.use("/", (req, res) => {
  return res.render("index");
});

module.exports = router;
