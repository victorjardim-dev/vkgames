import showVkPopup from "./vknotification.js";
import handleRecovery from "./admin/recovery.js";
import handleDeleteGame from "./games/deleteGameForm.js";
import handleLogout from "./admin/logout.js";
import handleActiveMenuLinkPage from "./hadleMenuPage.js";

console.log(`VKGames Store ${new Date().getFullYear()}`);

showVkPopup();
handleDeleteGame();
handleRecovery();
handleLogout();
handleActiveMenuLinkPage();
