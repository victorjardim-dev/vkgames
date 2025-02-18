const handleDeleteGame = () => {
  const deleteBtnForm = document.querySelectorAll(".deleteGameBtn");

  if (deleteBtnForm) {
    deleteBtnForm.forEach(btn => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        const currentForm = event.target.form;
        if (confirm("Deseja deletar este jogo?")) {
          currentForm.submit();
        }
      });
    });
  }
}

export default handleDeleteGame;
