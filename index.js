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
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div>`;
  let days = ["Sunday", "Saturday", "Monday", "Tuesday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<img id="forecast-icon"src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-night.png" alt="" width="60"/><span class="weather-forecast-day">${day}</span>
              <div class="weather-forecast-temperatures"><span class="weather-forecast-temperature-max">0°C</span>/<span class="weather-forecast-temperature-min">-2°C</span></div></div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

  celsiusTemp = response.data.temperature.current;

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
function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}
function showCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  tempElement.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;
let showTime = document.querySelector("#time");
showTime.innerHTML = formatDate(now);

let cityForm = document.querySelector("#locality-form");
cityForm.addEventListener("submit", showCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

findCity("Kharkiv");
displayForecast();
