const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminController");
const auth = require("../middlewares/auth");

router.get("/painel", auth, adminControllers.painelAdm);
router.post("/admin/recovery", adminControllers.recoveryAcc);
router.post("/admin/login", adminControllers.loginPainel);
router.get("/logout", adminControllers.logoutPainel);
router.get("/recovery", adminControllers.gRecovery);
router.post("/recovery", adminControllers.recovery);

module.exports = router;
