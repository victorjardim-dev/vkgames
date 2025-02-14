const express = require("express");
const router = express.Router();
const gamesControllers = require("../controllers/gameController");

router.get("/", gamesControllers.getAllGames);

module.exports = router;
