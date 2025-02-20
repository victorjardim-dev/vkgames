const bcrypt = require("bcryptjs");

const checkHashedPass = (password, actualPassword) => bcrypt.compareSync(password, actualPassword);

const createHashedPass = (password, salt = 10) => bcrypt.hashSync(password, salt);

module.exports = {
  createHashedPass, checkHashedPass
};
