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
    venueName: String,
    date: Date
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
  },

  deleteStop(id, stopId) {
    return this.updateById(id, {
      $pull: {
        stops: { _id: stopId }
      }
    })
      .then(tour => tour.stops);
  },

  updateAttendance(id, stopId, attendance) {
    return this.updateOne(
      { _id: id, 'stops._id': stopId },
      {
        $set: {
          'stops.$.attendance': attendance
        }
      }
    )
      .then(tour => {
        return tour.stops;
      });
  }
};
module.exports = mongoose.model('Tours', schema);
