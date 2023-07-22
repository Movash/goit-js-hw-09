import { Notify } from 'notiflix/build/notiflix-notify-aio';

const submit = document.querySelector('[type="submit"]');
const nameDelay = document.querySelector('[name="delay"]');
const nameStep = document.querySelector('[name="step"]');
const nameAmount = document.querySelector('[name="amount"]');

submit.addEventListener('click', onCreatePromise);

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}

function onCreatePromise(evt) {

evt.preventDefault();

let delay = Number(nameDelay.value);
let step = Number(nameStep.value);
let amount = Number(nameAmount.value);

  for (let position = 1; position <= amount; position += 1) {
    delay += step;

  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}



