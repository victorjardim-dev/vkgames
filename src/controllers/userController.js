const usersRes = require("../repositories/userRes");

const getAllUsers = async (req, res) => {
  try {
    const users = await usersRes.allUsers();

    return res.status(200).render("users/usersList", {users});

  } catch(err) {
    console.log(err);
    return res.status(500).json({msg: "Error: " + err});
  }
}

module.exports = {
  getAllUsers,
}
