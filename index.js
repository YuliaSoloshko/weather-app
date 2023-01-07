let now = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();
  let formattedDate = `${currentDay} ${currentHour}:${currentMinute}`;
  return formattedDate;
}
let showTime = document.querySelector("#time");
showTime.innerHTML = formatDate(now);

function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-name");
  let searchingCity = document.querySelector("h1");
  searchingCity.innerHTML = inputCity.value;
}
let cityForm = document.querySelector("#locality-form");
cityForm.addEventListener("submit", showCity);

function celsTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = "19";
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", celsTemp);

function farTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = "66";
}
let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", farTemp);
