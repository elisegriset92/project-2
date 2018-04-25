const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema(
  {
    name: {type: String},
    description: {type: String},
    location: {
      type: {type: String},
      coordinates: [{type: Number}],
    },
  },
  {
    timestamps: true,
  }
);

placeSchema.index({location: '2dsphere'});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
