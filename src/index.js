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

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let query = searchInputElement.value;
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = query;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
