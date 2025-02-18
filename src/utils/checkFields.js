const checkFieldsGame = (game) => {
  const errors = [];

  if (game.name === undefined || game.name === "")
    errors.push("O nome do jogo é obrigatório.");

  if(game.price === undefined || game.price === "")
    errors.push("O preço do jogo é obrigatório.");

  if(isNaN(game.price))
    errors.push("Insira um preço válido.");
  
  if(+game.price < 0 || +game.stock < 0)
    errors.push("Preço ou estoque não podem ser um valor negativo.");
  
  if(+game.stock > MAX_STOCK_PER_GAME)
    errors.push("Limite de estoque por unidade atingido. Máximo: " + MAX_STOCK_PER_GAME);

  if(game.url_cover === undefined || game.url_cover === "" || !game.url_cover)
    errors.push("Imagem do jogo requerida.");

  return errors;
}

module.exports = {
  checkFieldsGame,
}
