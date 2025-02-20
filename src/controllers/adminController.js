const usersRes = require("../repositories/userRes");
const sendMailRecovery = require("../middlewares/sendMailRecovery");
const jwt = require("jsonwebtoken");
const APP_SECRET_KEY_JWT = process.env.APP_SECRET_KEY_JWT;
const bcrypt = require("bcryptjs");

const loginPainel = async (req, res) => {
  const userLogin = req.body;

  if (userLogin.user_name === "" || userLogin.user_pwd === "") {
    req.flash("errors", "Preencha os campos de acesso.");
    req.flash("typeClass", "error");
    return res.status(400).redirect("/");
  }

  try {
    const lUser = await usersRes.userByUsername(userLogin.user_name);

    if (lUser.length === 0) {
      req.flash("errors", "Usuário não encontrado.");
      req.flash("typeClass", "error");
      return res.status(404).redirect("/");
    }

    if (!bcrypt.compareSync(userLogin.user_pwd, lUser[0].user_pwd)) {
      req.flash("errors", "Usuário ou senha incorretos.");
      req.flash("typeClass", "error");
      return res.status(400).redirect("/");
    }

    req.session.userLogged = {
      name: lUser[0].name,
      username: lUser[0].user_name,
      role: lUser[0].user_role,
      email: lUser[0].email
    }

    return res.status(200).redirect("/painel");

  } catch (err) {
    console.log(err);
  }
}

const logoutPainel = async (req, res) => {
  delete req.session.userLogged;
  req.flash("errors", "Deslogado com sucesso.");
  req.flash("typeClass", "sucess");
  return res.status(200).redirect("/");
}

const painelAdm = async (req, res) => {
  return res.status(200).render("painel");
}

const recoveryAcc = async (req, res) => {
  const { email } = req.body;

  if (email === undefined || email === "") return res.status(400).json({
    msgError: "Insira um e-mail."
  });

  const currentUserEmail = await usersRes.userByEmail(email);

  if (currentUserEmail.length === 0) return res.status(404).json({
    msgError: "E-mail não cadastrado em nosso sistema."
  });

  const tokenRecovery = jwt.sign({ user_id: currentUserEmail[0].id, used: false }, APP_SECRET_KEY_JWT, { expiresIn: "5m" });

  await sendMailRecovery.transporter.sendMail({
    from: `"Suporte VKGames Store " <${process.env.SEND_EMAIL_USER}>`,
    to: email,
    subject: "Recuperação de Conta",
    text: `Clique no link para redefinir sua senha: #`,
    html: `
          <div style="width: calc(100% - 80px); border: 1px solid #dadada; height: 400px; padding: 20px;">
            <div style="margin: 0 0 40px 0;">
              <h1 style="margin: 0;">VKGames Store</h1>
              <h2 style="margin: 8px 0 0 0;">Recuperação de senha</h2>
            </div>
            <div>
              <p>Olá, ${currentUserEmail[0].name}!</p>
              <p>Clique no link para redefinir sua senha. <strong>O Link expirará em 5 minutos.</strong></p>
              <p style="margin: 20px 0 40px 0; line-height: 1.3">Utilize o código: <strong>${tokenRecovery}</strong>.</p>
              <a id="link-recovery" href="http://localhost:3000/recovery?token=${tokenRecovery}" target="_blank" style="text-decoration: none; font-size: 12px; line-height: 1; padding: 8px 20px; background-color: #343434;color: #fff">Redefinir Senha</a>
            </div>
          </div>
        `,
  });

  return res.status(200).json({
    msgSucess: "Dados de acesso enviados para o seu e-mail."
  });
}

const gRecovery = (req, res) => {
  const token = req.query.token;
  let errors = req.flash("errors"), nameSuc = req.flash("nameSuc"), typeClass = req.flash("typeClass");

  errors = (errors === undefined || errors.length === 0) ? undefined : errors;
  typeClass = (typeClass === undefined || typeClass.length === 0) ? undefined : typeClass;
  nameSuc = (nameSuc === undefined || nameSuc.length === 0) ? undefined : nameSuc;

  jwt.verify(token, APP_SECRET_KEY_JWT, (error, decoded) => {
    if (nameSuc) return res.status(200).render("sucessPage");

    if (error) return res.status(400).render("errorPage", { error: "Código inválido ou expirado." });

    return res.status(200).render("recoveryPage", { sToken: token, vkNotification: { message: errors || nameSuc, typeClass }, });
  });
}

const recovery = async (req, res) => {
  const token = req.body.code_token;
  const newPass = req.body.user_pwd;
  const newPassConfirm = req.body.user_pwd_confirm;

  let errors = [], nameSuc, typeClass;

  if (newPass === "" || newPassConfirm === "")
    errors.push("Senha e confirmação de senha não podem estar vazias.");

  if (newPass !== newPassConfirm)
    errors.push("As senhas não conferem.");

  if (errors.length > 0) {
    typeClass = "error";
    req.flash("errors", [...errors]);
    req.flash("typeClass", typeClass);

    return res.redirect("/recovery?token=" + token);
  }

  try {
    jwt.verify(token, APP_SECRET_KEY_JWT, async (error, decoded) => {
      if (error) return res.status(403).redirect("/recovery");

      const hashedPwd = bcrypt.hashSync(newPass, 10);

      await usersRes.updateUserPass(hashedPwd, decoded.user_id);

      decoded.used = true;

      nameSuc = true
      req.flash("nameSuc", nameSuc);

      return res.status(200).redirect("/recovery");
    });

  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  recoveryAcc,
  gRecovery, recovery,
  loginPainel, logoutPainel,
  painelAdm,
}
