require("dotenv").config();
const app = require("./src/app");
const db = require("./src/connection/database");

const APP_PORT = 3000;

app.listen(APP_PORT, () => {
  try {
    db.conn.connect();
    console.log("Conexão com o banco de dados realizada com sucesso.");
    console.log(`Servidor rodando em http://localhost:${APP_PORT}`);
    
  } catch(err) {
    console.log("Não foi possível conectar ao banco de dados: ", err);
  }
});
