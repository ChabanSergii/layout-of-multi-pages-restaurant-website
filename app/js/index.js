import mobileNav from './modules/mobile-nav.js';
mobileNav();


import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'
import localeEn from 'air-datepicker/locale/en';


new AirDatepicker('#date', {
    locale: localeEn,
    selectedDates: [new Date()],
    autoClose: false,
    position: 'bottom center',
    dateFormat: 'dd/MM/yyyy',
    navTitles: {
      days: '<strong>yyyy </strong> <strong>MMMM<strong>',
      months: 'Select Month of _<strong>yyyy</strong>',
  }

});

new AirDatepicker('#time', {
  onlyTimepicker: true,
  timepicker: true,
  /* autoClose: true, */
  position: 'bottom center',
  timeFormat: 'HH:mm AA',
  minHours: 11,
  maxHours: 21,
  minutesStep: 15,
});
