import mobileNav from './modules/mobile-nav.js';
mobileNav();

import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeEn from 'air-datepicker/locale/en';

// Дата с ограничением на прошедшие дни
new AirDatepicker('#date', {
  locale: localeEn,
  selectedDates: [new Date()],
  autoClose: false,
  position: 'bottom center',
  dateFormat: 'dd/MM/yyyy',
  navTitles: {
      days: '<strong>yyyy </strong> <strong>MMMM<strong>',
      months: 'Select Month of _<strong>yyyy</strong>',
  },
  isDisabled: function (date) {
      // Отключаем даты в прошлом
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Устанавливаем начало текущего дня
      return date < today; // Возвращает true для прошедших дат
  },
  onSelect: function ({ date, formattedDate, datepicker }) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Устанавливаем начало текущего дня

      if (date < today) {
          alert("Эти дни уже прошли");
          datepicker.clear(); // Убираем выбранную дату, если она в прошлом
      }
  }
});

// Время с округлением до 15 минут
const now = new Date();
const roundedMinutes = Math.round(now.getMinutes() / 15) * 15;
now.setMinutes(roundedMinutes, 0, 0);

new AirDatepicker('#time', {
  onlyTimepicker: true,
  timepicker: true,
  position: 'bottom center',
  timeFormat: 'HH:mm AA',
  minHours: 11,
  maxHours: 21,
  minutesStep: 15,
  selectedDates: [now],
});
