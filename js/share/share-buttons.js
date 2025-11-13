// ==========================
// Share Buttons
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);

  const fb = document.querySelector(".share-btn.fb");
  const tw = document.querySelector(".share-btn.tw");
  const ln = document.querySelector(".share-btn.ln");
  const wa = document.querySelector(".share-btn.wa");

  if (fb) fb.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  if (tw) tw.href = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
  if (ln)
    ln.href = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
  if (wa) wa.href = `https://wa.me/?text=${title}%20${url}`;
});
