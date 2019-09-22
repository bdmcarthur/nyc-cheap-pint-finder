'use strict';

const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
  name: {
    type: String
  },
  address: {
    type: String
  },
  latlng: {
    type: String
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

module.exports = mongoose.model('Bar', barSchema);
