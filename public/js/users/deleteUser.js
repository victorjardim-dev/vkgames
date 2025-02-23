const handleDeleteUser = () => {
  const btnDeleteUser = document.querySelectorAll("[data-admin='user-delete']");
  if (btnDeleteUser) {
    btnDeleteUser.forEach(btn => {
      btn.addEventListener("click", async (event) => {
        event.preventDefault();
        if (confirm("Deseja mesmo deletar este usuário?")) {
          event.target.parentNode.submit();
        }
      });
    });
  }
}

export default handleDeleteUser;
