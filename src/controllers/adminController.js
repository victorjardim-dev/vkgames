const usersRes = require("../repositories/userRes");

const recoveryAcc = async (req, res) => {
  const { email } = req.body;

  if (email === undefined || email === "") return res.status(400).json({
    msgError: "Insira um e-mail."
  });
  
  const currentEmail = await usersRes.userByEmail(email);

  if (currentEmail.length === 0) return res.status(404).json({
    msgError: "E-mail não cadastrado em nosso sistema."
  });

  console.log(currentEmail);

  return res.status(200).json({
    msgSucess: "Dados de acesso enviados para o seu e-mail."
  });
}

module.exports = {
  recoveryAcc,
}
