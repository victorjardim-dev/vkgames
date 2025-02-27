const handleMenuMobile = () => {
  const btnMobile = document.querySelector(".nav-icon-mobile");
  if (btnMobile) {
    const navMenuList = document.querySelector(".menu-list");

    btnMobile.addEventListener("click", () => {
      navMenuList.classList.add("active");
    });

    document.body.addEventListener("click", (e) => {
      if (e.target !== navMenuList && e.target !== btnMobile && e.target.getAttribute("href") !== "/logout") {
        navMenuList.classList.remove("active");
      }
    });
  }
}

export default handleMenuMobile;
