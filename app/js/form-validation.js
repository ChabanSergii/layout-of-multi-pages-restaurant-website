document.addEventListener('DOMContentLoaded', () => {
  console.log('Validation script connected!');

  // Функция проверки поля
  const validateField = (field) => {
    const value = field.value?.trim() || '';
    const type = field.getAttribute('type');
    const required = field.hasAttribute('required');
    const minlength = field.getAttribute('minlength') || 0;
    const maxlength = field.getAttribute('maxlength') || Infinity;

    // Проверка обязательного поля
    if (required && !value) {
      console.log(`Error in ${field.name}: This field is required.`);
      return 'This field is required.';
    }

    // Проверка длины текста
    if (minlength && value.length < minlength) {
      console.log(`Error in ${field.name}: Value must be at least ${minlength} characters.`);
      return `Value must be at least ${minlength} characters.`;
    }
    if (maxlength && value.length > maxlength) {
      console.log(`Error in ${field.name}: Value must be no more than ${maxlength} characters.`);
      return `Value must be no more than ${maxlength} characters.`;
    }

    // Проверка email
    if (type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      console.log(`Error in ${field.name}: Invalid email format.`);
      return 'Please enter a valid email address.';
    }

    // Поле валидно
    console.log(`${field.name} is valid.`);
    return '';
  };

  // Функция отображения ошибки
  const showError = (field, message) => {
    const existingError = field.closest('.form-group')?.querySelector('.error-message');
    if (existingError) existingError.remove();

    if (message) {
      const errorElement = document.createElement('span');
      errorElement.className = 'error-message';
      errorElement.textContent = message;
      field.after(errorElement);
    }
  };

  // Проверка всех форм на странице
  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      console.log(`Validating form: ${form.className}`);
      let isValid = true;

      // Проверка всех полей
      form.querySelectorAll('input, textarea, .custom-select-trigger').forEach((field) => {
        const errorMessage = validateField(field);
        showError(field, errorMessage);

        if (errorMessage) isValid = false;
      });

      if (!isValid) {
        console.log('Form validation failed. Preventing submission.');
        e.preventDefault(); // Остановить отправку
      } else {
        console.log('Form is valid. Submitting.');
        form.submit(); // Отправка формы
      }
    });

    // Динамическая проверка при вводе
    form.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('input', () => {
        const errorMessage = validateField(input);
        showError(input, errorMessage);
      });
    });
  });
});
