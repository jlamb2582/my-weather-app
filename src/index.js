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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun" , "Mon" , "Tue" , "Wed" , "Thu" , "Fri" , "Sat"];

  return days[day];

}

function displayForecast(response) {
let forecast = response.data.daily;

let forecastElement = document.querySelector("#weather-forecast");

let forecastHTML = `<div class = "row">`;


forecast.forEach(function (forecastDay, index) {
  if (index < 6) {
  forecastHTML = forecastHTML + `
  <div class = "col-2">
          <div class = "weather-date">
          ${formatDay(forecastDay.dt)}
          </div>
          <div class = "weather-image">
          <img src = "https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt ="" width = "36"/>
          </div>
          <div class = "weather-units">
          <span class = weather-units-max>
          ${Math.round(forecastDay.temp.max)}°</span>
          <span class = "weather-units-min">
          ${Math.round(forecastDay.temp.min)}°
          </span>
        </div>
        </div>
    `;
        }
});

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
console.log(coordinates);
let apiKey = "52497c6b69bb4648be92f1f0807d9c4d";
let apiUrl  = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function displayInfo(response) {
  console.log(response.data);
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

  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;

  iconElement.setAttribute("src" , `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  let descriptionElement = document.querySelector("#description");

  descriptionElement.innerHTML = response.data.weather[0].description;

 getForecast(response.data.coord);
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

function showFahrenheitTemp (event) {
event.preventDefault();
let fahrenheitTemp = (celsiusTemperature *9) / 5 + 32;
let temperatureElement = document.querySelector("#temp");
temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelciusTemp(event){
event.preventDefault();
let temperatureElement = document.querySelector("#temp");
temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let formSearch = document.querySelector("#form-here");
formSearch.addEventListener("submit", submitForm);




searchCity("New York");


let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click" , showFahrenheitTemp);


let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click" , showCelciusTemp);

