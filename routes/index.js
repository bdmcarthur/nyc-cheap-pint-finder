"use strict";

const { Router } = require("express");
const router = Router();
const Bars = require("../models/bar");

router.get("/", (req, res) => {
  res.render("index", { API_KEY: process.env.API_KEY });
});

router.get("/bars", (req, res, next) => {
  Bars.find({}, (error, bars) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json({ bars: bars });
    }
  });
});

module.exports = router;
