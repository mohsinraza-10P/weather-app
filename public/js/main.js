// This file contains code for client side JavaScript

const weatherForm = document.querySelector("form");
const search = document.getElementById("txt-search");
const firstMessage = document.getElementById("message-1");
const secondMessage = document.getElementById("message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  getWeatherForecast(location);
});

const getWeatherForecast = (location) => {
  if (!location) {
    alert("Please provide location to fetch forecast.");
    return;
  }

  firstMessage.textContent = "Loading...";
  secondMessage.textContent = "";

  const url = "http://localhost:3000/weather?address=" + location;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        firstMessage.textContent = error;
      } else {
        firstMessage.textContent = data.location.place;
        secondMessage.textContent = data.forecast;
      }
    });
  });
};
