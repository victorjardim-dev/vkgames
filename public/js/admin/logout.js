const handleLogout = () => {
  const btnLogout = document.querySelector("[data-admin='logout']");

  if (btnLogout) {
    btnLogout.addEventListener("click", (event) => {
      if (confirm("Deseja realmente sair do sistema?")) {
        alert("Até mais!");
        return;
      }

      event.preventDefault();
    });
  }
}

export default handleLogout;
