// // Load global head content into <head>
// fetch("/components/global-head.html")
//   .then((res) => res.text())
//   .then((data) => {
//     document.head.insertAdjacentHTML("afterbegin", data);
//   })
//   .catch((err) => console.error("Error loading global head:", err));
fetch("/components/global-head.html")
  .then((res) => res.text())
  .then((html) => {
    document.head.innerHTML += html;

    // Reveal the page after head + CSS is fully appended
    document.documentElement.style.visibility = "visible";
  })
  .catch((err) => {
    console.error("Head loading failed:", err);

    // Even if loading failed, show the page to avoid blank screen
    document.documentElement.style.visibility = "visible";
  });
