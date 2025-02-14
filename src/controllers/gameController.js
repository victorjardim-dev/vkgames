const gamesRes = require("../repositories/gameRes");
const utils = require("../utils/checkFields");

const getAllGames = async (req, res) => {
  try {
    const games = await gamesRes.allGames();

    return res.status(200).render("games/games_list", { games });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error: " + err });
  }
}

const gNewGame = async (req, res) => {
  let errors = req.flash("errors"), nameSuc = req.flash("nameSuc"), typeClass = req.flash("typeClass");
  
  errors = (errors === undefined || errors.length === 0) ? undefined : errors;
  typeClass = (typeClass === undefined || typeClass.length === 0) ? undefined : typeClass;
  nameSuc = (nameSuc === undefined || nameSuc.length === 0) ? undefined : nameSuc;

  return res.status(200).render("games/games_new", {
    vkNotification: { message: errors || nameSuc, typeClass },
  });
}

const newGame = async (req, res) => {
  const newAddGame = req.body;
  let errors, nameSuc, typeClass;

  errors = utils.checkFieldsGame(newAddGame);
  
  if (errors.length > 0) {
    typeClass = "error";
    req.flash("errors", [...errors]);
    req.flash("typeClass", typeClass);
    
    return res.redirect("/games/new");
  }
  
  try {
    await gamesRes.createGame(newAddGame);

    nameSuc = "Jogo Cadastrado com sucesso.";
    typeClass = "sucess";

    req.flash("nameSuc", nameSuc);
    req.flash("typeClass", typeClass);

    return res.redirect("/games/new");

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error: " + err });
  }
}

module.exports = {
  getAllGames,
  newGame, gNewGame,
}
