const express = require("express");
const router = express.Router();
const gamesControllers = require("../controllers/gameController");
const createImage = require("../middlewares/createImage");

router.post("/games/new", createImage.single("url_cover"), gamesControllers.newGame);
router.get("/games/new", gamesControllers.gNewGame);
router.get("/games", gamesControllers.getAllGames);
router.post("/games/delete", gamesControllers.delGame);

module.exports = router;
