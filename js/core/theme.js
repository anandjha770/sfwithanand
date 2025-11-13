// ==========================
// Dark Mode Toggle
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  const icon = toggle.querySelector("i");
  const saved = localStorage.getItem("theme");

  // Apply saved theme
  if (saved === "dark") {
    document.body.classList.add("dark-mode");
    icon.classList.replace("fa-moon", "fa-sun");
  }

  // Auto-detect system dark mode
  if (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark-mode");
    icon.classList.replace("fa-moon", "fa-sun");
  }

  // Toggle event
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");

    icon.classList.replace(
      isDark ? "fa-moon" : "fa-sun",
      isDark ? "fa-sun" : "fa-moon"
    );

    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});
