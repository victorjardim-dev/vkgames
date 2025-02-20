const userRes = require("../repositories/userRes");

const checkFieldsGame = (game) => {
  const errors = [];

  if (game.name === undefined || game.name === "")
    errors.push("O nome do jogo é obrigatório.");

  if (game.price === undefined || game.price === "")
    errors.push("O preço do jogo é obrigatório.");

  if (isNaN(game.price))
    errors.push("Insira um preço válido.");

  if (+game.price < 0 || +game.stock < 0)
    errors.push("Preço ou estoque não podem ser um valor negativo.");

  if (+game.stock > MAX_STOCK_PER_GAME)
    errors.push("Limite de estoque por unidade atingido. Máximo: " + MAX_STOCK_PER_GAME);

  if (game.url_cover === undefined || game.url_cover === "" || !game.url_cover)
    errors.push("Imagem do jogo requerida.");

  return errors;
}

const checkFieldsUser = async (user, type = "insert") => {
  const errors = [];  

  if (user.name === undefined || user.name === "")
    errors.push("Preencha o nome do usuário.");

  if (user.email === undefined || user.email === "")
    errors.push("Preencha o e-mail do usuário.");

  if (user.user_name === undefined || user.user_name === "")
    errors.push("Nome de usuário obrigatório.");

  if (user.user_role === undefined || user.user_role === "")
    errors.push("Escolha um nível de acesso.");

  if ((user.email !== "" || user.user_name !== "") && type === "insert") {
    const existsUserEmail = await userRes.userByEmail(user.email);
    const existsUserName = await userRes.userByUsername(user.user_name);

    if (existsUserEmail.length > 0)
      errors.push("Já existe um e-mail cadastrado.");

    if (existsUserName.length > 0)
      errors.push("Já existe um usuário cadastrado.");
  }

  return errors;
}

module.exports = {
  checkFieldsGame,
  checkFieldsUser,
}
