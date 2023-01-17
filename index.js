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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div>`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="one-day-block"><img id="forecast-icon"src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png" alt="" width="60"/><span class="weather-forecast-day">${formatDay(
          forecastDay.time
        )}</span>
              <div class="weather-forecast-temperatures"><span class="weather-forecast-temperature-max">${Math.round(
                forecastDay.temperature.maximum
              )}°C </span>/<span class="weather-forecast-temperature-min"> ${Math.round(
          forecastDay.temperature.minimum
        )}°C</span></div></div></div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "7613bo043926be542af06637tff802f8";
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(forecastUrl);
  axios.get(forecastUrl).then(displayForecast);
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

  getForecast(response.data.coordinates);
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
  let geoUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
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

function showKyiv(response) {
  let tempKyiv = document.querySelector("#kyivtemp");
  tempKyiv.innerHTML = Math.round(response.data.temperature.current);
}

function findKyiv() {
  let apiKey = "7613bo043926be542af06637tff802f8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Kyiv&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showKyiv);
}

function showLisbon(response) {
  let tempLisbon = document.querySelector("#lisbontemp");
  tempLisbon.innerHTML = Math.round(response.data.temperature.current);
}

function findLisbon() {
  let apiKey = "7613bo043926be542af06637tff802f8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLisbon);
}
function showSeoul(response) {
  let tempSeoul = document.querySelector("#seoultemp");
  tempSeoul.innerHTML = Math.round(response.data.temperature.current);
}

function findSeoul() {
  let apiKey = "7613bo043926be542af06637tff802f8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Seoul&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showSeoul);
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

findKyiv();
findLisbon();
findSeoul();
findCity("Kharkiv");
