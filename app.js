"use strict";

require("dotenv").config();
const { join } = require("path");
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const serveFavicon = require("serve-favicon");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const nodemailer = require("nodemailer");
const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

// Setup view engine
app.set("views", join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(serveFavicon(join(__dirname, "public/images", "favicon.ico")));
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  res.status(error.status || 500);
  res.render("error");
});

module.exports = app;
