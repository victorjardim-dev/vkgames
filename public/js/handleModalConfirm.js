const handleModalConfirm = (el, title = "") => {
  const modal = document.querySelector("#vk-confirm-popup-container");
  const modalTitle = modal.querySelector("h2");
  
  if (modal) {
    modalTitle.innerHTML = title;
    modal.classList.add("active");

    
    modal.addEventListener("click", (e) => {
      const isLogoutConfirm = e.target.dataset.confirm;
  
      if (isLogoutConfirm === "n") {
        modal.classList.remove("active");
        return;
      }
  
      if (isLogoutConfirm === "y") {
        if (el.getAttribute("href") === "/logout")
          window.location.href = "/logout";

        if (el instanceof HTMLFormElement)
          el.submit();

      }  
    });
  }

}

export default handleModalConfirm;
