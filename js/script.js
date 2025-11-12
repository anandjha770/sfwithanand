// script.js

// Check what page we are on
console.log("🟢 Current page path:", window.location.pathname);

if (window.location.pathname.endsWith("blog.html")) {
  console.log("✅ Detected Blog Page — starting to fetch blog data...");

  // Step 1: Fetch JSON file
  fetch("data/blogs.json")
    .then((res) => {
      console.log("📦 Response received from fetch:", res);
      return res.json(); // Convert response to JSON
    })
    .then((blogs) => {
      console.log("🧾 Parsed blogs JSON data:", blogs);

      const container = document.getElementById("blogContainer");
      console.log("📍 Found blog container element:", container);

      // Step 2: Clear placeholder text
      container.innerHTML = "";
      console.log("🧹 Cleared old placeholder text");

      // Step 3: Loop through blogs and render cards
      blogs.forEach((blog, index) => {
        console.log(`🌀 Rendering blog #${index + 1}:`, blog);

        container.innerHTML += `
          <div class="col-md-6">
            <div class="card shadow-sm h-100 blog-card" data-category="${blog.category}">
              <div class="card-body">
                <h5 class="card-title">${blog.title}</h5>
                <p class="text-muted small">${blog.date}</p>
                <p class="card-text">${blog.description}</p>
                <a href="${blog.link}" class="btn btn-primary">Read More</a>
              </div>
            </div>
          </div>
        `;
      });

      console.log("✅ Finished rendering all blog posts.");

      // ====== Blog Category Filter ======
      const filterButtons = document.querySelectorAll("#filterTabs button");

      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          // Toggle active button
          filterButtons.forEach((b) => b.classList.remove("active"));
          button.classList.add("active");

          const selected = button.dataset.category;
          const cards = document.querySelectorAll("#blogContainer .col-md-6");

          cards.forEach((col) => {
            const card = col.querySelector(".card");
            const category = card?.dataset?.category;
            if (selected === "all" || category === selected) {
              col.style.display = "block";
            } else {
              col.style.display = "none";
            }
          });
        });
      });
    })
    .catch((err) => {
      console.error("❌ Error occurred while loading blogs:", err);

      const container = document.getElementById("blogContainer");
      if (container) {
        container.innerHTML = `
          <div class="alert alert-danger">Failed to load blogs. Check console for details.</div>
        `;
      }
    });
} else {
  console.log("ℹ️ Not on blog page — skipping blog script.");
}

// --------------------------------------
// Dynamic VIDEO loader
// --------------------------------------
if (window.location.pathname.endsWith("videos.html")) {
  console.log("✅ Detected Videos Page — starting to fetch video data...");

  fetch("data/videos.json")
    .then((res) => {
      console.log("📦 Response received from videos.json:", res);
      return res.json();
    })
    .then((videos) => {
      console.log("🎬 Parsed videos JSON data:", videos);

      const container = document.getElementById("videosContainer");
      container.innerHTML = ""; // Clear any existing content

      videos.forEach((video, index) => {
        console.log(`▶️ Rendering video #${index + 1}:`, video);

        container.innerHTML += `
          <div class="col-md-6">
            <div class="card shadow-sm h-100">
              <div class="ratio ratio-16x9">
                <iframe 
                  src="https://www.youtube.com/embed/${video.youtubeId}" 
                  title="${video.title}" 
                  allowfullscreen>
                </iframe>
              </div>
              <div class="card-body">
                <h5 class="card-title">${video.title}</h5>
                <p class="text-muted small">${video.date}</p>
                <p class="card-text">${video.description}</p>
              </div>
            </div>
          </div>
        `;
      });

      console.log("✅ Finished rendering all videos.");
    })
    .catch((err) => {
      console.error("❌ Error occurred while loading videos:", err);
      document.getElementById("videosContainer").innerHTML =
        '<div class="alert alert-danger">Failed to load videos. Please check console.</div>';
    });
}

// --------------------------------------
// Contact Form Submission (Contact Page)
// --------------------------------------
if (window.location.pathname.endsWith("contact.html")) {
  console.log("✅ Detected Contact Page — enabling form submission.");

  const contactForm = document.getElementById("contactForm");
  const formResponse = document.getElementById("formResponse");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      console.log("📨 Form submitted with data:", { name, email, message });

      if (name === "" || email === "" || message === "") {
        formResponse.innerHTML = `<div class="alert alert-danger">Please fill out all fields before submitting.</div>`;
        return;
      }

      // Simulate successful submission (we'll link Firebase later)
      formResponse.innerHTML = `<div class="alert alert-success">✅ Thank you, ${name}! Your message has been sent successfully.</div>`;
      contactForm.reset();

      console.log("✅ Message sent successfully (demo mode).");
    });
  }
}

// ====== DARK MODE TOGGLE ====== //
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");

  // Exit if toggle not found (prevents console errors on pages without navbar)
  if (!themeToggle) return;

  const icon = themeToggle.querySelector("i");
  const savedTheme = localStorage.getItem("theme");

  // Apply saved theme preference
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    icon.classList.replace("fa-moon", "fa-sun");
  } else if (
    !savedTheme &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // Auto-detect system dark mode (if no preference saved)
    document.body.classList.add("dark-mode");
    icon.classList.replace("fa-moon", "fa-sun");
  }

  // Handle toggle click
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");

    // Switch icons
    if (isDark) {
      icon.classList.replace("fa-moon", "fa-sun");
    } else {
      icon.classList.replace("fa-sun", "fa-moon");
    }

    // Save preference
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});
