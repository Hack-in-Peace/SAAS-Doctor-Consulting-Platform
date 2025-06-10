const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  time: String,
  tokenNumber: Number,
  status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' }
});
module.exports = mongoose.model('Appointment', appointmentSchema);