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

document.addEventListener('DOMContentLoaded', () => {
  const selectTrigger = document.querySelector('.select-trigger');
  const optionsContainer = document.querySelector('.custom-options');
  const options = document.querySelectorAll('.custom-option');
  const hiddenInput = document.getElementById('total-persons');

  // Открытие/закрытие выпадающего списка
  selectTrigger.addEventListener('click', () => {
    const expanded = selectTrigger.getAttribute('aria-expanded') === 'true';
    selectTrigger.setAttribute('aria-expanded', !expanded);
    optionsContainer.setAttribute('aria-hidden', expanded);
  });

  // Выбор значения
  options.forEach(option => {
    option.addEventListener('click', () => {
      const selectedValue = option.dataset.value;
      const selectedText = option.textContent;

      // Обновляем триггер и скрытое поле
      selectTrigger.textContent = selectedText;
      hiddenInput.value = selectedValue;

      // Закрываем выпадающий список
      selectTrigger.setAttribute('aria-expanded', false);
      optionsContainer.setAttribute('aria-hidden', true);
    });
  });

  // Закрытие при клике вне списка
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select')) {
      selectTrigger.setAttribute('aria-expanded', false);
      optionsContainer.setAttribute('aria-hidden', true);
    }
  });
});

