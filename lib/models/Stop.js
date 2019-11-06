const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  venueName: {
    latitude: Number,
    longitude: Number,
  },
  address: {
    city: String,
    state: String
  },
  attendance: {
    type: Number,
    default: 0
  },
  profit: {
    type: Number,
    default: 0
  }
});



module.exports = mongoose.model('Stops', schema);