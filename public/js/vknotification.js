const showVkPopup = () => {
  const vkPopupNotification = document.getElementById("vk-popup-notification");
  if (vkPopupNotification) {
    let t1, t2;

    const clearCustomInterval = () => {
      clearTimeout(t1);
      clearTimeout(t2);
      t1 = undefined;
      t2 = undefined;
    }

    if (t1 || t2) clearCustomInterval();

    vkPopupNotification.classList.add("active");

    t1 = setTimeout(() => {
      vkPopupNotification.style.animation = "hide .3s linear forwards";
      t2 = setTimeout(() => {
        vkPopupNotification.style.animation = "";
        vkPopupNotification.classList.remove("active");

        clearCustomInterval();
      }, 500);
    }, 3000);
  }
}

export default showVkPopup;
