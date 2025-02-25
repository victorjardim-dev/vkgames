import handleModalConfirm from "../handleModalConfirm.js";

const handleDeleteUser = () => {
  const btnDeleteUser = document.querySelectorAll("[data-admin='user-delete']");
  if (btnDeleteUser) {
    btnDeleteUser.forEach(btn => {
      btn.addEventListener("click", async (event) => {
        event.preventDefault();
        handleModalConfirm(event.target.parentNode, "Deseja deletar este usuário?");
      });
    });
  }
}

export default handleDeleteUser;
