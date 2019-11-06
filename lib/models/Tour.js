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
  stops: [{
    zip: Number,
    attendance: {
      type: Number,
      default: 0
    },
    address: {
      city: String,
      state: String
    },
    venueName: String
  }]
});

schema.statics = {
  addStop(id, stop) {
    return this.updateById(id, {
      $push: {
        stops: stop
      }
    })
      .then(tour => tour);
  }
};
module.exports = mongoose.model('Tours', schema);
