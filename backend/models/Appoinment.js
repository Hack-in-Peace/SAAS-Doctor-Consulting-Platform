const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
  doctor: String,
  f_name: String,
  l_name: String,
  date: { type: String, default: "10:30 AM" },
  time: { type: String, default: "Monday, January 15, 2024" },
  email: String,
  phone_num: String,
  app_type: { type: String, default: "default_value" }
});
module.exports = mongoose.model('Appointment', appointmentSchema);

