// Показывать кнопку при прокрутке вниз
window.onscroll = function() {
  const btn = document.getElementById("scrollToTopBtn");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      btn.style.display = "block";
  } else {
      btn.style.display = "none";
  }
};

// Функция плавного перехода к началу страницы
function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
}
