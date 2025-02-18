const fs = require("fs");

const deleteImage = (imagem) => {

  if (imagem) {
    let img = imagem;
    
    if (!img.includes("public\\img\\game_covers\\")) {
      img = "public\\img\\game_covers\\" + img;
    }
  
    fs.unlink(img, err => {
      if (err) {
        console.error("Erro ao deletar a imagem");
        return;
      }
      console.log("Imagem deletada com sucesso.");
    });
  } else {
    console.log("Imagem inexistente");
  }
}

module.exports = {
  deleteImage,
}
