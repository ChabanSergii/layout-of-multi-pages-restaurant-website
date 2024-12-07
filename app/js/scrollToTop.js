document.getElementById("scrollToTopBtn").addEventListener("click", function() {
  scrollToTop();
});

// Функция плавного перехода к началу страницы
function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
}
