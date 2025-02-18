import showVkPopup from "./vknotification.js";
import handleRecovery from "./admin/recovery.js";
import handleDeleteGame from "./games/deleteGameForm.js";

console.log(`VKGames Store ${new Date().getFullYear()}`);

showVkPopup();
handleDeleteGame();
handleRecovery();
