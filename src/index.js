function updateDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let updatedDay = days[day];
  return `${updatedDay} ${hours}:${minutes}`;
}

function updateWeather(response) {
  let city = response.data.city;
  let cityDescription = response.data.condition.description;
  let cityTemp = Math.round(response.data.temperature.current);
  let cityHumidity = response.data.temperature.humidity;
  let cityWind = response.data.wind.speed;
  let iconUrl = response.data.condition.icon_url;
  let currentDate = new Date(response.data.time * 1000);

  let cityElement = document.querySelector("#current-city");
  let descriptionValue = document.querySelector(".description");
  let tempValue = document.querySelector(".current-temperature-value");
  let humidityValue = document.querySelector(".humidity-value");
  let windValue = document.querySelector(".wind-value");
  let iconValue = document.querySelector(".current-temperature-icon");
  let currentDateValue = document.querySelector("#current-date");

  cityElement.innerHTML = city;
  descriptionValue.innerHTML = cityDescription;
  tempValue.innerHTML = cityTemp;
  humidityValue.innerHTML = cityHumidity;
  windValue.innerHTML = cityWind;
  iconValue.innerHTML = `<img src="${iconUrl}">`;
  currentDateValue.innerHTML = updateDate(currentDate);
}

function updateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function updateForecast(response) {
  let forecast = document.querySelector("#forecast");
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
        <div class="weather-forecast-date">${updateDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
      `;
    }
  });

  forecast.innerHTML = forecastHtml;
}

function searchCity(city) {
  let apiKey = "94c379409f43ba9697t5c0of6330a837";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
  searchForecast(city);
}

function searchForecast(city) {
  let apiKey = "94c379409f43ba9697t5c0of6330a837";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateForecast);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("manila");
