import handleModalConfirm from "../handleModalConfirm.js";

const handleLogout = () => {
  const btnLogout = document.querySelector("[data-admin='logout']");

  if (btnLogout) {
    btnLogout.addEventListener("click", (event) => {
      event.preventDefault();
      handleModalConfirm(btnLogout, "Deseja realmente sair?");
    });
  }
}

export default handleLogout;
