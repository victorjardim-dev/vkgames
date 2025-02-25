const usersRes = require("../repositories/userRes");
const utils = require("../utils/checkFields");
const vkHashedPass = require("../utils/vkHashedPass");

const getAllUsers = async (req, res) => {
  let nameSuc = req.flash("nameSuc"), typeClass = req.flash("typeClass");
  typeClass = (typeClass === undefined || typeClass.length === 0) ? undefined : typeClass;
  nameSuc = (nameSuc === undefined || nameSuc.length === 0) ? undefined : nameSuc;

  try {
    const users = await usersRes.allUsers();

    return res.status(200).render("users/usersList", { users, vkNotification: { message: nameSuc, typeClass } });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error: " + err });
  }
}

const gnewUser = async (req, res) => {
  let errors = req.flash("errors"), nameSuc = req.flash("nameSuc"), typeClass = req.flash("typeClass");
  let inpValues = req.flash("inpValues");

  errors = (errors === undefined || errors.length === 0) ? undefined : errors;
  typeClass = (typeClass === undefined || typeClass.length === 0) ? undefined : typeClass;
  nameSuc = (nameSuc === undefined || nameSuc.length === 0) ? undefined : nameSuc;

  inpValues = (inpValues === undefined || inpValues.length === 0) ? {} : inpValues[0];

  return res.status(200).render("users/usersNew", {
    vkNotification: { message: errors || nameSuc, typeClass },
    newUserValue: inpValues
  });
}

const newUser = async (req, res) => {
  const newAddUser = req.body;
  newAddUser.user_role = newAddUser.user_role === "" ? undefined : newAddUser.user_role;
  newAddUser.user_pwd = newAddUser.user_pwd === "" ? undefined : newAddUser.user_pwd;

  let errors, nameSuc, typeClass;

  errors = await utils.checkFieldsUser(newAddUser);

  if (errors.length > 0) {
    typeClass = "error";
    req.flash("errors", [...errors]);
    req.flash("typeClass", typeClass);

    req.flash("inpValues", [newAddUser]);

    return res.redirect("/users/new");
  }

  try {
    const defaultPwd = "123456";

    if (newAddUser.user_pwd === undefined)
      newAddUser.user_pwd = defaultPwd;

    const hashedPwd = vkHashedPass.createHashedPass(newAddUser.user_pwd);
    newAddUser.user_pwd = hashedPwd;

    await usersRes.createUser(newAddUser);

    nameSuc = "Usuário Cadastrado com sucesso.";
    typeClass = "sucess";

    req.flash("nameSuc", nameSuc);
    req.flash("typeClass", typeClass);

    return res.redirect("/users/new");

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error: " + err });
  }
}

const delUser = async (req, res) => {
  const id = parseInt(req.body.id);

  if (!id) return res.status(401).redirect("/users");

  if (id === req.session.userLogged.userId) {
    nameSuc = "Você não pode deletar a si mesmo.";
    typeClass = "error";
    req.flash("nameSuc", nameSuc);
    req.flash("typeClass", typeClass);
    return res.redirect("/users");
  }

  try {
    await usersRes.deleteUser(id);

    nameSuc = "Usuário Deletado com sucesso.";
    typeClass = "sucess";

    req.flash("nameSuc", nameSuc);
    req.flash("typeClass", typeClass);

    return res.redirect("/users");

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error: " + err });
  }
}

const gEditUser = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id) || !id) return res.status(400).redirect("/users");

  try {
    const userEdit = await usersRes.userById(id);

    if (userEdit.length === 0) return res.status(400).redirect("/users");

    let errors = req.flash("errors"), nameSuc = req.flash("nameSuc"), typeClass = req.flash("typeClass");
    let inpValues = req.flash("inpValues");

    errors = (errors === undefined || errors.length === 0) ? undefined : errors;
    typeClass = (typeClass === undefined || typeClass.length === 0) ? undefined : typeClass;
    nameSuc = (nameSuc === undefined || nameSuc.length === 0) ? undefined : nameSuc;

    inpValues = (inpValues === undefined || inpValues.length === 0) ? {} : inpValues[0];

    return res.status(200).render("users/usersEdit", {
      vkNotification: { message: errors || nameSuc, typeClass },
      userEdit: userEdit[0]
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error: ", err });
  }
}

const editUser = async (req, res) => {
  const editAddUser = req.body;

  editAddUser.user_role = editAddUser.user_role === "" ? undefined : editAddUser.user_role;

  let errors, nameSuc, typeClass;

  errors = await utils.checkFieldsUser(editAddUser, "update");

  if (errors.length > 0) {
    typeClass = "error";
    req.flash("errors", [...errors]);
    req.flash("typeClass", typeClass);

    req.flash("inpValues", [editAddUser]);

    return res.redirect("/users/edit/" + editAddUser.id);
  }

  try {
    const defaultPwd = await usersRes.userById(editAddUser.id);
    editAddUser.user_pwd = editAddUser.user_pwd === "" ? defaultPwd[0].user_pwd : editAddUser.user_pwd;
    const id = editAddUser.id;
    delete editAddUser.id;
    
    const hashedPwd = vkHashedPass.createHashedPass(editAddUser.user_pwd);
    editAddUser.user_pwd = hashedPwd;

    await usersRes.updateUser(editAddUser, id);

    nameSuc = "Usuário Atualizado com sucesso.";
    typeClass = "sucess";

    req.flash("nameSuc", nameSuc);
    req.flash("typeClass", typeClass);

    return res.redirect("/users/edit/" + id);

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error: " + err });
  }
}

module.exports = {
  getAllUsers,
  newUser, gnewUser,
  delUser,
  editUser, gEditUser,
}
