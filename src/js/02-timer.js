import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// const isDisabled = true;
// let selectedDate = Date.now();

// refs.startBtn.disabled = isDisabled;
// refs.startBtn.addEventListener('click', onStartClick);

// const flatp = flatpickr(refs.inputEl, options);

// function onCloseFunction(date) {
//   if (Date.now() > date) {
//     Notify.failure('Please choose Your date');
//   } else {
//     refs.startBtn.disabled = !isDisabled;
//     selectedDate = date;
//   }
// }

// function onStartClick() {
//   refs.startBtn.disabled = isDisabled;
//   flatp.destroy();
//   refs.inputEl.disabled = isDisabled;
//   summaryStart();
// }

// class Timer {
//   constructor() {
//     this.isActive = false;
//     this.timerId = null;
//     buttonEl.disabled = true;
//   }
//   timerStart() {
//     if (this.isActive) {
//       return;
//     }
//     this.isActive = true;
//     this.timerId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = userDate - currentTime;
//       const components = convertMs(deltaTime);

//       secondsEl.textContent = components.seconds;
//       minutesEl.textContent = components.minutes;
//       hoursEl.textContent = components.hours;
//       daysEl.textContent = components.days;
//       if (deltaTime <= 0) {
//         this.timerStop();
//         timerDiv.innerHTML = 'Time is over!';
//       }
//     }, 1000);
//   }
//   timerStop() {
//     clearInterval(this.timerId);
//   }
// }
