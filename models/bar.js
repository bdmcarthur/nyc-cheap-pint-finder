"use strict";

const mongoose = require("mongoose");

const barSchema = new mongoose.Schema({
  name: {
    type: String
  },
  address: {
    type: String
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  type: {
    type: String
  },
  description: {
    type: String,
    trim: true
  },
  neighborhood: {
    type: String
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model("Bars", barSchema, "Bars");
