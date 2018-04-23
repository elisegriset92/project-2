const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pinSchema = new Schema(
  {
    place: {type: String, required: true},
    author: {type: String, required: true},
    picture: {type: String, required: true},
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const Pin = mongoose.model('Pin', userSchema);
module.exports = Pin;
 