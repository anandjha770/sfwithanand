// /js/core/head-loader.js
// Load the global HEAD fragment into the real <head>, then reveal the page.

fetch("/components/global-head.html")
  .then((res) => {
    if (!res.ok)
      throw new Error("Failed to fetch global-head.html: " + res.status);
    return res.text();
  })
  .then((html) => {
    // Insert at the beginning of <head> so meta + CSS + GA are available early
    document.head.insertAdjacentHTML("afterbegin", html);

    // Reveal the page now that head (CSS + GA) has been injected
    document.documentElement.style.visibility = "visible";
  })
  .catch((err) => {
    console.error("Head loading failed:", err);

    // If anything fails, show the page to avoid blank screen
    document.documentElement.style.visibility = "visible";
  });
