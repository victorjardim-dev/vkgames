const { db_exec } = require("../connection/database");

const allGames = async () => {
  const query = "SELECT * FROM games;";
  return db_exec(query, "Não foi possível executar a consulta.");
}

module.exports = {
  allGames,
}
