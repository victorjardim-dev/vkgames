const express = require("express");
const router = express.Router();
const gamesControllers = require("../controllers/gameController");
const createImage = require("../middlewares/createImage");
const auth = require("../middlewares/auth");

router.post("/games/new", auth, createImage.single("url_cover"), gamesControllers.newGame);
router.get("/games/new", auth, gamesControllers.gNewGame);
router.post("/games/edit", auth, createImage.single("url_cover"), gamesControllers.editGame);
router.get("/games/edit/:id", auth, gamesControllers.gEditGame);
router.get("/games", auth, gamesControllers.getAllGames);
router.post("/games/delete", auth, gamesControllers.delGame);

module.exports = router;
