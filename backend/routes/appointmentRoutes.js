const express = require('express');
const router = express.Router();
const { bookAppointment, getAppointmentsForDoctor } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/book', protect, bookAppointment);
// router.get('/user/:id', protect, getAppointmentsForDoctor);

module.exports = router;
