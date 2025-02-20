import showVkPopup from "./vknotification.js";
import handleRecovery from "./admin/recovery.js";
import handleDeleteGame from "./games/deleteGameForm.js";
import handleLogout from "./admin/logout.js";
import handleActiveMenuLinkPage from "./hadleMenuPage.js";

console.log(`VKGames Store ${new Date().getFullYear()}`);
const urlBaseRequest = `${window.location.protocol}//${window.location.host}`;

showVkPopup();
handleDeleteGame();
handleRecovery(urlBaseRequest);
handleLogout();
handleActiveMenuLinkPage();

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
