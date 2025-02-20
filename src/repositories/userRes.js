const { db_exec } = require("../connection/database");

const allUsers = async () => {
  const query = "SELECT * FROM users;";
  return db_exec(query, "Não foi possível executar a consulta.");
}

const updateUser = async (updatedUser, id) => {
  const query = "UPDATE users SET ? WHERE id = ?;";
  return db_exec(query, "Não foi possível executar a consulta.", [updatedUser, id]);
}

const createUser = async (newuser) => {
  const query = "INSERT INTO users SET ?;";
  return db_exec(query, "Não foi possível executar a consulta.", newuser);
}

const deleteUser = async (id) => {
  const query = "DELETE FROM users WHERE id = ?;";
  return db_exec(query, "Não foi possível executar a consulta.", id);
}

const userById = async (id) => {
  const query = "SELECT * FROM users WHERE id = ?;";
  return db_exec(query, "Não foi possível executar a consulta.", id);
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
  updateUser,
  createUser,
  deleteUser,
  userById,
  userByEmail,
  updateUserPass,
  userByUsername,
}
