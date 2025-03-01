const handlePageLoading = (loadPage) => {
  if (loadPage) {
    const links = document.querySelectorAll("a[href^='/']");
    const btns = document.querySelectorAll("button[type='submit']");
    
    btns.forEach(btn => {
      btn.addEventListener("click", (ev) => {
        loadPage.classList.add("active");
        setInterval(() => { loadPage.classList.remove("active") }, 1200);
      });
    });
    links.forEach(link => {
      link.addEventListener("click", (ev) => {
        if (ev.target instanceof HTMLImageElement || !(ev.target instanceof HTMLImageElement) && !ev.target.getAttribute("href").includes("/logout")) {
          loadPage.classList.add("active");
          setInterval(() => { loadPage.classList.remove("active") }, 1200);
        }
      });
    });
  }
}

export default handlePageLoading;
