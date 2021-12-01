let now = new Date();

let h3 = document.querySelector("#date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `${0}${minutes}`;
}

h3.innerHTML = `${day} ${hour}:${minutes}`;

function displayInfo(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
}

function searchCity(city) {
  let apiKey = "52497c6b69bb4648be92f1f0807d9c4d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayInfo);
}

function submitForm(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text").value;
  searchCity(city);
}

let formSearch = document.querySelector("#form-here");
formSearch.addEventListener("click", submitForm);

function findLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "52497c6b69bb4648be92f1f0807d9c4d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayInfo);
}

function showCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", showCurrent);

searchCity("New York");
