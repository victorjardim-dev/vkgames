const gamesRes = require("../repositories/gameRes");

const getAllGames = async (req, res) => {
  try {
    const games = await gamesRes.allGames();

    return res.status(200).render("games/games_list", {games});

  } catch(err) {
    console.log(err);
    return res.status(500).json({msg: "Error: " + err});
  }
}

module.exports = {
  getAllGames,
}
