const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminController");

router.post("/admin/recovery", adminControllers.recoveryAcc);

module.exports = router;
