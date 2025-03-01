const fs = require("fs");
const path = require("path");
const db = require("../connection/database");
const { CronJob } = require("cron");

const job = new CronJob("*/30 * * * * *", () => {
  const directory = "./public/img/game_covers";
  const querys = ["DELETE FROM games;", "DELETE FROM users WHERE user_name <> 'vkdev' and user_name <> 'admin';"];
  let msg = "";

  querys.forEach(query => {
    db.conn.query(query, "", (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        return;
      }
      msg = "Banco de dados zerado com sucesso em: " + new Date().toLocaleTimeString();
    });
  });

  if (msg.length > 0) console.log(msg);

  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error("Erro ao ler diretório:", err);
      return;
    }

    if (files.length === 0) {
      console.log("Sem imagens para deletar");
      return;
    }

    files.forEach(file => {
      if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)) {
        const filePath = path.join(directory, file);
        fs.unlink(filePath, err => {
          if (err) {
            console.error(`Erro ao deletar ${file}:`, err);
          } else {
            console.log(`Imagem deletada: ${file}`);
          }
        });
      }
    });
  });

  console.log("Cron executada em: ", new Date().toLocaleTimeString());
});

module.exports = job;
