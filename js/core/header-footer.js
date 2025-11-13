// ==========================
// Load Header & Footer
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const isBlogPost = window.location.pathname.includes("/blog/");
  const basePath = isBlogPost ? "../components/" : "/components/";

  loadComponent("header", `${basePath}header.html`);
  loadComponent("footer", `${basePath}footer.html`);
});

async function loadComponent(selector, path) {
  try {
    const res = await fetch(path);
    const html = await res.text();
    document.querySelector(selector).innerHTML = html;

    // Run active link highlight AFTER header is injected
    highlightActiveNavLink();
  } catch (err) {
    console.error(`Error loading ${path}`, err);
  }
}

// ==========================
// Highlight Active Nav Item
// ==========================
function highlightActiveNavLink() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach((a) => {
    if (a.getAttribute("href") === `/${current}`) {
      a.classList.add("active");
    }
  });
}
