// ==========================
// Video Loader
// ==========================
if (window.location.pathname.endsWith("videos.html")) {
  fetch("/data/videos.json")
    .then((res) => res.json())
    .then((videos) => {
      const container = document.getElementById("videosContainer");
      container.innerHTML = "";

      videos.forEach((video) => {
        container.innerHTML += `
          <div class="col-md-6">
            <div class="card shadow-sm">
              <div class="ratio ratio-16x9">
                <iframe 
                  src="https://www.youtube.com/embed/${video.youtubeId}" 
                  title="${video.title}" 
                  allowfullscreen></iframe>
              </div>
              <div class="card-body">
                <h5>${video.title}</h5>
                <p class="text-muted small">${video.date}</p>
                <p>${video.description}</p>
              </div>
            </div>
          </div>`;
      });
    })
    .catch(() => {
      document.getElementById("videosContainer").innerHTML =
        '<div class="alert alert-danger">Failed to load videos.</div>';
    });
}
