// ==========================
// Blog Loader
// ==========================
if (window.location.pathname.endsWith("blog.html")) {
  fetch("/data/blogs.json")
    .then((res) => res.json())
    .then((blogs) => {
      const container = document.getElementById("blogContainer");
      container.innerHTML = "";

      blogs.forEach((blog) => {
        container.innerHTML += `
          <div class="col-md-6">
            <div class="card shadow-sm blog-card" data-category="${blog.category}">
              <div class="card-body">
                <h5>${blog.title}</h5>
                <p class="text-muted small">${blog.date}</p>
                <p>${blog.description}</p>
                <a href="${blog.link}" class="btn btn-primary text-white">Read More</a>
              </div>
            </div>
          </div>`;
      });

      initBlogFilter();
    })
    .catch(() => {
      document.getElementById("blogContainer").innerHTML =
        '<div class="alert alert-danger">Failed to load blogs.</div>';
    });
}

// ==========================
// Blog Category Filter
// ==========================
function initBlogFilter() {
  const buttons = document.querySelectorAll("#filterTabs button");
  const cards = document.querySelectorAll("#blogContainer .col-md-6");

  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.category;

      cards.forEach((col) => {
        const card = col.querySelector(".card");
        col.style.display =
          filter === "all" || card.dataset.category === filter
            ? "block"
            : "none";
      });
    })
  );
}
