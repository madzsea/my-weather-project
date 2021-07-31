let now = new Date();
console.log(now);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = now.getDate();
let months = [
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
let month = months[now.getMonth()];

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day} ${date} ${month}, ${hours}:${minutes} AEST`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
                    <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
                        <div class="weather-forecast-temperatures"> 
                        <span class="weather-forecast-min">${Math.round(
                          forecastDay.temp.min
                        )}° /</span> 
                        <span class="weather-forecast-max temperature">${Math.round(
                          forecastDay.temp.max
                        )}°</span>
                    </div>
                    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "e70f39679296042a105ae9d2c915332b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#temperature");
  cityTemp.innerHTML = temperature;
  let cityWeather = response.data.weather[0].description;
  let cityDescription = document.querySelector("#description");
  cityDescription.innerHTML = cityWeather;
  let cityWind = response.data.wind.speed;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${cityWind} km/h`;
  let cityHumidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${cityHumidity}%`;
  let currentLocation = response.data.name;
  let citySearch = document.querySelector("#city");
  citySearch.innerHTML = `${currentLocation}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-info");
  let citySearch = document.querySelector("#city");
  console.log(cityInput.value);
  citySearch.innerHTML = `${cityInput.value}`;
  let apiKey = "e70f39679296042a105ae9d2c915332b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let citySubmit = document.querySelector("#city-search");
citySubmit.addEventListener("submit", search);

function currentNavigator(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "e70f39679296042a105ae9d2c915332b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", currentNavigator);

function defaultSearch(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
defaultSearch("Sydney");
