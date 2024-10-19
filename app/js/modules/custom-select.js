document.querySelector('.select-trigger').addEventListener('click', function() {
  document.querySelector('.custom-options').classList.toggle('open');
});

document.querySelectorAll('.custom-option').forEach(option => {
  option.addEventListener('click', function() {
      const value = this.getAttribute('data-value');
      document.querySelector('.select-trigger').textContent = this.textContent;
      document.querySelector('.custom-options').classList.remove('open');
  });
});
