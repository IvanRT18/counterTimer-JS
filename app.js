const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

// Equivale al querySelectorAll de arriba
// const days = document.querySelector(".days");
// const hours = document.querySelector(".hours");
// const mins = document.querySelector(".mins");
// const secs = document.querySelector(".secs");

let tempYear = new Date().getFullYear();
let tempMonth = new Date().getMonth();
let tempDate = new Date().getDate();

//Dia de finalización en diez dias al tiempo actual en que se visita la pagina
const futureDate = new Date(tempYear, tempMonth, tempDate + 10, 17, 30, 0);

//Obtencion de la fecha en partes separadas
const year = futureDate.getFullYear();
const date = futureDate.getDate();
const hours = futureDate.getHours();
const mins = futureDate.getMinutes();

//Para el mes y el dia se tiene que crear un arreglo con los nombre y despues acceder con los valores obtenidos
let month = futureDate.getMonth();
month = months[month];
let day = weekdays[futureDate.getDay()];
//contenido del h4
giveaway.textContent = `Giveaway ends on ${day}, ${date} ${month} ${year} ${hours}:${mins} pm`;

//Future time in ms
const futureTimeMs = futureDate.getTime();

//Calcula la diferencia en milisegundos entre el tiempo futuro y el actual
function getRemainingTime() {
  const today = new Date().getTime();
  const timeRemaining = futureTimeMs - today;

  //Valores en ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;

  //Calcula los valores
  let days = timeRemaining / oneDay;
  days = Math.floor(days);
  let hours = (timeRemaining % oneDay) / oneHour;
  hours = Math.floor(hours);
  let minutes = (timeRemaining % oneHour) / oneMin;
  minutes = Math.floor(minutes);
  let seconds = Math.floor((timeRemaining % oneMin) / 1000);

  //Arreglo con formato para iterar con index
  const values = [days, hours, minutes, seconds];

  function format(value) {
    if (value < 10) {
      return `0${value}`;
    } else return value;
  }

  //Se usa forEach con el arreglo anterior declarado
  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });

  if (timeRemaining < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h2 class="expire">Sorry this giveaway has expired</h2>`;
  }
}

//Countdown
const countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
