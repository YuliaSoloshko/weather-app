let now = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
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

let showTime = document.querySelector("#time");
showTime.innerHTML = formatDate(now);

function showWeather(response) {
  let cityName = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let cityNameElem = document.querySelector("h1");
  let tempElement = document.querySelector("#temp");
  let descElement = document.querySelector("#description");
  let humElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  cityNameElem.innerHTML = `${cityName}`;
  tempElement.innerHTML = `${temperature}`;
  descElement.innerHTML = `${description}`;
  humElement.innerHTML = `${humidity}`;
  windElement.innerHTML = `${wind}`;
}

function findCity() {
  let inputCity = document.querySelector("#city-name");
  let apiKey = "7ed26a6948c661d05fafe7355b41b2ec";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=${units}`;
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
  let apiKey = "7ed26a6948c661d05fafe7355b41b2ec";
  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(geoUrl).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let cityForm = document.querySelector("#locality-form");
cityForm.addEventListener("submit", showCity);
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);
