import handleModalConfirm from "../handleModalConfirm.js";

const handleDeleteGame = () => {
  const deleteBtnForm = document.querySelectorAll("[data-admin='game-delete']");
  if (deleteBtnForm) {
    deleteBtnForm.forEach(btn => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        handleModalConfirm(event.target.parentNode, "Deseja deletar este jogo?");
      });
    });
  }
}

export default handleDeleteGame;
