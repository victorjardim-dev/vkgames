const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminController");

router.get("/recovery", adminControllers.gRecovery);
router.post("/recovery", adminControllers.recovery);
router.post("/admin/recovery", adminControllers.recoveryAcc);

module.exports = router;
