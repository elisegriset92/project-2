const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pinSchema = new Schema(
  {
    username: {type: String},
    comment: {type: String},
    imageName: {type: String},
    imageUrl: {type: String},
    place: {
      type: Schema.Types.ObjectId,
      ref: 'Place',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: {
      require: true,
    },
  }
);

const Pin = mongoose.model('Pin', pinSchema);
module.exports = Pin;
