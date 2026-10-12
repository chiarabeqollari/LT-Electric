const backToTop = document.querySelector("#back-to-top");

function toggleBackToTop() {
  backToTop.classList.toggle("show", window.scrollY > 300);
}

window.addEventListener("scroll", toggleBackToTop, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

toggleBackToTop();