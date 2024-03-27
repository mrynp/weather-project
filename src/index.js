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

let currentDateValue = document.querySelector("#current-date");
let currentDate = new Date();

currentDateValue.innerHTML = updateDate(currentDate);

function updateWeather(response) {
  let city = response.data.city;
  let cityDescription = response.data.condition.description;
  let cityTemp = Math.round(response.data.temperature.current);
  let cityHumidity = response.data.temperature.humidity;
  let cityWind = response.data.wind.speed;
  let iconUrl = response.data.condition.icon_url;

  let cityElement = document.querySelector("#current-city");
  let descriptionValue = document.querySelector(".description");
  let tempValue = document.querySelector(".current-temperature-value");
  let humidityValue = document.querySelector(".humidity-value");
  let windValue = document.querySelector(".wind-value");
  let iconValue = document.querySelector(".current-temperature-icon");

  cityElement.innerHTML = city;
  descriptionValue.innerHTML = cityDescription;
  tempValue.innerHTML = cityTemp;
  humidityValue.innerHTML = cityHumidity;
  windValue.innerHTML = cityWind;
  iconValue.innerHTML = `<img src="${iconUrl}">`;
}

function searchCity(city) {
  let apiKey = "94c379409f43ba9697t5c0of6330a837";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("manila");
