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
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  let formattedDate = `${currentDay} ${currentHour}:${currentMinute}`;
  return formattedDate;
}

function showWeather(response) {
  let cityName = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let description = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);

  let cityNameElem = document.querySelector("h1");
  let tempElement = document.querySelector("#temp");
  let descElement = document.querySelector("#description");
  let humElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  cityNameElem.innerHTML = `${cityName}`;
  tempElement.innerHTML = `${temperature}`;
  descElement.innerHTML = `${description}`;
  humElement.innerHTML = `${humidity}`;
  windElement.innerHTML = `${wind}`;

  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
}

function findCity(inputCity) {
  let apiKey = "7613bo043926be542af06637tff802f8";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${inputCity}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-name").value;
  findCity(inputCity);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "7613bo043926be542af06637tff802f8";
  let geoUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
  axios.get(geoUrl).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let showTime = document.querySelector("#time");
showTime.innerHTML = formatDate(now);

let cityForm = document.querySelector("#locality-form");
cityForm.addEventListener("submit", showCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);

findCity("Kharkiv");
