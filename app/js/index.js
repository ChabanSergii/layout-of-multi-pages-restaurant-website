import mobileNav from './modules/mobile-nav.js';
mobileNav();


import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'
import localeEn from 'air-datepicker/locale/en';


new AirDatepicker('#date', {
    locale: localeEn,
    selectedDates: [new Date()],
    position: 'right center',
    isMobile: true,
    autoClose: true,
    dateFormat: 'dd/MM/yyyy',
    navTitles: {
      days: '<strong>yyyy </strong> <strong>MMMM<strong>',
      months: 'Select month of <strong>yyyy</strong>',
  }

});

new AirDatepicker('#time', {
  onlyTimepicker: true,
  timepicker: true,
  autoClose: true,
  placement: 'bottom center',
  timeFormat: 'HH:mm AA',
  minHours: 11,
  maxHours: 21,
  minutesStep: 5,
});
