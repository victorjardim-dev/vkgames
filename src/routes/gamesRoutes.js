const express = require("express");
const router = express.Router();
const gamesControllers = require("../controllers/gameController");

router.post("/games/new", gamesControllers.newGame);
router.get("/games/new", gamesControllers.gNewGame);
router.get("/games", gamesControllers.getAllGames);

module.exports = router;
