const { db_exec } = require("../connection/database");

const allUsers = async () => {
  const query = "SELECT * FROM users;";
  return db_exec(query, "Não foi possível executar a consulta.");
}

const userByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?;";
  return db_exec(query, "Não foi possível executar a consulta.", email);
}

module.exports = {
  allUsers,
  userByEmail,
}
