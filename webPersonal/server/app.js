const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { API_VERSION } = require("./config");

//Load Routings
//...
const authRouters = require("./routers/auth");
const userRouters = require("./routers/user");
const menuRouters = require("./routers/menu");
const newsletterRouters = require("./routers/newsletter");
const coursesRouters = require("./routers/courses");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure Header HTTP
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
//Router Basic
//...
app.use(`/api/${API_VERSION}`, authRouters);
app.use(`/api/${API_VERSION}`, userRouters);
app.use(`/api/${API_VERSION}`, menuRouters);
app.use(`/api/${API_VERSION}`, newsletterRouters);
app.use(`/api/${API_VERSION}`, coursesRouters);
module.exports = app;
