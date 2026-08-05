const menuButton = document.getElementById("menuButton");
const navigationMenu = document.getElementById("navigationMenu");
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (menuButton && navigationMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigationMenu.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navigationMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigationMenu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}