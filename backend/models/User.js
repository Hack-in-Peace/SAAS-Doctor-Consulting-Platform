const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  f_name: String,
  l_name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['patient', 'doctor'], default: 'patient' }
});
module.exports = mongoose.model('User', userSchema);