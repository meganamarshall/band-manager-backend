const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  bandName: {
    type: String,
    required: true
  },
  launchDate: {
    type: Date,
    default: () => new Date()
  },
  stops: []
});

module.exports = mongoose.model('Tours', schema);
