const auth = async (req, res, next) => {
  const userLogged = req.session.userLogged ? req.session.userLogged : undefined;

  // if (!userLogged) {
  //   req.flash("errors", "Seção expirada.");
  //   req.flash("typeClass", "error");
  //   return res.status(403).redirect("/");
  // }

  // if (userLogged.role < 1) {
  //   req.flash("errors", "Não autorizado.");
  //   req.flash("typeClass", "error");
  //   return res.status(403).redirect("/");
  // }

  next();
}

module.exports = auth;
