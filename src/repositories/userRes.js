const { db_exec } = require("../connection/database");

const allUsers = async () => {
  const query = "SELECT * FROM users;";
  return db_exec(query, "Não foi possível executar a consulta.");
}

module.exports = {
  allUsers,
}
