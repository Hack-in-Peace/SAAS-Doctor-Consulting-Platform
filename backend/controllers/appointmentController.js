const Appointment = require('../models/Appoinment');

exports.bookAppointment = async (req, res) => {
  const { doctor, date, time } = req.body;
  try {
    const count = await Appointment.countDocuments({ doctor, date });
    const tokenNumber = count + 1;
    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor,
      date,
      time,
      tokenNumber
    });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Booking failed' });
  }
};

exports.getAppointmentsForDoctor = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user._id }).populate('patient', 'name email');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};