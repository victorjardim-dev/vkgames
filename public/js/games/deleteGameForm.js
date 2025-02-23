const handleDeleteGame = () => {
  const deleteBtnForm = document.querySelectorAll("[data-admin='game-delete']");

  if (deleteBtnForm) {
    deleteBtnForm.forEach(btn => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        if (confirm("Deseja deletar este jogo?")) {
          event.target.parentNode.submit();
        }
      });
    });
  }
}

export default handleDeleteGame;
