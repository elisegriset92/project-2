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
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const Pin = mongoose.model('Pin', pinSchema);
module.exports = Pin;
