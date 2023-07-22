function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const start = document.querySelector("[data-start]");
const stop = document.querySelector('[data-stop]');
let timer = null;

start.addEventListener('click', startClick);
stop.addEventListener('click', stopClick);

function startClick() {
timer = setInterval(() => {
const randomColor = getRandomHexColor();
document.body.style.backgroundColor = randomColor;
}, 1000);
stop.disabled = false;
start.disabled = true;
}

function stopClick() {
clearInterval(timer);
start.disabled = false;
stop.disabled = true;
}