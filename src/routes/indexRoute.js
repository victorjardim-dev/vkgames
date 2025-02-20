const express = require("express");
const router = express.Router();

router.use("/", (req, res) => {
  const userLogged = req.session.userLogged ? req.session.userLogged : undefined;

  if (userLogged && userLogged.role > 0) {
    return res.redirect("/painel");
  }

  let errors = req.flash("errors"), typeClass = req.flash("typeClass");

  errors = (errors === undefined || errors.length === 0) ? undefined : errors;
  typeClass = (typeClass === undefined || typeClass.length === 0) ? undefined : typeClass;

  return res.render("login", { vkNotification: { message: errors, typeClass } });
});

module.exports = router;
