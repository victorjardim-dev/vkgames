const handlePopupWarning = () => {
  const modalWarning = document.querySelector("#vk-warning-popup");

  if (modalWarning) {
    const btnClose = modalWarning.querySelector("button");

    btnClose.addEventListener("click", () => {
      modalWarning.classList.remove("active");
    });

    setTimeout(() => { modalWarning.classList.add("active"); }, 1000);
  }

}

export default handlePopupWarning;
