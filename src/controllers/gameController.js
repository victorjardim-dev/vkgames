const gamesRes = require("../repositories/gameRes");
const utils = require("../utils/checkFields");
const { deleteImage } = require("../middlewares/deleteImage");

const getAllGames = async (req, res) => {
  try {
    const games = await gamesRes.allGames();

    return res.status(200).render("games/gamesList", { games });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error: " + err });
  }
}

const gNewGame = async (req, res) => {
  let errors = req.flash("errors"), nameSuc = req.flash("nameSuc"), typeClass = req.flash("typeClass");
  let inpValues = req.flash("inpValues");
  
  errors = (errors === undefined || errors.length === 0) ? undefined : errors;
  typeClass = (typeClass === undefined || typeClass.length === 0) ? undefined : typeClass;
  nameSuc = (nameSuc === undefined || nameSuc.length === 0) ? undefined : nameSuc;

  inpValues = (inpValues === undefined || inpValues.length === 0) ? {} : inpValues[0];

  return res.status(200).render("games/gamesNew", {
    vkNotification: { message: errors || nameSuc, typeClass },
    newGameValue: inpValues
  });
}

const newGame = async (req, res) => {
  const newAddGame = req.body;
  newAddGame.stock = newAddGame.stock !== "" ? parseInt(newAddGame.stock) : newAddGame.stock === "" ? "" : 0;
  newAddGame.avaliable = newAddGame.avaliable === "on" ? 1 : 0;
  newAddGame.url_cover = req.file ? req.file.filename : null;

  let errors, nameSuc, typeClass;

  errors = utils.checkFieldsGame(newAddGame);
  
  if (errors.length > 0) {
    typeClass = "error";
    req.flash("errors", [...errors]);
    req.flash("typeClass", typeClass);

    req.flash("inpValues", [newAddGame]);

    deleteImage(newAddGame.url_cover);
    
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

const delGame = async (req, res) => {
  const { id, url_cover } = req.body;

  if (!id) return res.status(401).redirect("/games");
  
  try {
    await gamesRes.deleteGame(id, url_cover);
    
    deleteImage(url_cover);

    return res.redirect("/games");

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error: " + err });
  }
}

module.exports = {
  getAllGames,
  newGame, gNewGame,
  delGame,
}
