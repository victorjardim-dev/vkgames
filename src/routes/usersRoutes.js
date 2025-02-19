const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.get("/users", auth, userControllers.getAllUsers);

module.exports = router;
