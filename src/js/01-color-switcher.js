function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const isDisabled = true;
let timeInterval = 0;

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStop.disabled = isDisabled;

btnStart.addEventListener('click', onStartClick);
btnStop.addEventListener('click', onStopClick);

function changeBkgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function onStartClick() {
  btnStart.disabled = isDisabled;
  btnStop.disabled = !isDisabled;
  timeInterval = setInterval(changeBkgColor, 1000);
}

function onStopClick() {
  btnStop.disabled = !isDisabled;
  btnStart.disabled = isDisabled;
  clearInterval(timeInterval);
}
