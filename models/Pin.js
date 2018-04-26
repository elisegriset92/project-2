const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pinSchema = new Schema(
  {
    username: {type: String},
    comment: {type: String},
    imageName: {type: String},
    imageUrl: {type: String},
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    place: {
      type: Schema.Types.ObjectId,
      ref: 'Place',
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
