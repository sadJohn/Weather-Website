const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "../src/partials"));

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Johan"
  });
});
app.get("/index", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Johan"
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("You must provide a address!");
  }

  geocode(
    req.query.address,
    (error, { latitude, longtitude, location } = {}) => {
      if (error) {
        return res.send(error);
      }
      forecast(latitude, longtitude, (error, forcastMsg) => {
        if (error) {
          return res.send(error);
        }
        res.send({
          address: req.query.address,
          forecast: forcastMsg,
          location
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("handlebars", {
    message: "Page not found"
  });
});

app.listen(3000, () => {
  console.log("Listen at port 3000...");
});
