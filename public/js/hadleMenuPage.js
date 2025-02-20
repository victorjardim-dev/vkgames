const handleActiveMenuLinkPage = () => {
  const menuLinks = document.querySelectorAll("header .menu-list li a");
  if (menuLinks) {
    const pathName = window.location.pathname;
  
    menuLinks.forEach(el => {
      const href = el.getAttribute("href");
      if (href === pathName) {
        el.parentElement.classList.add("active");
      }
    });
  }
}

export default handleActiveMenuLinkPage;
