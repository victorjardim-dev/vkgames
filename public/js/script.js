import showVkPopup from "./vknotification.js";
import handleRecovery from "./admin/recovery.js";
import handleDeleteUser from "./users/deleteUser.js";
import handleDeleteGame from "./games/deleteGameForm.js";
import handleLogout from "./admin/logout.js";
import handleActiveMenuLinkPage from "./hadleMenuPage.js";

console.log(`VKGames Store ${new Date().getFullYear()}`);
const urlBaseRequest = `${window.location.protocol}//${window.location.host}`;

showVkPopup();
handleDeleteUser();
handleDeleteGame();
handleRecovery(urlBaseRequest);
handleLogout();
handleActiveMenuLinkPage();
