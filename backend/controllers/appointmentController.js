const Appointment = require('../models/Appoinment');

exports.bookAppointment = async (req, res) => {
  // const doctor, date, time, f_name, l_name, email, phone_num } = req.body;
  try {
    const appointment = await Appointment.insertOne(req.body);

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Booking failed' });
  }
};

// exports.getAppointmentsForDoctor = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const appointment = await Appointment.find({ _id: id});
//     res.json(appointment);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching appointment' });
//   }
// };