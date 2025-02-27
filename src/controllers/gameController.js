const gamesRes = require("../repositories/gameRes");
const utils = require("../utils/checkFields");
const { deleteImage } = require("../middlewares/deleteImage");

const maxSizeImage = 1 * 1024 * 1024;

const getAllGames = async (req, res) => {
  let nameSuc = req.flash("nameSuc"), typeClass = req.flash("typeClass");
  typeClass = (typeClass === undefined || typeClass.length === 0) ? undefined : typeClass;
  nameSuc = (nameSuc === undefined || nameSuc.length === 0) ? undefined : nameSuc;

  try {
    const games = await gamesRes.allGames();

    return res.status(200).render("games/gamesList", { games, vkNotification: { message: nameSuc, typeClass } });

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
    newGameValue: inpValues,
    maxSize: (maxSizeImage / (1024 * 1024)).toFixed(1)
  });
}

const newGame = async (req, res) => {
  const newAddGame = req.body;
  newAddGame.stock = newAddGame.stock !== "" ? parseInt(newAddGame.stock) : newAddGame.stock === "" ? "" : 0;
  newAddGame.avaliable = newAddGame.avaliable === "on" ? 1 : 0;
  newAddGame.url_cover = req.file ? req.file.filename : null;

  let errors, nameSuc, typeClass;

  if (!req.file.mimetype.includes("image")) {
    typeClass = "error";
    req.flash("errors", "Tipo de arquivo não permitido.");
    req.flash("typeClass", typeClass);

    req.flash("inpValues", [newAddGame]);

    deleteImage(newAddGame.url_cover);

    return res.redirect("/vkgames/games/new");
  }

  if (req.file.size > maxSizeImage) {
    typeClass = "error";
    req.flash("errors", `Tamanho da imagem maior que o permitido. Máx: ${(maxSizeImage / (1024 * 1024)).toFixed(1)}MB` );
    req.flash("typeClass", typeClass);

    req.flash("inpValues", [newAddGame]);

    deleteImage(newAddGame.url_cover);

    return res.redirect("/vkgames/games/new");
  }

  errors = utils.checkFieldsGame(newAddGame);

  if (errors.length > 0) {
    typeClass = "error";
    req.flash("errors", [...errors]);
    req.flash("typeClass", typeClass);

    req.flash("inpValues", [newAddGame]);

    deleteImage(newAddGame.url_cover);

    return res.redirect("/vkgames/games/new");
  }

  try {
    await gamesRes.createGame(newAddGame);

    nameSuc = "Jogo Cadastrado com sucesso.";
    typeClass = "sucess";

    req.flash("nameSuc", nameSuc);
    req.flash("typeClass", typeClass);

    return res.redirect("/vkgames/games/new");

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error: " + err });
  }
}

const delGame = async (req, res) => {
  const { id, url_cover } = req.body;

  if (!id) return res.status(401).redirect("/vkgames/games");

  try {
    await gamesRes.deleteGame(id, url_cover);

    nameSuc = "Jogo Deletado com sucesso.";
    typeClass = "sucess";

    req.flash("nameSuc", nameSuc);
    req.flash("typeClass", typeClass);

    deleteImage(url_cover);

    return res.redirect("/vkgames/games");

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error: " + err });
  }
}

const gEditGame = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id) || !id) return res.status(400).redirect("/vkgames/games");

  try {
    const gameEdit = await gamesRes.gameById(id);

    if (gameEdit.length === 0) return res.status(400).redirect("/vkgames/games");

    let errors = req.flash("errors"), nameSuc = req.flash("nameSuc"), typeClass = req.flash("typeClass");
    let inpValues = req.flash("inpValues");

    errors = (errors === undefined || errors.length === 0) ? undefined : errors;
    typeClass = (typeClass === undefined || typeClass.length === 0) ? undefined : typeClass;
    nameSuc = (nameSuc === undefined || nameSuc.length === 0) ? undefined : nameSuc;

    inpValues = (inpValues === undefined || inpValues.length === 0) ? {} : inpValues[0];

    return res.status(200).render("games/gamesEdit", {
      vkNotification: { message: errors || nameSuc, typeClass },
      gameEdit: gameEdit[0]
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error: ", err });
  }
}

const editGame = async (req, res) => {
  const editAddGame = req.body;
  editAddGame.stock = editAddGame.stock !== "" ? parseInt(editAddGame.stock) : editAddGame.stock === "" ? "" : 0;
  editAddGame.avaliable = editAddGame.avaliable === "on" ? 1 : 0;

  let errors, nameSuc, typeClass;

  errors = utils.checkFieldsGame(editAddGame, "update");

  if (errors.length > 0) {
    typeClass = "error";
    req.flash("errors", [...errors]);
    req.flash("typeClass", typeClass);

    req.flash("inpValues", [editAddGame]);

    return res.redirect("/vkgames/games/edit/" + editAddGame.id);
  }

  try {
    const defaultGame = await gamesRes.gameById(editAddGame.id);

    editAddGame.url_cover = req.file ? req.file.filename : defaultGame[0].url_cover;

    if (defaultGame[0].url_cover !== editAddGame.url_cover)
      deleteImage(defaultGame[0].url_cover);

    const id = editAddGame.id;
    delete editAddGame.id;

    await gamesRes.updateGame(editAddGame, id);

    nameSuc = "Jogo Atualizado com sucesso.";
    typeClass = "sucess";

    req.flash("nameSuc", nameSuc);
    req.flash("typeClass", typeClass);

    return res.redirect("/vkgames/games/edit/" + id);

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error: " + err });
  }
}

module.exports = {
  getAllGames,
  newGame, gNewGame,
  editGame, gEditGame,
  delGame,
}
