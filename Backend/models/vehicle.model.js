const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  model: { type: String, required: true, minlength: 3 },
  price: { type: Number, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  maxPictures: { type: Number, required: true, min: 1, max: 10 },
  pictures: { type: [String], default: [] }, 
  userId: { type: mongoose.Schema.Types.ObjectId,ref:'User' ,required: true }, 
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
