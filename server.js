require("dotenv").config();
const app = require("./src/app");
const db = require("./src/connection/database");
const fs = require("fs");
const path = require("path");
const https = require("https");

// const keyPath = path.join("C:\\xampp\\apache\\server.key");
// const certPath = path.join("C:\\xampp\\apache\\server.crt");
// const options = {
//   key: fs.readFileSync(keyPath),
//   cert: fs.readFileSync(certPath),
// };

MAX_STOCK_PER_GAME = 200;

const APP_PORT = process.env.APP_PORT;

app.listen(APP_PORT, () => {
  try {
    db.conn.connect();
    console.log("Conexão com o banco de dados realizada com sucesso.");
    console.log(`Servidor rodando em http://localhost:${APP_PORT}`);
    
  } catch(err) {
    console.log("Não foi possível conectar ao banco de dados: ", err);
  }
});

// Server HTTP para produção
// https.createServer(options, app).listen(443, () => {
//   console.log(`Servidor HTTPS rodando em https://localhost:${443}`);
// });
