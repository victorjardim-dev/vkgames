const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderController");
const auth = require("../middlewares/auth");

router.get("/pedidos", auth, orderControllers.getAllUsers);

module.exports = router;
