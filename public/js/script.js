import showVkPopup from "./vknotification.js";
import handleRecovery from "./admin/recovery.js";
import handleDeleteUser from "./users/deleteUser.js";
import handleDeleteGame from "./games/deleteGameForm.js";
import handleLogout from "./admin/logout.js";
import handleActiveMenuLinkPage from "./hadleMenuPage.js";
import handleMenuMobile from "./handleMenuMobile.js";
import handlePageLoading from "./handlePageLoading.js";

console.log(`VKGames Store ${new Date().getFullYear()}`);
const urlBaseRequest = `${window.location.protocol}//${window.location.host}`;
const loadPage = document.querySelector(".loading-page");

showVkPopup();
handleDeleteUser();
handleDeleteGame();
handleRecovery(urlBaseRequest, loadPage);
handlePageLoading(loadPage);
handleLogout();
handleActiveMenuLinkPage();
handleMenuMobile();
