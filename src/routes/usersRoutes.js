const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.post("/users/new", auth, userControllers.newUser);
router.get("/users/new", auth, userControllers.gnewUser);
router.get("/users", auth, userControllers.getAllUsers);
router.post("/users/delete", auth, userControllers.delUser);
router.get("/users/edit/:id", auth, userControllers.gEditUser);
router.post("/users/edit", auth, userControllers.editUser);

module.exports = router;
