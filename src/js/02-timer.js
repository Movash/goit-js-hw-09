import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const start = document.querySelector('[data-start]');

const daysNumber = document.querySelector('[data-days]');
const hoursNumber = document.querySelector('[data-hours]');
const minutesNumber = document.querySelector('[data-minutes]');
const secondsNumber = document.querySelector('[data-seconds]');

start.disabled = true;
let interval = null;

const options = {
enableTime: true,
time_24hr: true,
defaultDate: new Date(),
minuteIncrement: 1,
onClose(selectedDates) {
  console.log(selectedDates[0]);
if (Date.now() > selectedDates[0].getTime()) {
  start.disabled = true;
  return Notify.failure('Please choose a date in the future');
} 
start.disabled = false;
},
};

const fp = flatpickr(input, options);

start.addEventListener("click", onClick);

function onClick() {
timer.start();
start.disabled = true;
input.disabled = true;
}

const timer = {
  start() {
    interval = setInterval(() => {
      const timeLeft = fp.selectedDates[0].getTime() - Date.now();
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      daysNumber.textContent = days;
      hoursNumber.textContent = hours;
      minutesNumber.textContent = minutes;
      secondsNumber.textContent = seconds;
      console.log(`${days}:${hours}:${minutes}:${seconds}`);

      if (timeLeft <= 0) {
        timer.stop();
        Notify.success('Time is up');
        daysNumber.textContent = '00';
        hoursNumber.textContent = '00';
        minutesNumber.textContent = '00';
        secondsNumber.textContent = '00';
      }
    }, 1000);
  },
  stop() {
    clearInterval(interval);
    start.disabled = false;
    input.disabled = false;
  },
};


function convertMs(ms) {
  // Number of milliseconds per unit of time
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

  // Remaining days
const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


function addLeadingZero(value) {
  return String(value).padStart(2, "0");
};