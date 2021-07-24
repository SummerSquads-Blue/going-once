const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  address: {type: String},
  lat: {type: Number},
  lng: {type: Number},
  city: {type: String},
  picture: {type: String},
  condition: {type: String},
  tag: {type: String},
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Item', itemSchema);