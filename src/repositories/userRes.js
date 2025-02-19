const { db_exec } = require("../connection/database");

const allUsers = async () => {
  const query = "SELECT * FROM users;";
  return db_exec(query, "Não foi possível executar a consulta.");
}

const userByUsername = async (user_name) => {
  const query = "SELECT * FROM users WHERE user_name = ?;";
  return db_exec(query, "Não foi possível executar a consulta.", user_name);
}

const userByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?;";
  return db_exec(query, "Não foi possível executar a consulta.", email);
}

const updateUserPass = async (newPass, id) => {
  const query = "UPDATE users SET user_pwd = ? WHERE id = ?;";
  return db_exec(query, "Não foi possível executar a consulta.", [newPass, id]);
}

module.exports = {
  allUsers,
  userByEmail,
  updateUserPass,
  userByUsername,
}
