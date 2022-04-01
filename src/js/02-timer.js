import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('button[data-start');
const timerDiv = document.querySelector('.timer');
const daysEl = document.querySelector('span[data-days');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

buttonEl.classList.add('disabled');
let userDate = null;

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Choose a date');
      userDate = new Date();
    } else {
      buttonEl.disabled = false;
      buttonEl.classList.remove('disabled');
      userDate = selectedDates[0];
    }
  },
};

class Timer {
  constructor() {
    this.isActive = false;
    this.timerId = null;
    buttonEl.disabled = true;
  }
  timerStart() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = userDate - currentTime;
      const components = convertMs(deltaTime);

      secondsEl.textContent = components.seconds;
      minutesEl.textContent = components.minutes;
      hoursEl.textContent = components.hours;
      daysEl.textContent = components.days;
      if (deltaTime < 0) {
        this.timerStop();
        timerDiv.innerHTML = 'Time is up';
      }
    }, 1000);
  }
  timerStop() {
    clearInterval(this.timerId);
  }
}
const timer = new Timer();
flatpickr(inputEl, options);
buttonEl.addEventListener('click', () => timer.timerStart());
