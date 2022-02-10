// import axios from "axios";

let apiKey = "cf8403573358fa943fb21dc8f32d6370";
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
let hour = now.getHours();
let minute = now.getMinutes();
if (hour < 10) {
  hour = "0" + hour;
}
if (minute < 10) {
  minute = "0" + minute;
}
let timeHour = document.querySelector("#hour");
timeHour.innerHTML = hour;
let timeMinute = document.querySelector("#minute");
timeMinute.innerHTML = minute;
let weekDay = document.querySelector("#day");
weekDay.innerHTML = day;

function updateTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let digit = document.querySelector("#temoreture-digit");
  digit.innerHTML = temperature;
}

function updateCityName(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-box");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = searchCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=metric
&appid=${apiKey}`;
  axios.get(apiUrl).then(updateTemperature);
}

let newForm = document.querySelector("#search-form");
newForm.addEventListener("submit", updateCityName);

function updateToCurrent() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", updateToCurrent);

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat, lon);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric
&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrent);
}

function showCurrent(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let h1 = document.querySelector("#temoreture-digit");
  h1.innerHTML = temperature;
  let city = document.querySelector("#city-name");
  city.innerHTML = response.data.name;
}
