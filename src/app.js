// This file contains code for server side JavaScript

const path = require("path"); // core module (built-in)
const express = require("express"); // npm module
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const weather = require("./utils/weather.js");

const app = express();

// Define paths for Express configuration
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup static directory to serve
app.use(express.static(publicDirPath));

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Listen HTTP server on port
app.listen(3000, () => {
  console.log("Server is up on port:", 3000);
});

app.get("", (request, response) => {
  response.render("index", {
    title: "Weather App",
    name: "Syed Mohsin Raza",
  });
});

app.get("/about", (request, response) => {
  response.render("about", {
    title: "About Me",
    name: "Syed Mohsin Raza",
  });
});

app.get("/help", (request, response) => {
  response.render("help", {
    title: "Help",
    name: "Syed Mohsin Raza",
    helpText: "Stuck while navigating? Reach out to us via Facebook!",
  });
});

app.get("/weather", (request, response) => {
  const query = request.query;
  if (!query.address) {
    response.send({
      error: "Missing query param [address]",
    });
    return;
  }

  geocode.fetchLocation(query.address, (error, location) => {
    if (error) {
      response.send({ error });
      return;
    }

    weather.getForecast(location, (error, weather) => {
      if (error) {
        response.send({ error });
        return;
      }

      const locationData = {
        place: location.place,
        coordinates: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      };
      const forecast = weather.description + ' [Temprature: ' + weather.temperature + ', Feels like: ' + weather.feelslike + ']';
      response.send({
        location: locationData,
        weather,
        forecast,
      });
    });
  });
});

app.get("/help/*", (request, response) => {
  response.render("404", {
    title: "404",
    name: "Syed Mohsin Raza",
    errorMsg: "Help article not found.",
  });
});

// 404
app.get("*", (request, response) => {
  response.render("404", {
    title: "404",
    name: "Syed Mohsin Raza",
    errorMsg: "Page Not Found!",
  });
});
