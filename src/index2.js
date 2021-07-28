let now = new Date();
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

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day} ${hours}:${minutes}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#temperature");
  cityTemp.innerHTML = temperature;
  let cityWeather = response.data.weather[0].description;
  let cityDescription = document.querySelector("#description");
  cityDescription.innerHTML = cityWeather;
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
  console.log(apiUrl);
}

let citySubmit = document.querySelector("#city-search");
citySubmit.addEventListener("submit", search);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = `19°C`;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

function currentNavigator(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "e70f39679296042a105ae9d2c915332b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  let currentLocation = `Your current Location`;
  let citySearch = document.querySelector("#city");
  citySearch.innerHTML = `Your current location`;
  console.log(currentLocation);
  axios.get(apiUrl).then(showTemperature);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", currentNavigator);
