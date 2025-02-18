const { db_exec } = require("../connection/database");

const allGames = async () => {
  const query = "SELECT * FROM games;";
  return db_exec(query, "Não foi possível executar a consulta.");
}

const createGame = async (game) => {
  const query = "INSERT INTO games SET ?;";
  return db_exec(query, "Não foi possível cadastrar o jogo.", game);
}

const deleteGame = async (id, img) => {
  const query = "DELETE FROM games WHERE id = ?;";
  return db_exec(query, "Não foi possível cadastrar o jogo.", id, img);
}

module.exports = {
  allGames,
  createGame,
  deleteGame,
}
